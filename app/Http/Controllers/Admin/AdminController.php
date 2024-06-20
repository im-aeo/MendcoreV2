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
use Carbon\Carbon;
use App\Models\UserBan;
class AdminController extends Controller
{
    public function AdminIndex()
    {
        if (!Auth::check() || !Auth::user()->isStaff()) {
            abort(403); // Immediately return a 404 for unauthorized users
        }
        $admin = Admin::where('user_id', Auth::id())->first();
        return inertia('Admin/Dashboard', [
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

    public function UserIndex()
    {
        // Define a cache key for this query result
        $cacheKey = 'users_index';
        $users = cache()->remember($cacheKey, now()->addMinutes(30), function () {
            return User::orderBy('id', 'asc')->paginate(10)->through(function ($user) {
                return [
                    'id' => $user->id,
                    'isBanned' => $user->hasActiveBan(),
                    'isStaff' => $user->isStaff(),
                    'username' => $user->username,
                    'display_name' => $user->display_name,
                    'email' => $user->email,
                    'status' => $user->status,
                    'DateHum' => $user->DateHum,
                    'headshot' => $user->headshot(),
                ];
            });
        });
        return inertia('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function ManageUser(int $id)
    {
        // Define a cache key for this query result
        $cacheKey = 'users_manage';
        $user = cache()->remember($cacheKey, now()->addMinutes(30), function () use ($id) {
            //->load(['settings'])
            return User::where(['id' => $id])->first();
        });
        if (!$user) {
            abort(404);
        }
        $joindate = Carbon::parse($user->created_at)->format('M d Y');

        return inertia('Admin/Users/Manage', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'display_name' => $user->display_name,
                'lastIp' => $user->LastIp(),
                'email' => $user->email,
                'about_me' => $user->about_me,
                'headshot' => $user->headshot(),
                'bucks' => $user->bucks,
                'coins' => $user->coins,
                'joined' => $joindate,
            ]
        ]);
    }
}
