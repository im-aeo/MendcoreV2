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
        // Fetch the site configuration settings from the database
        $siteConfig = SiteSettings::first(); // Adjust the query to retrieve the data as needed

        // Share the site configuration settings with Inertia
        Inertia::share('site_config', [
            'announcement_message' => $siteConfig ? $siteConfig->announcement_message : null,
            'announcement' => $siteConfig ? $siteConfig->announcement_enabled : false,
            'in_maintenance' => $siteConfig ? $siteConfig->site_maintenance : false,


        ]);

        return $next($request);
    }
}
