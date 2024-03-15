<?php

namespace App\Http\Controllers\Market;

use App\Models\User;
use App\Models\Item;
use App\Models\Inventory;
use App\Models\ItemReseller;
use App\Models\ItemPurchase;
use App\Http\Controllers\Controller;

class MarketController extends Controller
{
    public function StoreIndex()
    {
        // Define a cache key for this data
        $cacheKey = 'store_index_data';

        // Use caching to store the data for StoreIndex
        $categories = cache()->remember($cacheKey, now()->addHours(6), function () {
            return config('ItemCategories');
        });

        return inertia('Store/Index', [
            'categories' => $categories,
        ]);
    }

    public function storeItem($id)
    {
        // Define cache keys
        $cacheKey = 'store_item_' . $id;
        $recommendationCacheKey = 'recommendation_' . $id;
    
        // Retrieve item data with caching
        $item = cache()->remember($cacheKey, now()->addHours(6), function () use ($id) {
            return Item::where('id', $id)->first();
        });
    
        if (!$item) {
            abort(404);
        }
    
        // Retrieve recommendations with caching
        $recommendations = cache()->remember($recommendationCacheKey, now()->addHours(6), function () use ($item) {
            return Item::where([
                ['id', '!=', $item->id],
                ['public_view', true],
                ['status', 'approved'],
                ['creator_id', $item->creator->id]
            ])->inRandomOrder()->take(6)->get();
        });
        
    
        return inertia('Store/Item', [
            'item' => $item,
            'creator' => $item->creator,
            'itemOwnership' => Auth::check() ? Auth::user()->ownsItem($item->id) : false,
            'item.owners' => $item->owners(),
            'recommendations' => $recommendations,
        ]);
    }
    

    public function purchase(int $id, string $currencyType, ?int $resellerId = null)
    {
    $item = Item::where('id', '=', $id)->firstOrFail();
    $item->timestamps = false;

    $listing = null;
    $isReseller = $resellerId !== null;

    if ($isReseller) {
        $listing = ItemReseller::where('id', '=', $resellerId)->first();
    }

    if (!Auth::user()->isStaff() && !$item->public_view) {
        abort(403);
    }

    if ($item->status != 'approved') {
        return back()->withErrors(['This item is not approved.']);
    }

    if (!$isReseller && $item->rare && $item->stock <= 0) {
        return back()->withErrors(['This item is out of stock.']);
    }

    if (!$isReseller && !$item->onsale()) {
        return back()->withErrors(['This item is not on sale.']);
    }

    if ($isReseller && Auth::user()->id == $listing->seller->id) {
        return back()->withErrors(['You cannot buy your own item.']);
    }

    if (!$isReseller && Auth::user()->ownsItem($item->id)) {
        return back()->withErrors(['You already own this item.']);
    }

    if ($isReseller && $currencyType != 'bucks') {
        return back()->withErrors(['You can only buy resold items for bucks.']);
    }

    switch ($currencyType) {
        case 'coins':
            $price = $item->cost_coins;
            $column = 'coins';

            if ($price == 0) {
                return back()->withErrors(['This item cannot be purchased with coins.']);
            }
            break;
        case 'bucks':
            $price = ($isReseller) ? $listing->price : $item->cost_bucks;
            $column = 'bucks';

            if ($price == 0) {
                return back()->withErrors(['This item cannot be purchased with bucks.']);
            }
            break;
        case 'free':
            $price = 0;
            $column = null;

            if ($item->cost_coins > 0 && $item->cost_bucks > 0) {
                return back()->withErrors(['This item cannot be purchased for free.']);
            }
            break;
        default:
            abort(404);
    }

    $seller = (!$isReseller) ? $item->creator : $listing->seller;

    if ($currencyType != 'free') {
        if (Auth::user()->$column < $price && $price > 0) {
            return back()->withErrors(["You do not have enough {$currencyType} to purchase this item."]);
        }

        $seller->timestamps = false;
        $seller->$column += round(($price / 1.3), 0, PHP_ROUND_HALF_UP);
        $seller->save();

        $myU = Auth::user();
        $myU->$column -= $price;
        $myU->save();
    }

    if ($isReseller) {
        $inventory = $listing->inventory;
        $inventory->user_id = Auth::user()->id;
        $inventory->save();

        $listing->delete();

        if (!$seller->ownsItem($item->id) && $seller->isWearingItem($item->id)) {
            $seller->takeOffItem($item->id);

            $this->regeneratewithID($resellerId, $seller->id);
        }
    } else {
        $inventory = new Inventory;
        $inventory->user_id = Auth::user()->id;
        $inventory->item_id = $item->id;
        $inventory->save();
    }

    $purchase = new ItemPurchase;
    $purchase->seller_id = $seller->id;
    $purchase->buyer_id = Auth::user()->id;
    $purchase->item_id = $item->id;
    $purchase->ip = Auth::user()->lastIP();
    $purchase->currency_used = $currencyType;
    $purchase->price = $price;
    $purchase->save();
    Auth::user()->addPoints(30);

    if ($item->special_type && $item->stock > 0) {
        $item->stock -= 1;
        $item->save();
    }

    return back()->with('success_message', 'You now own this item!');
}


    public function resell(Request $request)
    {
        $copy = Inventory::where([
            ['id', '=', $request->id],
            ['user_id', '=', Auth::user()->id]
        ])->firstOrFail();
        $isReselling = ItemReseller::where('inventory_id', '=', $copy->id)->exists();

        if (!$copy->item->limited || ($copy->item->limited && $copy->item->stock > 0) | $isReselling) abort(404);

        $this->validate($request, [
            'price' => ['required', 'numeric', 'min:1', 'max:1000000']
        ]);

        $reseller = new ItemReseller;
        $reseller->seller_id = Auth::user()->id;
        $reseller->item_id = $copy->item->id;
        $reseller->inventory_id = $copy->id;
        $reseller->price = $request->price;
        $reseller->save();
        Auth::user()->addPoints(10);
        return redirect()->route('catalog.item', [$copy->item->id, $copy->item->slug()])->with('success_message', 'Item has been put up for sale, You have earned 10 XP.');
    }

    public function makeOffsale(Request $request)
    {
        $copy = ItemReseller::where([
            ['id', '=', $request->id],
            ['seller_id', '=', Auth::user()->id]
        ])->firstOrFail();

        $id = $copy->item_id;
        $slug = Item::where('id', '=', $id)->first()->slug();

        $copy->delete();

        return redirect()->route('catalog.item', [$id, $slug])->with('success_message', 'Item has been taken off sale.');
    }
}
