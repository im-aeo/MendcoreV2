<?php

namespace App\Http\Controllers;

use App\Events\ChatSent;
use App\Events\SendMessageEvent;
use App\Http\Requests\SendMessageRequest;
use App\Models\UserMessages;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ChatsController extends Controller
{
    //Add the below functions
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return inertia('Inbox/Chats');
    }

    public function fetchMessages()
    {
        return UserMessages::with('user')->get();
    }

    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);
        return [
            'type' => 'success',
            'message' => 'Message Sent!',
        ];
    }
}
