<?php

namespace App\Http\Controllers\Endpoints;

use Illuminate\Http\Request;
use App\Models\User; // Use Laravel's database facade
use App\Http\Controllers\Controller;
use Kaankilic\WtFilter\Facades\WtFilter;  // Use the WtFilter facade
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function enableMaintenance(Request $request)
    {

        if (!Auth::check() || !Auth::user()->isStaff()) {
            abort(403); // Immediately return a 403 for unauthorized users
        }

    }
    public function disableMaintenance(Request $request)
    {

        if (!Auth::check() || !Auth::user()->isStaff()) {
            abort(403); // Immediately return a 403 for unauthorized users
        }

    }
}
