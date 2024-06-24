<?php

namespace App\Http\Controllers\Endpoints;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use App\Models\Avatar;
use Mockery\Matcher\Any;
use App\Models\User;
use App\Jobs\UserRenderer;

class AvatarController extends Controller
{
    public function getItemsByCategory(Request $request, $category)
    {
        // Select only item IDs from inventory with matching category
        $itemIds = Inventory::where('user_id', Auth::id())
            ->whereHas('item', function ($query) use ($category) {
                $query->where('item_type', '=', $category);
            })
            ->pluck('item_id');

        // Now return Items
        $cacheKey = 'inventory_items';
        $items = cache()->remember($cacheKey, now()->addMinutes(5), function () use ($itemIds) {
            return Item::whereIn('id', $itemIds)->orderBy('created_at', 'asc')->paginate(12)->through(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'type' => $item->item_type,
                    'thumbnail' => $item->thumbnail(),
                ];
            });
        });

        return response()->json($items);
    }

    public function WearItem(int $itemId, int | string $slot)
    {
        // Fetch the avatar and item record
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $avatar = $user->avatar();
        $newVrcInstance = new RenderController();
        $vrs = $newVrcInstance;
        $item = Item::where('id', '=', $itemId)->first();

        // Check if avatar record exists
        if (!$avatar) {
            return response()->json([
                "message" => "Avatar record not found",
                "type" => "error",
            ], 404);
        }

        // Validate slot number (1-6)
        if ($item->item_type == "hat" && $slot != 'none' && $slot != null) {
            $hatSlot = "hat_" . $slot; // Define $hatSlot here within the if block
        }


        if ($item->item_type == "hat" && !in_array($slot, range(1, 6)) && $slot != 'none') {
            return response()->json([
                "message" => "Invalid hat slot. Please choose between 1 and 6.",
                "type" => "error",
            ], 400); // Bad request status code
        }

        // Update the specific item based on type and id
        if ($item->item_type == "hat" && $slot != 'none' && $slot != null) {
            $avatar->setAttribute($hatSlot, $itemId);
        } else {
            $avatar->setAttribute($item->item_type, $itemId);
        }


        // Save the updated avatar record
        $avatar->save();

        UserRenderer::dispatch(Auth::user()->id);
        return $vrs->getRenderHash($avatar->id);


        return response()->json([
            "message" => "You have worn this item",
            "type" => "success",
        ], 200);
    }

    public function getWearingItems($id, $test)
    {
        // Return Wearing Items
        $cacheKey = 'wearing_items';
        $items = cache()->remember($cacheKey, now()->addMinutes(5), function () {
            return Avatar::where('user_id', '=', Auth::id())->paginate(12)->through(function ($item) {
                return [
                    'id' => $item->id,
                    'type' => $item->item_type,
                    'name' => $item->name,
                    'thumbnail' => $item->thumbnail(),
                ];
            });
        });
        return dd($items);
        //return response()->json($items); // Add this line to return the data
    }

    public function getWearingHats(Request $request)
    {
        // Return Wearing Hats
        $cacheKey = 'wearing_items_hats'; // Use a specific cache key for hat searches

        $items = cache()->remember($cacheKey, now()->addMinutes(5), function () {
            return Avatar::where(function ($query) {
                $hatColumns = ['hat_1', 'hat_2', 'hat_3', 'hat_4', 'hat_5', 'hat_6']; // Hat database columns

                // Constrain the query using OR clauses for each hat column
                foreach ($hatColumns as $column) {
                    $query->orWhere($column, '!=', null); // Filter for non-null values
                }
            })->where('user_id', '=', Auth::id())
                ->through(function ($item) {
                    return [
                        'id' => $item->id,
                        'type' => $item->item_type,
                        'name' => $item->name,
                        'thumbnail' => $item->thumbnail(),
                    ];
                });
        });

        return response()->json($items);
    }
}
