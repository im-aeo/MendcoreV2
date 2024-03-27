<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FloodCheck
{
  public const FLOOD_ROUTES = [
    'account.inbox.create',
    'account.settings.update',
    // ... other routes
  ];

  public const API_FLOOD_URLS = [
    'render/validare',
    // ... other routes soon
  ];

  /**
   * Check if the request is a flood attempt for logged-in users.
   *
   * @param Request $request
   * @return bool
   */
  protected function isFloodAttempt(Request $request)
  {
    if (!Auth::check() || !$request->isMethod('post')) {
      return false;
    }

    $route = $request->route()->getName();
    $url = str_replace("{$request->root()}/api/", '', $request->url());

    return in_array($url, self::API_FLOOD_URLS) || in_array($route, self::FLOOD_ROUTES);
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
    if (!$this->isFloodAttempt($request)) {
      return $next($request);
    }

    return $this->handleFloodAttempt($request);
  }

  /**
   * Handle flood attempt logic and return appropriate response.
   *
   * @param Request $request
   * @return Response
   */
  protected function handleFloodAttempt(Request $request)
  {
    $seconds = strtotime(Auth::user()->flood) - time();
    $word = ($seconds == 1) ? 'second' : 'seconds';

    if (time() < strtotime(Auth::user()->flood)) {
      $message = "You are trying to do things too quickly! Please wait {$seconds} {$word} before trying again.";

      if ($request->route()->getName() == 'account.trades.process') {
        if ($request->action == 'send') {
          return response()->json(['error' => $message]);
        }
      } else if ($request->route()->getName() == 'jobs.listings.apply') {
        return response()->json(['errors' => ['name' => [$message]]]);
      } else if ($request->is('api/*')) {
        return response()->json(['error' => $message]);
      } else {
        return back()->withErrors(["message" => $message]);
      }
    }

    $user = Auth::user();
    $user->flood = Carbon::createFromTimestamp(time() + env('FLOOD_TIME'))->toDateTimeString();
    $user->save();

    return $next($request);
  }
}
