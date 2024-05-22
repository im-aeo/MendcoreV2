<?php

namespace App\Http\Controllers\Endpoints;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;
use Illuminate\Support\Facades\Auth;

class AvatarController extends Controller
{
    public function getItemsByCategory(Request $request, $category)
    {
        $inventory = Inventory::where('user_id', Auth::id())->orderBy('updated_at')->get();

        return response()->json($inventory);
    }
}
