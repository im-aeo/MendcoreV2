<?php
namespace App\Support\ResponseCache;

use Illuminate\Http\Request;
use \Spatie\ResponseCache\Hasher\DefaultHasher;

class InertiaResponseCacheHasher extends DefaultHasher
{
    public function getHashFor(Request $request): string
    {
        $baseHash = parent::getHashFor($request);

        $contentType = $request->getContentTypeFormat();

        return "{$baseHash}-{$contentType}";
    }
}
