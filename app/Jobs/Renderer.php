<?php

namespace App\Jobs;

use App\Models\Item;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Http\Controllers\Endpoints\RenderController;
use DragonCode\Support\Tools\Replace;
use Illuminate\Http\Request;

class Renderer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $id;
    /**
     * Create a new job instance.
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     */
    public function handle(Request $request, $id): void
    {

        $newVrcInstance = new RenderController();
        $vrs = $newVrcInstance;
        $vrs->UserRender($request, $id);
    }
}
