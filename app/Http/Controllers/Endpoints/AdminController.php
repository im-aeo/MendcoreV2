<?php

namespace App\Http\Controllers\Endpoints;

use Illuminate\Http\Request;
use App\Models\User; // Use Laravel's database facade
use App\Http\Controllers\Controller;
use Kaankilic\WtFilter\Facades\WtFilter;  // Use the WtFilter facade

class UserController extends Controller
{
    public function checkUsername(Request $request)
    {

        // Validate name length (3-20 characters)
        $this->validate($request, [
            'username' => 'required|alpha_num|min:3|max:25|profane:es,en|unique:' . User::class,
            'displayname' => 'required|alpha_num|min:3|max:25|profane:es,en',
        ]);

        
        $username = $request->get('username');

        // Check username availability
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json([
                'Error' => false,
                'Message' => "OK"
            ]);
        }

        // Username taken, suggest alternative
        return response()->json([
            'Error' => true,
            'Message' => "This username is already taken! Try '$username' . " . rand(1, 999) . " instead!",
        ], 409); // Conflict
    }

    // Implement your profanity filter logic here (replace with your preferred method)
    private function filterProfanity($name)
    {
        // Replace this with your preferred profanity filter implementation
        // You can use a database lookup, external service, or custom logic
        return null; // Assuming no profanity found by default
    }
}
