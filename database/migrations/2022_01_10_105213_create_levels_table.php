<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $baseExperience = 0; // Starting experience for level 1
        $levels = [];

        // Loop through levels up to 200
        for ($level = 1; $level <= 200; $level++) {
            $experience = $baseExperience + (0.3 * ($level - 1)); // Calculate required experience
            $baseExperience = $experience; // Update base for next level

            $levels[] = [
                'level' => $level,
                'next_level_experience' => $experience,
            ];
        }

        // Insert all levels in a single batch for efficiency
        Level::insert($levels);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('levels');
    }
};
