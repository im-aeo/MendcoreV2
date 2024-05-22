<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\IPBan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserBan;

class RedirectIfBanned
{
    public const ALLOWED_ROUTES = [
        'auth.logout',
        'removed',
        'account.banned.reactivate',
    ];

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $route = $request->route()->getName();
        $user = Auth::user();

        // Check if user is logged in, banned, and accessing a non-allowed route
        if (Auth::check() && $user->hasActiveBan() && !in_array($route, self::ALLOWED_ROUTES)) {
            $ban = UserBan::where('user_id', $user->id)
                ->where('active', true)
                ->orderByDesc('created_at')
                ->first();

                if($ban->length <= $ban->created_at)
                    $clear = true;
                else 
                    $clear = false;

            if ($ban) {
                //InetriaPage
                return inertia('AccountDeleted', [
                    'ban' => $ban,
                    'ban.type' => $ban->getUserBanType(),
                    'ban.cleared' => $clear,
                ]);
            }
        }

        return $next($request);
    }
}