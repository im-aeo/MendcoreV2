<?php

namespace App\Http\Controllers\Endpoints;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AvatarController extends Controller
{
     public function getItemsByCategory(Request $request, $category, $userID)
{
    $inventory = Inventory::where('id', $id);
    if ($category === 'Recent') {
        // Get all items sorted by updated_at
        $items = Item::orderBy('updated_at')->get();

    } else {
        // Get items with a specific item_type sorted by updated_at
        $items = Item::where('item_type', $category)->orderBy('updated_at')->get();
    }

    return response()->json($items);
}

}
