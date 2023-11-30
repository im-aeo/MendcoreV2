<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\IPBan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfBanned
{
    public const ALLOWED_ROUTES = [
        'auth.logout',
        'removed',
        'account.banned.reactivate'
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $route = $request->route()->getName();
        $user = Auth::user();

        if (Auth::check() && $user->deleted == 1 && !in_array($route, $this::ALLOWED_ROUTES))
            return redirect()->route('removed');

        return $next($request);
    }
}
