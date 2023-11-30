<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];
    /**
     * A list of error messages
     *
     * @var array<int, string>
     */
    protected $messages = [
        500 => 'Sorry, we are doing some maintenance. Please check back soon.',
        503 => 'Whoops, something went wrong on our servers.',
        404 => 'The page you are looking for could not be found.',
        403 => 'You are not authorized to access this page.',
    ];
    /**
     * A list of backend development helpers
     *
     * @var array<int, string>
     */
    protected $routes = [
        500 => 'E_GENERIC_EXCEPTION',
        503 => 'E_SERVICE_UNAVAILABLE',
        404 => 'E_ROUTE_NOT_FOUND',
        403 => 'E_FORBIDDEN',
    ];

    protected $icons = [
        500 => 'fa-duotone fa-bomb text-danger',
        503 => 'E_SERVICE_UNAVAILABLE',
        404 => 'fa-duotone fa-exclamation text-warning',
        403 => 'fa-duotone fa-shield-keyhole text-danger',
    ];
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        $status = $response->getStatusCode();

        if (app()->environment(['local', 'testing'])) {
            return $response;
        }

        if (!array_key_exists($status, $this->messages)) {
            return $response;
        }

	if ($exception instanceof ModelNotFoundException && $request->wantsJson())
        {
           return response()->json([
              'data' => 'Resource not found'
           ], 404);
        }

        if (!$request->isMethod('GET')) {
            return back()
                ->setStatusCode($status)
                ->with('error', $this->messages[$status]);
        }

        return inertia('App/Error', [
            'status' => $status,
            'message' => $this->messages[$status],
	    'adonis_error' => $this->routes[$status],
	    'icon' => $this->icons[$status]
        ])
            ->toResponse($request)
            ->setStatusCode($status);
    }
    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
