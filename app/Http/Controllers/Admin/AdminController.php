<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Admin;

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
    public function AdminIndex()
    {
        if (Auth::check() && !Auth::user()->isStaff()) {
            abort(404);
        }
        $admin = Admin::where('user_id', Auth::id())->first();
        return inertia('Admin/Index', [
            'stats' => [
                'adminPoints' => $admin->adminPoints,
                'canControlMaintenance' => $admin->can_activate_maintenance ?? false,
                'items' => Item::count(),
                'avatars' => Avatar::count(),
            ],
            'siteSettings' => [
                'inMaintenance' => site_setting("site_maintenance"),
                'maintenanceMessage' => $admin->maintenance_message ?? ''
            ],
        ]);
    }
    public function UserIndex($id)
    {
        if (Auth::check() && !Auth::user()->isStaff()) {
            abort(404);
        }
        $user = User::where('id', $id)->first();
        return inertia('Admin/User', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'displayname' => $user,
                'about_me' => $user,

            ],
        ]);
    }
}
