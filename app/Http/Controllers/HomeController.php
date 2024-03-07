<?php
namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Item;
use Inertia\Inertia;
use App\Models\Status;
use App\Models\ForumThread;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function WelcomeIndex()
    {
        // Define a cache key for this query result
        $cacheKeyItems = 'landing_items';
        $cacheKeyPosts = 'landing_Posts';

        // Use caching to store the user count query result
        $landingItems = cache()->remember($cacheKeyItems, now()->addHours(1), function () {
            return Item::inRandomOrder()->limit(4)->get();
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
        // Define a cache key for this query
        $cacheKey = 'dashboard_statuses';

        // Use caching to store the statuses query results
        $statuses = cache()->remember($cacheKey, now()->addMinutes(5), function () {
            return Status::where([
                ['message', '!=', null]
            ])->orderBy('created_at', 'desc')->paginate(12)->through(function ($status) {
                return [
                    'name' => $status->creator->username,
                    'dname' => $status->creator->display_name,
                    'timecreated' => $status->created_at,
                    'message' => $status->message,
                    'DateHum' => $status->DateHum,
                ];
            });
        });

        return inertia('Dashboard', [
            'slist' => $statuses,
        ]);
    }


    public function DashboardVal(Request $request)
    {
        $this->validate($request, [
            'message' => ['max:124']
        ]);

        if ($request->message != Auth::user()->latestStatus()) {
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
