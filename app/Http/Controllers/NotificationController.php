<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{
    public function NotificationIndex()
    {
        // page soon

        return inertia('Welcome', [
            'LandingItems' => $landingItems,
            'LandingPosts' => $landingPosts,
        ]);
    }

    public function ReadAll()
    {
        $user = App\Models\User::find(1);
 
foreach ($user->unreadNotifications as $notification) {
    $notification->markAsRead();
}

        return response()->json([
            'type' => 'success',
            'message' => 'All Notifications Read.',
        ]);
}
}