<?php

namespace App\Http\Controllers\Endpoints;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Followers;
use App\Models\Avatar;
use App\Models\Status;
use App\Notifications\FollowerNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\Inventory;

class UserController extends Controller
{
    public function getStatus($userID)
    {
        $user = User::where('id', '=', $userID)->first();

        if ($user && $user->online()) {
            return response()->json(['online' => true]);
        } else {
            return response()->json(['online' => false]);
        }
    }

    public function getUserStatus(Request $request)
    {
        $statuses = Status::where([
            //['creator_id', '!=', Auth::user()->id],
            ['message', '!=', null]
        ])->orderBy('created_at', 'desc')->paginate(2)->through(function ($status) {
            return [
                'name' => $status->creator->username,
                'dname' => $status->creator->display_name,
                'timecreated' => $status->created_at,
                'message' => $status->message,
                'DateHum' => $status->DateHum,
            ];
        });

        return response()->json($statuses); // Convert the paginator to an array
    }

    public function getDashboardStatus(Request $request)
    {
        // Define a cache key for this query
        $cacheKey = 'dashboard_statuses';
        $statuses = cache()->remember($cacheKey, now()->addMinutes(5), function () {
            $s = Status::where([
                ['message', '!=', null]
            ])->orderBy('created_at', 'desc')->paginate(4);

            // Transform each status object into a desired structure
            $statuses = $s->transform(function ($status) {
                return [
                    'name' => $status->creator->username,
                    'dname' => $status->creator->display_name,
                    'timecreated' => $status->created_at, // assuming this is the desired format
                    'message' => $status->message,
                    'DateHum' => $status->DateHum,
                    'thumbnail' => $status->creator->headshot(),
                ];
            });

            // Return the transformed data as JSON
            return response()->json($statuses);
        });
        return $statuses;
    }


    public function getAvatar($userID)
    {
        $GetUser = Avatar::where('id', '=', $userID)->first();
        $url = config('Values.storage.url');
        $image = ($GetUser->image === 'default') ? config('Values.render.default_avatar') : $GetUser->image;
        $image =  "{$url}/{$image}.png";
        echo ($image);
    }

    public function getFollowingStatus($userID)
    {
        $userfollowing = Followers::where(['follower_id' => Auth::user()->id, 'following_id' => $userID])->exists()->first();
        dd($userfollowing);

        if ($userfollowing) {
            return response()->json(['online' => true]);
        } else {
            return response()->json(['online' => false]);
        }
    }

    public function follow(User $user)
    {
        $loggedInUser = Auth::user();

        if ($loggedInUser->id === $user->id) {
            // User is logged in and trying to follow themself
            return response()->json(['message' => 'You cannot follow yourself.'], 400);
        };

        if ($loggedInUser->isFollowing($user)) {
            return response()->json(['message' => 'You are already following this user.'], 400);
        };

        if ($loggedInUser !== null) {
            $loggedInUser->following()->attach($user->id);
            $user->notify(new FollowerNotification($loggedInUser));
            return response()->json(['message' => 'Successfully followed.'], 200);
            // ...
        } else {
            return response()->json(['message' => 'Login to follow this user.'], 503);
        }
    }

    public function unfollow(User $user)
    {
        $loggedInUser = Auth::user();

        // Check if the logged-in user is the same as the user they are trying to unfollow
        if ($loggedInUser->id === $user->id) {
            return response()->json(['message' => 'You cannot unfollow yourself.'], 400);
        }

        $loggedInUser->following()->detach($user->id);

        return response()->json(['message' => 'Successfully unfollowed.']);
    }

    public function getUserItems($userID)
    {
        $inventory = Inventory::where('id', $userID);
        return response()->json($inventory);
    }
}
