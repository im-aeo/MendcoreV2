<?php

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LevelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $baseExperience = 0;
        $levels = [];

        // Loop through levels up to 200
        for ($level = 1; $level <= 200; $level++) {
            $experience = $baseExperience + (0.3 * ($level - 1));
            $baseExperience = $experience;

            $levels[] = [
                'level' => $level,
                'next_level_experience' => $experience,
            ];
        }

        // Insert all levels in a single batch for efficiency
        DB::table('levels')->insert($levels);
    }
}
