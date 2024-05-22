<?php

namespace App\Http\Controllers\Item;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules;
use LevelUp\Experience\Services\LeaderboardService;

class LeaderboardController extends Controller
{
    public function LeaderboardIndex(Request $request)
    {

        $leaderboardService = new LeaderboardService();
        $leaderboard = $leaderboardService->generate();

        return inertia('Leaderboard/Index', [ 
            'list_xp' => $leaderboard,
            'list_currency' => null, // soon
        ]);
    }
}
