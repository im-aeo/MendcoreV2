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

    public function WearItem(Request $request, int $itemId, int | string $slot)
    {
        // Fetch the avatar and item record
        $user = Auth::user();
        $avatar = $user->avatar();
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

        if ($item->item_type = "hat" && !in_array($slot, range(1, 6)) && $slot != 'none') {
            return response()->json([
                "message" => "Invalid hat slot. Please choose between 1 and 6.",
                "type" => "error",
            ], 400); // Bad request status code
        }

        // Check the specific hat slot for null (emptys)
        if ($item->item_type == "hat" && $slot != 'none') {
            if (is_null($avatar->{"hat_" . $slot})) {
                $avatar->{"hat_" . $slot} = $itemId; // Set the specific hat slot
            } else {
                return response()->json([
                    "message" => "This hat slot is already occupied",
                    "type" => "error",
                ], 409); //             }
            }
        }

        // Update the specific item based on type and id
        if ($item->item_type == "hat" && $slot != 'none' && $slot != null) {
            $avatar->setAttribute($item->$hatSlot, $itemId);
        } else {
            $avatar->setAttribute($item->item_type, $itemId);
        }


        // Save the updated avatar record
        $avatar->save();

        return response()->json([
            "message" => "You have worn this item",
            "type" => "success",
        ], 200);
    }

    public function getWearingItems(Request $request)
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

        return response()->json($items);
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
