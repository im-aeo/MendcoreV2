<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use LevelUp\Experience\Concerns\HasAchievements;
use App\Models\Achievements;

class AchievementController extends Controller
{
    use HasAchievements;

    public function AchievementList()
    {
        // Define a cache key for this query
        $cacheKey = 'achievements_cache';

        // Use caching to store the statuses query results
        $achievements = cache()->remember($cacheKey, now()->addMinutes(5), function () {
            return Achievements::all();

        });

        return inertia('Acheivements/Index', [
            'achievements' => $achievements,
        ]);
    }

}