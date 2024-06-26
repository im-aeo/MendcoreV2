<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }


    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
         return [
            'site' => config('Values'),
            'locale' => function () {
                return app()->getLocale();
            },
            'locales' => function () {
                return config('ActiveLocales');
            },
            'language' => function () {
                return translations(
                    resource_path('lang/' . app()->getLocale() . '.json')
                );
            },
            'auth' => function () use ($request) {
                return [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'username' => $request->user()->username,
                        'display_name' => $request->user()->display_name,
                        'email' => $request->user()->email,
                        'birthdate' => $request->user()->birthdate,
                        'coins' => $request->user()->coins,
                        'bucks' => $request->user()->bucks,
                        'status' => $request->user()->status,
                        'staff' => $request->user()->isStaff(),
                        'position' => $request->user()->CurrentPosition(),
                        'about_me' => $request->user()->about_me,
                        'headshot' => $request->user()->headshot(),
                        'following' => $request->user()->following(),
                        'settings' => $request->user()->settings,
                        'level' => $request->user()->getLevel(),
                        'xp' => $request->user()->getPoints(),
                        'nextlevelxp' =>  $request->user()->nextLevelAt(),
                        'notifications' => $request->user()->unreadNotifications()->limit(5)->get()
                            ->each(function ($notification) {
                                $notification->DateHum = $notification->created_at->diffForHumans();
                            }),
                    ] : null,
                ];
            },
            'site' => config('Values'),
            'message' => $request->session()->get('message'),
            'error' => $request->session()->get('error'),
            'errors' => $this->shareValidationErrors($request)
        ];
    }
    public function shareValidationErrors(Request $request)
    {
        if (!$request->session()->has('errors')) {
            return (object) [];
        }

        return (object) collect($request->session()->get('errors')->getBags())->map(function ($bag) {
            return (object) $bag->toArray();
        })->pipe(function ($bags) use ($request) {
            if ($bags->has('default') && $request->header('x-inertia-error-bag')) {
                return [$request->header('x-inertia-error-bag') => $bags->get('default')];
            } elseif ($bags->has('default')) {
                return $bags->get('default');
            } else {
                return $bags->toArray();
            }
        });
    }
    public function handle(Request $request, \Closure $next)
    {
        return parent::handle($request, $next);
    }
}
