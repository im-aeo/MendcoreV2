
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // Added for logging

class WordFilterCheck
{
  public const FILTER_ROUTES = [
    // ... Your route mappings with filterable fields
  ];

  public const API_FILTER_URLS = [
    // ... Your API URL mappings with filterable fields
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
    $url = str_replace("{$request->root()}/api", '', $request->url());
    $enabled = (Auth::check() && Auth::user()->isStaff()) ? false : true;

    if ($enabled && $request->isMethod('post') && 
        (array_key_exists($url, self::API_FILTER_URLS) || 
         array_key_exists($route, self::FILTER_ROUTES))) {

      $api = $request->is('api/*');
      $params = (!$api) ? self::FILTER_ROUTES[$route] : self::API_FILTER_URLS[$url];

      $blacklist = config('filter.blacklist');
      $whitelistDomains = config('filter.whitelist_domains');

      foreach ($params as $param) {
        if ($this->isProfanity($request->$param, $blacklist)) {
          if (!$api) {
            return back()
              ->withErrors(['One or more words have triggered our profanity filter. Please update and try again.']);
          } else {
            return response()->json([
              'error' => 'One or more words have triggered our profanity filter. Please update and try again.',
            ]);
          }
        }
      }

      // Domain whitelisting check
      $domainContent = str_replace(['https://', 'http://'], '', $request->url());
      $domainContent = preg_replace('/[^a-z0-9.-]/', '', $domainContent);
      $domainOk = false;

      foreach ($whitelistDomains as $whitelistDomain) {
        if (substr_compare($domainContent, $whitelistDomain, -strlen($whitelistDomain)) === 0) {
          $domainOk = true;
          break;
        }
      }

      if (!$domainOk) {
        Log::warning("Suspicious domain detected: " . $domainContent);
      }
    }

    return $next($request);
  }

  /**
   * Check for profanity in content.
   *
   * @param string $content
   * @param array $blacklist
   * @return bool
   */
  public function isProfanity($content, $blacklist)
  {
    $tempContent = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '', $content));
    $tempContent = preg_replace('/\s+/', ' ', $tempContent);
    $wordsRegex = '/(' . implode('|', $blacklist) . ')/i';

    $flag = false;

    foreach ($blacklist as $blword) {
      if (stripos($tempContent, $blword) !== false) {
        $flag = true;
        break;
      }
    }

    if ($flag) {
      Log::warning("Profanity detected in request: " . $content);
    }

    return $flag;
  }
}
