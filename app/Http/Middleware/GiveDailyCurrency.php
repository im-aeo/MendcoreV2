<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

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
        $response = Http::get('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        if($response->failed()) {
            // Adblock keyword found in user agent, take appropriate action
            return response()->json(['error' => 'Adblock detected. Please disable it to receive your daily rewards.']);
        } elseif (Auth::check() && strtotime(Auth::user()->next_currency_payout) < time()) { 
            // Continue with the regular logic if no adblock detected 
            $user = Auth::user();
            if (config('Values.in_testing_phase')) {
                 $user->settings->beta_tester = true;
            }
            if ($user->settings->beta_tester) {
                 $amount = 200;
                 $Pointsamount = 400;
            } else {
                 $amount = 10;
                 $Pointsamount = 100;
            }
           
            $user->coins += $amount;
            $user->addPoints($Pointsamount);
            $user->next_currency_payout = Carbon::now()->addHours(24)->toDateTimeString();
            $user->save();
        }
        return $next($request);
    }
}
