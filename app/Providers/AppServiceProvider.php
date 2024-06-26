<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void
    {

        if ($this->app->environment('production')) {
            $url->forceScheme('https');
        }

        if ($this->app->environment('production')) {
            Inertia::version(function () {
                return md5_file(public_path('manifest.json'));
            });
        }

        Inertia::share([
            'locale' => function () {
                return app()->getLocale();
            },
            'csrf_token' => csrf_token(),
            'language' => function () {
                if (!file_exists(resource_path('lang/' . app()->getLocale()
                    . '/' . app()->getLocale() . '.json'))) {
                    return [];
                }
                return json_decode(
                    file_get_contents(
                        resource_path('lang/' . app()->getLocale() . '/'
                            . app()->getLocale() . '.json')
                    ),
                    true
                );
            },

        ]);
    }
}
