<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User; // Assuming your user model

class VerifyAccount
{
  protected $verifyRoutes;
  protected $apiVerifyUrls;

  public function __construct()
  {
    $this->verifyRoutes = config('verify.routes', []);
    $this->apiVerifyUrls = config('verify.api_urls', []);
  }

  /**
   * Check if the request requires email verification.
   *
   * @param Request $request
   * @return bool
   */
  protected function requiresVerification(Request $request)
  {
    if (!app()->environment('production') || !Auth::check() || Auth::user()->verified) {
      return false;
    }

    $route = Route::current();
    $url = str_replace("{$request->root()}/api", '', $request->url());

    return in_array($url, $this->apiVerifyUrls) || in_array($route->uri(), $this->verifyRoutes);
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