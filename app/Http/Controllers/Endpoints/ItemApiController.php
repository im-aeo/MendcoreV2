<?php

namespace App\Http\Controllers\Endpoints;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Models\CrateItem;
use Illuminate\Support\Facades\Auth;
use Exception;

class ItemApiController extends Controller
{

    public function getItemsByCategory(Request $request, $category)
    {
        // Define the getEventItems function before calling it
        $categories = $this->getCategoryData();
        //dd($categories);

        // Check if requested category exists
        if (isset($categories[$category])) {
            $categoryData = $categories[$category];
        } else {
            // Check if requested category matches a subcategory internal value
            foreach ($categories as $categoryName => $categoryDetails) {
                foreach ($categoryDetails as $subCategory) {
                    if (isset($subCategory['internal']) && $subCategory['internal'] === $category) {
                        $categoryData = $categories[$categoryName];
                        break 2; // Exit both loops after finding a match
                    }
                }
            }
        }

        // Handle category not found
        if (!isset($categoryData)) {
            return response()->json(['error' => 'Invalid category']);
        }

        $items = [];

        // Handle all of the "Exclusives" category
        if ($categoryData === $categories['Exclusives']) {
            $exclusiveType = $category;
            if ($exclusiveType === "exclusive_all") {
                $items = Item::where('rare', '=', true)->with('creator')->orderBy('updated_at')->get();
            } else {
                $exclusiveType = explode('exclusive_', $exclusiveType);
                $trimmedType = $exclusiveType[1] ?? ""; // Get the second element (or empty string if not found)


                $items = Item::where(['rare' => true, 'item_type' => $trimmedType])->with('creator')->orderBy('updated_at')->get();
            }



            foreach ($items as $item) {
                $item->creator = $item->creator;
            }
        } else {
            // Get items for the specific category
            $items = Item::where('item_type', $category)->with('creator')->orderBy('updated_at')->get();
        }
        return response()->json($items);
    }
    private function getCategoryData()
    {
        $data = config('ItemCategories');


        // Check if data is an array (optional)
        if (!is_array($data)) {
            throw new Exception('Invalid ItemCategories data structure');
        }

        return $data;
    }

    function openCrate(Request $request)
    {
        // Check user ownership and crate existence
        $crate = $this->validateCrateOwnership($request->id);
        if (!$crate) {
            return response()->json(['error' => 'This crate does not exist or you do not own it.']);
        }

        // Get crate items and ensure they exist
        $crateItems = $crate->crateItems;
        if ($crateItems->isEmpty()) {
            return response()->json(['error' => 'This crate is empty.']);
        }

        // Determine winning item and update user inventory
        $winningItemId = CrateItem::getWinningItem($crate->id);
        $winningItem = CrateItem::where('id', '=', $winningItemId)->first();

        $this->updateUserInventory($crate, $winningItem);

        // Prepare item information for response
        $winningItemDetails = [
            'id' => $winningItem->id,
            'name' => $winningItem->item->name,
            'thumbnail' => $winningItem->item->thumbnail(),
            'url' => route('store.item', [$winningItem->item->id, $winningItem->item->slug()]),
            'rarity' => [
                'name' => CrateItem::rarityName($winningItem->rarity),
                'color' => CrateItem::rarityColor($winningItem->rarity)
            ]
        ];

        // Generate unboxing animation data
        $images = $this->generateUnboxingAnimation($crateItems);
        $winningIndex = floor(count($images) / 2);
        $images[$winningIndex] = $winningItemDetails;
        $animateLeft = ($winningIndex - 2) * 153.3; // Adjust based on image width

        // Return response with crate opening details
        return response()->json([
            ...$winningItemDetails, // Include item details from $winningItemDetails
            'unboxing_images' => $images,
            'animate_left' => "-={$animateLeft}px"
        ]);
    }

    // Helper functions for better organization
    private function validateCrateOwnership($crateId)
    {
        $crate = Item::where([
            ['id', '=', $crateId],
            ['type', '=', 'crate']
        ])->first();

        if (!$crate || !Auth::user()->ownsItem($crateId)) {
            return null;
        }

        return $crate;
    }

    private function updateUserInventory($crate, $winningItem)
    {
        Inventory::where([
            ['user_id', '=', Auth::user()->id],
            ['item_id', '=', $crate->id]
        ])->first()->delete();

        $inventory = new Inventory;
        $inventory->user_id = Auth::user()->id;
        $inventory->item_id = $winningItem->item->id;
        $inventory->save();
    }

    private function generateUnboxingAnimation($crateItems)
    {
        $images = [];
        for ($i = 0; $i < 50; $i++) {
            $itemImages = [];
            shuffle($crateItems);
            foreach ($crateItems as $crateItem) {
                $itemImages[] = [
                    'id' => $crateItem->id,
                    'src' => $crateItem->thumbnail,
                    'color' => crateRarity('color', $crateItem->rarity),
                ];
            }
            shuffle($itemImages);
            $images[] = $itemImages[0];
        }
        return $images;
    }
    public function getEventItems($eventId)
    {
        // Add return statement to get the query result
        return Item::where(['in_event' => true, 'event_id' => $eventId])->get();
    }
}
