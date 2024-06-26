<?php

namespace App\Http\Middleware;

use App\Models\IpLog;
use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Stevebauman\Location\Facades\Location;

class GiveDailyRewards
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
        
        // Check if the user agent contains known adblock keywords
       
        if (Auth::check() && !empty(Auth::user()->next_reward_payout) && strtotime(Auth::user()->next_reward_payout) < time()) {
            // Continue with the regular logic if no adblock detected 
            /** @var \App\Models\User $user **/
            $user = Auth::user();

            if ($user->lastIP() == null) {
                $AgentInfo = Location::get();
                $ipLog = new IpLog;
                $ipLog->user_id = Auth::user()->id;
                $ipLog->ip = $AgentInfo->ip;
                $ipLog->save();
            }


            $coinAmount = $user->settings->beta_tester ? 50 : 10;
            $buckAmount = $user->settings->beta_tester ? 10 : 1;
            $pointsAmount = $user->settings->beta_tester ? 100 : 50;

            $user->coins += $coinAmount;
            $user->bucks += $buckAmount;
            $user->addPoints($pointsAmount);
            $user->next_reward_payout = Carbon::now()->addHours(24)->toDateTimeString();
            $user->save();
        }
        return $next($request);
    }
}
