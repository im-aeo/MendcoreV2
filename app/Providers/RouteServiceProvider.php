<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

use function PHPSTORM_META\elementType;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/my/dashboard';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

$this->routes(function () {
/*
    Route::domain(config('Values.production.domains.api'))
        ->middleware('api')
		->namespace($this->namespace)
		->as('api.')
		->group(base_path('routes/api.php'));
    */
    Route::middleware('api')
        ->prefix('api')
        ->as('api.')
	->group(base_path('routes/api.php'));
	
    Route::domain(config('Values.production.domains.careers'))
        ->middleware('web')
        ->namespace($this->namespace)
		->group(base_path('routes/careers.php'));

    Route::domain(config('Values.production.domains.main'))
        ->middleware('web')
        ->namespace($this->namespace)
        ->group(base_path('routes/web.php'));
    });
    }
}
