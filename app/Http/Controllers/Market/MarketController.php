<?php

namespace App\Http\Controllers\Market;

use App\Models\User;
use App\Models\Item;
use App\Models\Inventory;
use App\Models\ItemReseller;
use App\Models\ItemPurchase;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Endpoints\RenderController;
use Illuminate\Support\Facades\Auth;
use App\Models\IpLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\UploadedFile;

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

        if (!$item || !$item->public_view && Auth::check() && !Auth::user()->isStaff() ) {
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
            'item.thumbnail' => $item->thumbnail(),
            'item.preview' => $item->preview(),
            'creator' => $item->creator,
            'itemOwnership' => Auth::check() ? Auth::user()->ownsItem($item->id) : false,
            'item.owners' => $item->owners(),
            'recommendations' => $recommendations,
        ]);
    }

    public function CreateIndex()
    {
        return inertia('Store/Create');
    }

    public function uploadItem(Request $request)
    {
        $this->validateRequest($request);
        $itemHashName = bin2hex(random_bytes(22));
        $previewName = "{$itemHashName}_preview";

        $item = new Item;
        $item->name = $request->name;
        $item->description = $request->description;

        if (Auth::user()->isStaff() && $request->type === 'face') {
            $this->uploadImage($request->file('image'), $itemHashName);
        } elseif (Auth::user()->isStaff() && $request->hasFile('obj') && $request->type === 'hat' || $request->type === 'addon' || $request->type === 'tool') {
            // Upload OBJ only if item type deals with models
            $this->uploadOBJ($request->file('obj'), $itemHashName);
        } else {
            $this->uploadImage($request->file('image'), $itemHashName);
        }
        $item->hash = $itemHashName;
        $item->creator_id = Auth::id();

        $item->item_type = $request->type;
        $item->status = 'pending';
        $item->public_view = false;
        $item->cost_coins =  $request->price_coins;
        $item->cost_bucks =  $request->price_bucks;
        $item->avatar_preview = $previewName;
        $item->onsale = true;
        $item->save();

        $newVrcInstance = new RenderController();
        $vrs = $newVrcInstance;
        $vrs->ItemPreviewRender($request, $item->id, true, $itemHashName);

        return redirect()->route('store.item', $item->id)->with([
            'flash' => [
                'message' => 'Item created successfully!',
                'type' => 'success' // Optional: specify message type for styling
            ],
        ], 201);
    }

    private function uploadImage(UploadedFile $file, string $name): string
    {
        $path = Storage::disk('public')->putFileAs('uploads', $file, "{$name}.png");

        return $path;
    }

    private function uploadOBJ(UploadedFile $file, string $name): string
    {
        $path = Storage::disk('public')->putFileAs('uploads', $file, "{$name}.obj");

        return $path;
    }
    private function validateRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:30',
            'description' => 'required|string|max:255',
            'type' => 'required|string|in:shirt,tshirt,pants', // Allowed item types
            'image' => 'required|image|mimes:png', // Validate PNG image
        ]);

        if ($validator->fails()) { // Use Validator object's fails method on $validator
            throw ValidationException::withMessages([$validator->errors()]);
        }
    }
}
