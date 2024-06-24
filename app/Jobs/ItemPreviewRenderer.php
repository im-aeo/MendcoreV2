<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Http\Controllers\Endpoints\RenderController;

class ItemPreviewRenderer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $itemID;
    public string $itemHashName;
    public bool $noNameOverride;

    /**
     * Create a new job instance.
     */
    public function __construct(int $itemID, bool $noNameOverride, string $itemHashName)
    {
        $this->itemID = $itemID;
        $this->noNameOverride = $noNameOverride;
        $this->itemHashName = $itemHashName;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $newVrcInstance = new RenderController();
        $vrs = $newVrcInstance;
        $vrs->ItemPreviewRender($this->itemID, $this->noNameOverride, $this->itemHashName);
    }
}