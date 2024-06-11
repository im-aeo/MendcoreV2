<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

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
        $response = Http::get('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        if($response->failed()) {
            // Adblock keyword found in user agent, take appropriate action
            return response()->json(['error' => 'Adblock detected. Please disable it to receive your daily rewards.']);
        } elseif (Auth::check() && !empty(Auth::user()->next_reward_payout) && strtotime(Auth::user()->next_reward_payout) < time()) {
            // Continue with the regular logic if no adblock detected 
            /** @var \App\Models\User $user **/
            $user = Auth::user();

            
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
