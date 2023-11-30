<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserSettings;
//use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Validation\ValidationException;
use Predis\Client;
use App\Models\Avatar;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    
    public function LoginVal(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt(['username' => $credentials['username'], 'password' => $credentials['password']])) {
            // Authentication passed
            return redirect()->intended(RouteServiceProvider::HOME)->with('success', 'You have Authenticated.');
        }

        // Authentication failed
        throw ValidationException::withMessages([
            'username' => __('auth.failed'),
        ]);
    }

    public function LoginIndex()
    {
        return Inertia::render('Authentication/Login');
    }

    public function ForgotIndex()
    {
        return Inertia::render('Authentication/Forgot');
    }

    public function RegisterIndex()
    {
        return Inertia::render('Authentication/Create');
    }

    /**
     * @OA\Post(
     *     path="/auth/register/validate",
     *     summary="Register a new user",
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="User's name",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         description="User's email",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="User's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="201", description="User registered successfully"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */
    public function registerVal(Request $request)
    {
        $request->validate([
            'username' => 'required|alpha_num|min:3|max:25|unique:'.User::class,
            'displayname' => 'required|alpha_num|min:3|max:25',
            'birthdate.day' => 'required|numeric|min:1|max:31',
            'birthdate.month' => 'required|numeric|min:1|max:12',
            'birthdate.year' => 'required|numeric|min:1900|max:' . date('Y'),
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    
        // Check if the username field is present in $request
        if (!$request->username) {
            return response()->json(['error' => 'username_not_provided'], 422);
        }
    
        if (User::where('username', $request->username)->exists()) {
            return response()->json(['error' => 'username_exists'], 422);
        }
    
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['error' => 'email_exists'], 422);
        }
    
        $birthdate = sprintf(
            '%02d/%02d/%04d',
            $request->input('birthdate.month'),
            $request->input('birthdate.day'),
            $request->input('birthdate.year')
        );
        
        $user = User::create([
            'username' => $request->username,
            'display_name' => $request->displayname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birthdate' => $birthdate,
            'status' => 'Hey, Im new to ' . config('Values.name'),
            'about_me' => 'Greetings! Im new to ' . config('Values.name'),
        ]);

        UserSettings::create([
            'user_id' => $user->id,
            // Add other setting fields here
        ]);

        // Create associated avatar
        Avatar::create([
            'user_id' => $user->id,
            // Add other avatar fields here
        ]);
    
        event(new Registered($user));
    
        Auth::login($user);
    }
    

    public function UserExit(): RedirectResponse
    {
        Auth::guard('web')->logout();

        return redirect()->back();
    }
}
