<?php

namespace App\Http\Controllers\Users;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Status;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function UserIndex()
    {
        // Define a cache key for this query result
        $cacheKey = 'users_index';

        // Use caching to store the user list query result
        $users = cache()->remember($cacheKey, now()->addMinutes(30), function () {
            return User::orderBy('updated_at', 'desc')->paginate(10)->through(function ($user) {
                $isFollowing = Auth::check() && Auth::user()->isFollowing($user) ?? false;
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'dname' => $user->display_name,
                    'staff' => $user->staff,
                    'status' => $user->status,
                    'DateHum' => $user->DateHum,
                    'avatar' => $user->headshot(),
                    'online' => $user->online(),
                    'is_following' => $isFollowing,
                ];
            });
        });

        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }


    public function ProfileIndex($username)
    {
        // Define a unique cache key for this user's profile
        $cacheKey = 'user_profile_' . $username;

        // Retrieve the user profile from the cache, ensuring `$user` is accessible
        $user = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($username) {
            return User::where('username', $username)->first();
        });
        // Check if the user exists

        if (!$user) {
            abort(404);
        }

        // Load relationships and counts
        $userFollowing = $user->following()->get();
        $FollowingCount = $userFollowing->count();

        $userFollowers = $user->followers()->get();
        $FollowerCount = $userFollowers->count();

        // Determine if the authenticated user is following the profile user
        $isFollowing = Auth::check() && Auth::user()->isFollowing($user) ?? false;

        // Determine if the profile user is following the authenticated user
        $thisFollowing = Auth::check() && $user->isFollowing(Auth::user()) ?? false;

        // Format join date
        $joindate = Carbon::parse($user->created_at)->format('M d Y');

        $statuscacheKey = $username . 'profile_statuses';
        // Use caching to store the statuses query results
        $statuses = cache()->remember($statuscacheKey, now()->addMinutes(5), function () use ($user) {
            return Status::where([
                ['creator_id', '=', $user->id]
            ])->orderBy('created_at', 'desc')->paginate(3)->through(function ($status) {
                return [
                    'name' => $status->creator->username,
                    'dname' => $status->creator->display_name,
                    'timecreated' => $status->created_at,
                    'message' => $status->message,
                    'DateHum' => $status->DateHum,
                ];
            });
        });
        
        if ($user->settings->private_profile) {
            if (Auth::check()) {
                $loggedInUser = Auth::user();
                if ($user->id != $loggedInUser->id) {
                    $response = inertia('App/ProfileDisabled', [
                        'username' => $user->username,
                    ]);
                }
            } else {
                $response = inertia('App/ProfileDisabled', [
                    'username' => $user->username,
                ]);
            }
        }
        
        $response = inertia('Users/Profile', [
            'user' => $user,
            'statuses' => $statuses,
            'user.posts' => $user->posts_count,
            'user.avatar' => $user->thumbnail(),
            'user.level' => $user->getLevel(),
            'user.settings' =>  $user->settings,
            'user.following' => $user->following()->get(),
            'user.followers' => $user->followers()->get(),
            'user.followsYou' => $thisFollowing,
            'user.followers_count' => $FollowerCount,
            'user.following_count' => $FollowingCount,
            'user.joindate' => $joindate,
            'is_following' => $isFollowing,
            'user.online' => $user->online(),
        ]);

        return $response;
    }
}
