<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GiveDailyCurrency
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
        $userAgent = $request->header('User-Agent');
        $adblockKeywords = ['adblock', 'ublock', 'ad blocker', 'uBlockOrigin', 'adguard'];
        
        foreach ($adblockKeywords as $keyword) {
            if (stripos($userAgent, $keyword) !== false) {
                // Adblock keyword found in user agent, take appropriate action
                return response()->json(['error' => 'Adblock detected. Please disable it to receive daily currency.']);
            }
        }

        // Continue with the regular logic if no adblock keyword is detected
        if (Auth::check() && strtotime(Auth::user()->next_currency_payout) < time()) {
            $user = Auth::user();

            $amount = 10;

            $user->coins += $amount;
            $user->next_currency_payout = Carbon::now()->addHours(24)->toDateTimeString();
            $user->save();
        }

        return $next($request);
    }
}
