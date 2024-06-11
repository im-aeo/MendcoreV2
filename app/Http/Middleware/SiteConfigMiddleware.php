<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SiteSettings;

class SiteConfigMiddleware
{
    public function handle(Request $request, Closure $next)
    {

        // Share the site configuration settings with Inertia
        Inertia::share('site_config', [
            'announcement_message' => site_setting('announcement_message') ?? null,
            'announcement' => site_setting('announcement_enabled') ?? false,
            'in_maintenance' => site_setting('site_maintenance') ?? false,
        ]);

        return $next($request);
    }
}
