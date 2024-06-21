<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Endpoints\RssController;
use App\Http\Controllers\Endpoints\UserController;
use App\Http\Controllers\Endpoints\AvatarController;
use App\Http\Controllers\Endpoints\RenderController;
use App\Http\Controllers\Endpoints\ItemApiController;
use App\Http\Controllers\Endpoints\ThumbnailController;
use App\Http\Controllers\Endpoints\SearchSiteController;
use App\Http\Controllers\Endpoints\NotificationController;
use App\Http\Controllers\Endpoints\SettingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'throttle:30,1'], function () {

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/', function () {
        return redirect()->to(config('Values.production.domains.main'));
    });

    Route::get('/search', [SearchSiteController::class, 'all'])->name('search');

    Route::get('/render/validate/{id}', [RenderController::class, 'userRender'])->name('avatar');

    Route::group(['as' => 'user.', 'prefix' => 'users'], function () {
        Route::get('/', function () {
            return redirect()->to(config('Values.production.domains.main'));
        });
        Route::get('/online/{id}', [UserController::class, 'getStatus'])->name('online');
        Route::get('/status-list', [UserController::class, 'getUserStatus'])->name('status');
        Route::get('/user/img/{id}', [UserController::class, 'getAvatar'])->name('avatar');
        Route::get('/follow/{user}', [UserController::class, 'follow'])->name('follow');
        Route::post('/unfollow/{user}', [UserController::class, 'unfollow'])->name('unfollow');
    });
    Route::group(['as' => 'dashboard.', 'prefix' => 'dash'], function () {
        Route::get('/', function () {
            return redirect()->to(config('Values.production.domains.main'));
        });
        Route::get('/status-list', [UserController::class, 'getDashboardStatus'])->name('statuses');
    });

    Route::group(['as' => 'notif.', 'prefix' => 'notifications'], function () {
        Route::get('/', function () {
            return redirect()->to(config('Values.production.domains.main'));
        });
        Route::post('/read-all', [NotificationController::class, 'ReadAll'])->name('read-all');
    });

    Route::group(['as' => 'store.', 'prefix' => 'market'], function () {
        Route::get('/', function () {
            return redirect()->to(config('Values.production.domains.main'));
        });
        Route::get('/items/{category}', [ItemApiController::class, 'getItemsByCategory'])->name('items');
        Route::get('/items/event/{eventId}', [ItemApiController::class, 'getEventItems'])->name('event.items');
        Route::post('/item/purchase/{id}/{currencyType}', [ItemApiController::class, 'purchase'])->name('purchase');
    });

    Route::group(['as' => 'avatar.', 'prefix' => 'avatar'], function () {
        Route::get('/', function () {
            return redirect()->to(config('Values.production.domains.main'));
        });
        Route::get('/{category}', [AvatarController::class, 'getItemsByCategory'])->name('items');
        Route::get('/wearing', [AvatarController::class, 'getWearingItems'])->name('wearing-items');
        Route::get('/wearing-hats', [AvatarController::class, 'getWearingHats'])->name('wearing-hats');

        Route::get('/wear/{id}/{slot}', [AvatarController::class, 'WearItem'])->name('wear-item');
    });

    Route::group(['as' => 'settings.', 'prefix' => 'settings'], function () {
        Route::get('/', function () {
            return redirect()->to(config('Values.production.domains.main'));
        });
        Route::post('/change-country/{country}', [SettingsController::class, 'changeCountry'])->name('changeCountry');
    });

    Route::get('/rss-feed', [RssController::class, 'index'])->name('rss');
    Route::get('/thumbnails/{type}/{id}', [ThumbnailController::class, 'getThumbnail'])->name('thumbnails');
});
