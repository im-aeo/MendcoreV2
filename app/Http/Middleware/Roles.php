<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Stevebauman\Location\Facades\Location;
use App\Models\IpLog;

class Roles
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
        $user = Auth::user();
        if (Auth::check() && $user->lastIP() == null) {
            $ipLog = new IpLog;
            $ipLog->user_id = Auth::user()->id;
            $ipLog->ip = $request->ip();
            $ipLog->save();
        }

        if (Auth::check() && config('Values.in_testing_phase') && !$user->settings->beta_tester) {
            $user->settings->beta_tester = true;
            $user->save();
        }

        return $next($request);
    }
}
