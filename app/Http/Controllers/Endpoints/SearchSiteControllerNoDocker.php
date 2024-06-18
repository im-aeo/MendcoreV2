<?php
namespace App\Http\Controllers\Endpoints;

use App\Models\Item;
use App\Models\User;
use App\Models\Space;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchSiteController extends Controller
{
    public function all(Request $request)
    {
        $search = $request->input('search');

        if (Str::startsWith($search, '%')) {
            $search = '';
        }

        $users = User::where('username', 'LIKE', "%{$search}%")->get();
        $items = Item::where('name', 'LIKE', "%{$search}%")->get();
        $spaces = Space::where('name', 'LIKE', "%{$search}%")->get();

        $results = $users->merge($items)->merge($spaces);

        if ($results->count() === 0 || !$search) {
            return response()->json([]);
        }

        $json['results'] = [];

        foreach ($results as $result) {
            switch ($result->getTable()) {
                case 'users':
                    $name = $result->username;
                    $image = $result->headshot();
                    $url = route('user.profile', $result->username);
                    break;

                case 'items':
                    $name = $result->name;
                    $image = $result->thumbnail();
                    $url = route('catalog.item', [$result->id, $result->slug()]);
                    break;
                    
                case 'spaces':
                    $name = $result->name;
                    $image = $result->thumbnail();
                    $url = route('spaces.view', [$result->id, $result->slug()]);
                    break;
                   
                default:
                    continue 2;
            }

            $json['results'][] = [
                'name' => $name,
                'image' => $image,
                'url' => $url
            ];
        }

        return response()->json($json);
    }
}
