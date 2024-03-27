<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Item;
use Inertia\Response;
use App\Models\Avatar;
use App\Models\UserSettings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller 
{
      public function PanelIndex() 
      {
          if (Auth::check() && !Auth::user()->isStaff()) {
              abort(404);
          }
          $userCount == User::count();
          $userCount == Item::count();
          
            
      }
}
