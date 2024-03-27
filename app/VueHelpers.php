<?php

use App\Models\Item;
use App\Models\CrateItem;
use App\Models\Inventory;
use App\Models\SiteSettings;

function translations($json)
{
    if (!file_exists($json)) {
        return [];
    }

    return json_decode(file_get_contents($json), true);
}

public function grant(int $userId, int $itemId, array $data = []): JsonResponse
{
    try {
        // Validate user and item existence
        $user = User::findOrFail($userId);
        $item = Item::findOrFail($itemId);

        // Create a new inventory record
        $inventory = new Inventory;
        $inventory->user_id = $userId;
        $inventory->item_id = $itemId;

        // Store additional data if provided
        if (isset($data['reason'])) {
            $inventory->reason = $data['reason'];
        }

        // Handle gift scenario (logic depends on your requirements)
        if (isset($data['gift'])) {
            // Implement gift-specific logic here (e.g., record gifting details)
        }

        $inventory->save();

        // Award points (assuming this is the intended behavior)
        $user->addPoints(50);

        // Grant successful, return JSON response
        return response()->json([
            'success' => true,
            'message' => 'Item granted successfully!',
        ], 201); // Created status code

    } catch (ModelNotFoundException $e) {
        // Handle user or item not found exceptions
        return response()->json([
            'success' => false,
            'message' => "User or item not found!", // Adjust the message as needed
            'error' => $e->getMessage(), // Optional: Include error details (be cautious in production)
        ], 404); // Not Found status code

    } catch (\Exception $e) {
        // Catch any other unexpected exceptions
        return response()->json([
            'success' => false,
            'message' => "An error occurred during granting!", // Generic error message
            'error' => $e->getMessage(), // Optional: Include error details (be cautious in production)
        ], 500); // Internal Server Error status code
    }
}


public function grant(int $userID, int $itemID) {
        $user = User::where('id', '=', $userID)->firstOrFail();
        $item = User::where('id', '=', $userID)->firstOrFail();
        $inventory = new Inventory;
    
        $inventory->user_id = $user->id;
        $inventory->item_id = $itemID;
        $inventory->save();
        $user->addPoints(50);
}

function crateRarity($data, $rarity)
{
    switch ($data) {
        case 'rank':
            return CrateItem::rarityRank($rarity);
        case 'name':
            return CrateItem::rarityName($rarity);
    }
}

function customRaritySort($a, $b)
{
    $key = 'rarity';

    if($a[$key] < $b[$key])
        return 1;
    else if($a[$key] > $b[$key])
        return -1;

    return 0;
}

function site_setting($key)
{
    // Check if the app is in production environment
    $isProduction = app()->environment('production');

    if ($isProduction) {
        // Check if the settings are cached
        $settings = cache()->remember('site_settings', now()->addMinutes(30), function () {
            return SiteSettings::find(1); // Change to use the find() method instead of where() + first()
        });
    } else {
        // If not in production, retrieve settings without caching
        $settings = SiteSettings::find(1);
    }
    
    // If settings are not found, return a default value or handle the error
    if (!$settings) {
        return null; // or return a default value or throw an exception
    }

    // Use optional chaining to access the property safely
    return optional($settings)->$key;
}
function getItemHash($id)
{
        $item = Item::where([
            ['item_id', '=', $id]
        ])->count();
    return $item->hash;
}
