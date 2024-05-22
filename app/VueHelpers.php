<?php

use App\Models\Item;
use App\Models\CrateItem;
use App\Models\Inventory;
use App\Models\SiteSettings;
use Illuminate\Support\Facades\Cache;

function translations($json)
{
    if (!file_exists($json)) {
        return [];
    }

    return json_decode(file_get_contents($json), true);
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

function pluralization($type, $plural = false)
{
  // Get item types configuration (consider error handling if not defined)
  $types = config('PermittedItemTypes');

  // Validate type and plural flag (optional)
  if (!is_string($type) || !is_bool($plural)) {
    throw new InvalidArgumentException('Invalid arguments for itemType');
  }

  $type = array_key_exists($type, $types) ? $types[$type][$plural ? 1 : 0] : ucfirst($type);

  // Handle missing plural form (optional)
  if (!$plural && !isset($types[$type][1])) {
    $type .= 's'; // Generic pluralization
  }

  return $type;
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

    if (!$isProduction) {
        // Check if the settings are cached
        $settings = Cache::remember('site_settings', now()->addMinutes(30), function () {
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

function getItemHash($id): ?string
{
  // Assuming your actual primary key column name is 'id'
  $item = Item::where('id', '=', $id)->firstOrFail();

  return $item->hash;
}