<?php

namespace App\Http\Controllers\Endpoints;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Followers;
use App\Models\Avatar;
use App\Models\Status;

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

        return response()->json($statuses)->toArray(); // Convert the paginator to an array
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
        // Check if the logged-in user is the same as the user they are trying to follow
        if ($loggedInUser->id === $user->id) {
            return response()->json(['message' => 'You cannot follow yourself.'], 400);
        }

        $loggedInUser->following()->attach($user->id);

        return response()->json(['message' => 'Successfully followed.']);
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
}
