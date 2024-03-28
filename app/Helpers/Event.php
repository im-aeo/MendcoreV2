<?php

namespace App\Helpers;

use App\Models\User\User;
use App\Models\Item\Item;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class Event
{
    public $items = [
    '1'
    ]; // Array of item IDs
    public $keys = [
    'giftme<3'
    ];  // Array of key strings associated with item IDs (key => item ID)

    public function grantItem(Item $item, User $user, string $key, bool $internalRedeem = false): bool
    {
        // Validate key existence
        if (!array_key_exists($key, $this->keys) || $this->keys[$key] !== $item->id) {
            Log::error("Invalid key for granting item: $key (user: {$user->id}, item: {$item->id})"); // Log error details 
            return false;
        }

        $lockKey = 'event_' . $user->id . '_lock';
        if (!Cache::lock($lockKey, 5)) {
            Log::error("Failed to acquire lock for granting item (user: {$user->id}, item: {$item->id})"); // Log error details 
            return false;
        }

        try {
            // Check if user already has the item (assuming `crate` is a relationship method)
            if ($user->crate()->itemId($item->id)->exists()) {
                return true;
            }

            // Grant the item (assuming `create` creates a new record in the crate table)
            return $user->inventory()->create(['crateable_id' => $item->id, 'crateable_type' => 1])->exists();
        } catch (\Exception $e) {
            Log::error("Error granting item (user: {$user->id}, item: {$item->id}): " . $e->getMessage()); // Log error details
            return false;
        } finally {
            optional(Cache::store())->forget($lockKey); // Release lock using current store
        }
    }
}
