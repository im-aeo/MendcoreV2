<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Item;
use App\Models\Status;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Level;

class HomeController extends Controller
{
    public function WelcomeIndex()
    {
        // Define a cache key for this query result
        $cacheKeyItems = 'landing_items';
        $cacheKeyPosts = 'landing_posts';

        // Use caching to store the item count query result
        $landingItems = cache()->remember($cacheKeyItems, now()->addHours(1), function () {
            return Item::where([
                ['status', '=', 'pending']
            ])->inRandomOrder()->limit(6)->paginate(6)->through(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'thumbnail' => $item->thumbnail(),
                    'creator_username' => $item->creator->username,
                    'creator_display_name' => $item->creator->display_name,
                ];
            });
        });

        $landingPosts = cache()->remember($cacheKeyPosts, now()->addHours(1), function () {
            return ForumThread::inRandomOrder()->limit(4)->get();
        });

        return inertia('Welcome', [
            'LandingItems' => $landingItems,
            'LandingPosts' => $landingPosts,
        ]);
    }


    public function DashboardIndex()
    {
        return inertia('Dashboard', [
            'nextlevelxp' => Auth::user()->getNextLevelExp(),
        ]);
    }


    public function DashboardVal(Request $request)
    {
        $this->validate($request, [
            'message' => ['max:124']
        ]);

        if ($request->message != Auth::user()->latestStatus) {
            // Logging
            $status = new Status;
            $status->creator_id = Auth::user()->id;
            $status->message = $request->message;
            $status->save();

            // Clear the cache for the latest status
            cache()->forget('latest_status_' . Auth::user()->id);

            $user = User::find(Auth::user()->id);
            $user->status = $request->message;
            $user->save();
        }

        return back()->with('message', 'Status has been changed.');
    }
}
