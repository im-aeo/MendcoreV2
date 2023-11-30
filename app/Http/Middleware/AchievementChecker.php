<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AchievementChecker
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $itemCount = Inventory::where('user_id', '=', $user->id)->count();

            // Administrator
            if ($user->isStaff() && !$user->Achieved(1))
                $user->Acheive(1);
            else if (!$user->isStaff() && $user->Achieved(1))
                $user->removeAchievement(1);

            // Forumer
            if ($user->Level >= 7 && !$user->Achieved(2))
                $user->Acheive(2);
            else if ($user->Level < 7 && $user->Achieved(2))
                $user->removeAchievement(2);

            // Friendship
            if ($user->friends()->count() >= 20 && !$user->Achieved(3))
                $user->Acheive(3);

            // Rich
            if ($user->coins >= 500 && !$user->Achieved(5))
                $user->Acheive(5);

            // Stockpiler
            if ($itemCount >= 50 && !$user->Achieved(6))
                $user->Acheive(6);

            // Membership
            if ($user->hasMembership() && !$user->Achieved(9))
                $user->Acheive(9);
            else if (!$user->hasMembership() && $user->Achieved(9))
                $user->removeAchievement(9);
        }

        return $next($request);
    }
}
