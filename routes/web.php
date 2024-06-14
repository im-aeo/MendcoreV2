<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\USController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Market\MarketController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GrabController;
use App\Http\Controllers\Web3LoginController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\GoogleSocialiteController;
use App\Http\Controllers\AchievementController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Forum\ForumController;
use App\Http\Controllers\Leaderboard\LeaderboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" Middleware group. Now create something great!
|
*/



Route::group(['as' => 'maintenance.', 'prefix' => 'maintenance'], function () {
    Route::get('/', [MaintenanceController::class, 'show'])->name('page');
    Route::post('/password', [MaintenanceController::class, 'authenticate'])->name('authenticate.password');
    Route::get('/exit', [MaintenanceController::class, 'Exit'])->name('exit');
});

Route::group(['as' => 'leaderboard.', 'prefix' => 'leaderboard'], function () {
    Route::get('/', [LeaderboardController::class, 'LeaderboardIndex'])->name('page');
});

Route::group(['as' => 'my.', 'prefix' => 'my', 'middleware' => 'auth'], function () {

    Route::group(['Middleware' => 'auth'], function () {
        Route::group(['as' => 'dashboard.', 'prefix' => 'dashboard'], function () {
            Route::get('/', [HomeController::class, 'DashboardIndex'])->name('page');
            Route::post('/', [HomeController::class, 'DashboardVal'])->name('validate');
        });
    });
});

Route::group(['as' => 'user.', 'prefix' => 'user'], function () {
    Route::get('/discover', [UserController::class, 'UserIndex'])->name('page');
    Route::get('/@{username}', [UserController::class, 'ProfileIndex'])->name('profile');
    Route::group(['middleware' => 'auth'], function () {
        Route::group(['as' => 'settings.', 'prefix' => 'settings'], function () {
            Route::get('/', [USController::class, 'edit'])->name('page');
            Route::patch('/update', [USController::class, 'update'])->name('update');
            Route::post('/delete-account', [USController::class, 'destroy'])->name('destroy');
        });
    });
});

Route::group(['as' => 'avatar.', 'prefix' => 'customize', 'middleware' => 'auth'], function () {
    Route::get('/', [GrabController::class, 'customizeIndex'])->name('page');
    Route::post('/update', [GrabController::class, 'UpdateAvatar'])->name('update');
});

Route::group(['as' => 'forum.', 'prefix' => 'discuss'], function () {
    Route::get('/{id}', [ForumController::class, 'ForumIndex'])->name('page');
    Route::get('/post/{id}/{slug}', [ForumController::class, 'ForumPost'])->name('post');
    Route::group(['as' => 'create.', 'prefix' => 'create'], function () {
        Route::get('/{id}', [ForumController::class, 'ForumCreate'])->name('page');
        Route::post('/{id}/validate', [ForumController::class, 'ForumVal'])->name('validate');
    });
    Route::group(['as' => 'reply.', 'prefix' => 'create/reply'], function () {
        Route::post('/{id}/validate', [ForumController::class, 'ForumReply'])->name('validate');
    });
});

Route::get('/achievements', [AchievementController::class, 'AchievementList'])->name('acheivements');


Route::group(['as' => 'auth.', 'prefix' => 'auth'], function () {

    Route::post('logout', [AuthController::class, 'UserExit'])->name('logout');
    Route::get('/set-language/{language}', function ($language) {
        Session()->put('locale', $language);
        return redirect()->back();
    })->name('language');


    Route::group(['middleware' => 'guest'], function () {
        Route::group(['as' => 'login.', 'prefix' => 'login'], function () {
            // Google login
            Route::get('/google/v1', [GoogleSocialiteController::class, 'redirectToGoogle'])->name('google');
            Route::get('callback/google', [GoogleSocialiteController::class, 'handleCallback'])->name('google.validation');

            //  remove (//) If you want Facebook login
            //Route::get('auth/facebook', [FacebookSocialiteController::class, 'redirectToFB']);
            //Route::get('callback/facebook', [FacebookSocialiteController::class, 'handleCallback']);
            Route::get('/', [AuthController::class, 'LoginIndex'])->name('page');
            Route::post('/validate', [AuthController::class, 'LoginVal'])->name('validate');
            Route::get('/validate/metamask', [Web3LoginController::class, 'message'])->name('metamask');
            Route::post('/validate/meta-mask-api', [Web3LoginController::class, 'verify'])->name('metamask.validation');
        });

        Route::group(['as' => 'register.', 'prefix' => 'register'], function () {

            Route::get('/', [AuthController::class, 'RegisterIndex'])->name('page');
            Route::post('/validate', [AuthController::class, 'RegisterVal'])->name('validate');
        });

        Route::group(['as' => 'forgot.', 'prefix' => 'forgot'], function () {
            Route::get('/', [AuthController::class, 'ForgotIndex'])->name('page');
        });
    });
});

Route::get('/', [HomeController::class, 'WelcomeIndex'])->Middleware(['guest'])->name('Welcome');

Route::group(['as' => 'games.', 'prefix' => 'games'], function () {
    Route::get('/', function () {
        return inertia('Games/Index');
    })->name('page');
});
Route::get('/deletion', function () {
    return inertia('AccountDeleted');
})->name('removed');

Route::group(['as' => 'store.', 'prefix' => 'market'], function () {
    Route::get('/', [MarketController::class, 'StoreIndex'])->name('page');
    Route::group(['as' => 'create.', 'prefix' => 'create'], function () {
        Route::get('/', [MarketController::class, 'CreateIndex'])->name('page');
        Route::post('/validate', [MarketController::class, 'uploadItem'])->name('validate');
    });
    Route::get('/item/{id}', [MarketController::class, 'StoreItem'])->name('item');
    Route::post('/item/purchase/{id}/{currencyType}', [MarketController::class, 'purchase'])->name('purchase');
});
Route::group(['as' => 'spaces.', 'prefix' => 'spaces'], function () {
    Route::get('/', [GrabController::class, 'SpacesIndex'])->name('page');
    Route::get('/{id}/{slug}', [GrabController::class, 'SpacesView'])->name('view');
});

Route::group(['as' => 'admin.', 'prefix' => 'admin'], function () {
    Route::get('/', [AdminController::class, 'AdminIndex'])->name('page');
});
