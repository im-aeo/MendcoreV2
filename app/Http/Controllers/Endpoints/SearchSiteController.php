<?php

namespace App\Http\Controllers\Endpoints;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Space;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SearchSiteController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => config('scout.meilisearch.host'),
            'headers' => [
                'Authorization' => 'Bearer ' . config('scout.meilisearch.key'),
            ],
        ]);
    }

    public function all(Request $request)
    {
        $search = $request->input('search');

        if (Str::startsWith($search, '%')) {
            $search = '';
        }

        // Use Meilisearch Client for search
        $response = $this->client->get('/indexes/users/search', [
            'q' => $search,
        ]);

        $userResults = json_decode($response->getBody(), true)['hits'];

        $response = $this->client->get('/indexes/items/search', [
            'q' => $search,
        ]);

        $itemResults = json_decode($response->getBody(), true)['hits'];

        $response = $this->client->get('/indexes/spaces/search', [
            'q' => $search,
        ]);

        $spaceResults = json_decode($response->getBody(), true)['hits'];

        $results = array_merge($userResults, $itemResults, $spaceResults);

        if (empty($results) || !$search) {
            return response()->json([]);
        }

        $formattedResults = [];
        foreach ($results as $result) {
            $formattedResults[] = [
                'name' => $result['name'],
                'image' => $result['image'],
                'url' => route('user.profile', $result['name'] ?? null)
                    . (isset($result['id']) ? route('store.item', [$result['id'], $result['slug'] ?? null]) : '')
                    . (isset($result['id']) ? route('spaces.view', [$result['id'], $result['slug'] ?? null]) : ''),
            ];
        }

        return response()->json($formattedResults);
    }
}
