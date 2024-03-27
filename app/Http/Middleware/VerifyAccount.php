<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class VerifyAccount
{
  public const VERIFY_ROUTES = [
    // soom
  ];

  public const API_VERIFY_URLS = [
    // ... API URLs requiring verification
  ];

  /**
   * Check if the request requires email verification.
   *
   * @param Request $request
   * @return bool
   */
  protected function requiresVerification(Request $request)
  {
    if (!app()->environment('production') || !Auth::check() || Auth::user()->hasVerifiedEmail()) {
      return false;
    }

    $route = Route::currentRouteName();
    $url = str_replace("{$request->root()}/api", '', $request->url());

    return in_array($url, self::API_VERIFY_URLS) || in_array($route, self::VERIFY_ROUTES);
  }

  /**
   * Handle an incoming request.
   *
   * @param Request $request
   * @param Closure $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    if (!$this->requiresVerification($request)) {
      return $next($request);
    }

    return redirect()->route('account.verify.index')->withErrors(['message' => 'You must verify your email first to do this.']);
  }
}
