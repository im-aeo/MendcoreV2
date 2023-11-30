<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('bucks');
            $table->integer('granted_amount')->default('1');
            $table->integer('item_id');
            $table->unsignedBigInteger('level_required');
            $table->boolean('membership_required')->default(false);
            // You can add more columns for additional reward attributes

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
};
