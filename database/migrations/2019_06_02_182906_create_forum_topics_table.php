<?php
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $site = config('Values.name');

        Schema::create('forum_topics', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->unsignedBigInteger('section_id');
            $table->boolean('hidden')->default(false);
            $table->boolean('is_staff_only_viewing')->default(false);
            $table->boolean('is_staff_only_posting')->default(false);
            $table->timestamps();

            $table->foreign('section_id')->references('id')->on('forum_sections')->onDelete('cascade');
        });

        DB::table('forum_topics')->insert([
            [
                'name' => "{$site}",
                'description' => 'Important news such as new features, ideas to talk about, events and server events will be posted here.',
                'section_id' => 1,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => true,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
                        [
                'name' => "Updates",
                'description' => 'Important updates to the website will be posted here.',
                'section_id' => 1,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => true,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Admin Discussion',
                'description' => 'This is the place for admins to communicate with eachother.',
                'section_id' => 1,
                'hidden' => false,
                'is_staff_only_viewing' => true,
                'is_staff_only_posting' => true,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => "General",
                'description' => "Talk with other users on {$site} at one place",
                'section_id' => 2,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Off-Topic',
                'description' => 'If there\'s no other subforum that suits the content you want to post, post it here!',
                'section_id' => 2,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Marketplace',
                'description' => 'Are you interested in advertising or selling your items? This is the place for you!',
                'section_id' => 2,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Creative',
                'description' => "Do you have a creative work of art? Post it here.",
                'section_id' => 2,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Vent',
                'description' => 'This Topic is for venting only.',
                'section_id' => 3,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Support',
                'description' => 'Having issues or bugs? Post them here.',
                'section_id' => 3,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Reports',
                'description' => 'Any wrongdoers? Report them here.',
                'section_id' => 3,
                'hidden' => false,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ],
            [
                'name' => 'Hack Hub',
                'description' => 'if your here you know what you are here to do.',
                'section_id' => 3,
                'hidden' => true,
                'is_staff_only_viewing' => false,
                'is_staff_only_posting' => false,
                'created_at' => Carbon::now()->toDateTimeString(),
                'updated_at' => Carbon::now()->toDateTimeString()
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum_topics');
    }
}
