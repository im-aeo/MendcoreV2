<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class FeatureFlags
{
    public function handle(Request $request, Closure $next)
    {
        $route = $request->route()->getName();
        $middleware = $request->route()->middleware();
        $isPost = $request->isMethod('post');

        if ($this->isMaintenanceEnabled($route, $isPost)) {
            return $this->handleMaintenance($route, $request, $next);
        }

        if ($this->isFeatureDisabled($route)) {
            return $this->handleFeatureDisabled($route, $middleware, $isPost);
        }

        return $next($request);
    }

    private function isMaintenanceEnabled($route)
    {
        $maintenancePasswords = config('Values.maintenance_passwords');
        $maintenancePassword = session('maintenance_password');

        return $this->isSiteMaintenanceEnabled($maintenancePassword, $maintenancePasswords)
            && $this->shouldShowMaintenancePage($route);
    }

    private function isSiteMaintenanceEnabled($maintenancePassword, $maintenancePasswords)
    {
        return site_setting('site_maintenance')
            && ($maintenancePassword === null || !in_array($maintenancePassword, $maintenancePasswords))
            || site_setting('site_maintenance') && $maintenancePassword !== null;
    }

    private function shouldShowMaintenancePage($route)
    {
        return !session()->has('maintenance_password')
            && !Str::startsWith($route, 'maintenance.')
            && $route != 'upgrade.notify';
    }

    private function handleMaintenance($route, $request, $next)
    {
        if ($this->shouldShowMaintenancePage($route)) {
            return redirect()->route('maintenance.page');
        }

        return $next($request);
    }

    private function isFeatureDisabled($route)
    {
        $featureMap = [
            'store.' => 'market_enabled',
            'forum.' => 'discussion_enabled',
            'creator_area.' => 'item_creation_enabled',
            'avatar.' => 'customization_enabled',
            'account.trades.' => 'trading_enabled',
            'groups.' => 'spaces_enabled',
            'user.settings.' => 'user_settings_enabled',
            'account.upgrade.' => 'real_life_purchases_enabled',
            'auth.register.' => 'registration_enabled',
        ];

        foreach ($featureMap as $prefix => $feature) {
            if ($this->isFeatureSettingDisabled($feature) && Str::startsWith($route, $prefix)) {
                return true;
            }
        }
        return false;
    }

    private function isFeatureSettingDisabled($feature)
    {
    $settingValue = site_setting("{$feature}");
   // var_dump($settingValue); // Add this line to check the value of $settingValue
    return !$settingValue;
    }

    private function handleFeatureDisabled($route, $middleware, $isPost)
    {
        $feature = $this->getFeatureForRoute($route);
        $alias = $this->getFeatureAlias($feature);

        if ($feature === 'Maintenance') {
            return redirect()->route('maintenance.page');
        } elseif (!Auth::check() && in_array('auth', $middleware)) {
            return redirect()->route('auth.login.page');
        } elseif (Auth::check() && in_array('guest', $middleware)) {
            return redirect()->route('my.dashboard.page');
        } elseif ($isPost || ((!Auth::check() || (Auth::check() && !Auth::user()->isStaff())))) {
	    return inertia('App/FeatureDisabled', ['title' => $alias]);
        }

        return inertia('App/FeatureDisabled', ['title' => $alias]);
    }

    private function getFeatureForRoute($route)
    {
        $featureMap = [
            'store.' => 'market_enabled',
            'forum.' => 'discussion_enabled',
            'creator_area.' => 'item_creation_enabled',
            'avatar.' => 'customization_enabled',
            'account.trades.' => 'trading_enabled',
            'spaces.' => 'spaces_enabled',
            'user.settings.' => 'user_settings_enabled',
            'account.upgrade.' => 'real_life_purchases_enabled',
            'auth.register.' => 'registration_enabled',
        ];

        foreach ($featureMap as $prefix => $feature) {
            if (Str::startsWith($route, $prefix) && $this->isFeatureSettingDisabled($feature)) {
                return $feature;
            }
        }

        return '';
    }

    private function getFeatureAlias($feature)
    {
        $featureAliasMap = [
            'market_enabled' => 'Market',
            'discussion_enabled' => 'Forum',
            'item_creation_enabled' => 'Creator Area',
            'customization_enabled' => 'Avatar',
            'trading_enabled' => 'Trading',
            'spaces_enabled' => 'Spaces',
            'user_settings_enabled' => 'Settings',
            'real_life_purchases_enabled' => 'Real Life Purchases',
            'registration_enabled' => 'Registration',
            // ... add more aliases as needed
        ];

        return $featureAliasMap[$feature] ?? 'Unknown Feature';
    }
}
