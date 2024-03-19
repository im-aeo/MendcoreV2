<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Space;
use App\Models\Followers;
use App\Models\Status;
use App\Models\ForumReply;
use App\Models\ForumTopic;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use App\Models\DiffUsername;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Endpoints\RenderController;
use App\Http\Middleware\SiteSettingChecker;
use App\Models\Item;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Services\BBCodeService;
use JBBCode\Parser;
use JBBCode\DefaultCodeDefinitionSet;
use PhpParser\Node\Stmt\Return_;
use App\Models\Inventory;
use App\Models\ItemReseller;
use App\Models\ItemPurchase;
use Illuminate\Support\Facades\Cache;
use DB;
use Inertia\Inertia;

class GrabController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function WelcomeIndex()
    {
        // Define a cache key for this query result
        $cacheKey = 'landing_items';

        // Use caching to store the user count query result
        $landingItems = cache()->remember($cacheKey, now()->addHours(1), function () {
            return Item::inRandomOrder()->limit(5)->get();
        });

        return inertia('Welcome', [
            'LandingItems' => $landingItems,
        ]);
    }


    public function DashboardIndex()
    {
        //Auth::guard('web')->logout();

        //return redirect()->back();
        // Define a cache key for this query
        $cacheKey = 'dashboard_statuses';

        // Use caching to store the statuses query results
        $statuses = cache()->remember($cacheKey, now()->addMinutes(5), function () {
            return Status::where([
                ['message', '!=', null]
            ])->orderBy('created_at', 'desc')->paginate(12)->through(function ($status) {
                return [
                    'name' => $status->creator->username,
                    'dname' => $status->creator->display_name,
                    'timecreated' => $status->created_at,
                    'message' => $status->message,
                    'DateHum' => $status->DateHum,
                ];
            });
        });

        return inertia('Dashboard', [
            'slist' => $statuses,
        ]);
    }


    public function DashboardVal(Request $request)
    {
        $this->validate($request, [
            'message' => ['max:124']
        ]);

        if ($request->message != Auth::user()->latestStatus()) {
            // Logging
            $status = new Status;
            $status->creator_id = Auth::user()->id;
            $status->message = $request->message;
            $status->save();

            // Clear the cache for the latest status
            cache()->forget('latest_status_' . Auth::user()->id);

            $user = User::find(Auth::user()->id);
            $user->status = $request->message;
            $user->save();
        }

        return back()->with('message', 'Status has been changed.');
    }


    public function UserIndex()
    {
        // Define a cache key for this query result
        $cacheKey = 'users_index';

        // Use caching to store the user list query result
        $users = cache()->remember($cacheKey, now()->addMinutes(30), function () {
            return User::orderBy('updated_at', 'desc')->paginate(10)->through(function ($user) {
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'dname' => $user->display_name,
                    'staff' => $user->staff,
                    'status' => $user->status,
                    'DateHum' => $user->DateHum,
                    'avatar' => $user->headshot(),
                    'online' => $user->online(),
                ];
            });
        });

        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }


    public function ProfileIndex($username)
    {
        // Define a unique cache key for this user's profile
        $cacheKey = 'user_profile_' . $username;

        // Retrieve the user profile from the cache, if available
        $user = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($username) {
            // Retrieve the user by username
            return User::where('username', $username)->first();
        });

        // Check if the user exists
        if (!$user) {
            abort(404);
        }
        
        if ($user->settings->private_profile) {
           return inertia('App/ProfileDisabled', [
            'username' => $user->username,
           ]);
        }
        // Load relationships and counts
        $userFollowing = $user->following()->get();
        $FollowingCount = $userFollowing->count();
        
        $userFollowers = $user->followers()->get();
        $FollowerCount = $userFollowers->count();

        // Determine if the authenticated user is following the profile user
        $isFollowing = Auth::check() && Auth::user()->isFollowing($user);
        
        // Determine if the profile user is following the authenticated user
        $thisFollowing = Auth::check() && $user->isFollowing(Auth::user()) ?? false;

        // Format join date
        $joindate = Carbon::parse($user->created_at)->format('M d Y');
        
        $response = inertia('Users/Profile', [
            'user' => $user,
            'user.posts' => $user->posts_count,
            'user.avatar' => $user->thumbnail(),
            'user.settings' =>  $user->settings,
            'user.following' => $user->following()->get(),
            'user.followers' => $user->followers()->get(),
            'user.followsYou' => $isFollowing,
            'user.followers_count' => $FollowerCount,
            'user.following_count' => $FollowingCount,
            'joindate' => $joindate,
            'is_following' => $thisFollowing,
            'online' => $user->online(),
        ]);

        return $response;
    }

    public function SpacesIndex(Request $request)
    {
        $search = $request->input('search', '');

        $spaces = Space::where('locked', false)
            ->when($search, function ($query) use ($search) {
                return $query->where('name', 'LIKE', "%{$search}%");
            })
            ->paginate(12);

        return inertia('Spaces/Index', [
            'spaces' => compact('spaces'),
            'search' => compact('search')
        ]);
    }

    public function StoreIndex()
    {
        // Define a cache key for this data
        $cacheKey = 'store_index_data';

        // Use caching to store the data for StoreIndex
        $categories = cache()->remember($cacheKey, now()->addHours(6), function () {
            return config('ItemCategories');
        });

        return inertia('Store/Index', [
            'categories' => $categories,
        ]);
    }

    public function storeItem($id)
    {
        // Define cache keys
        $cacheKey = 'store_item_' . $id;
        $recommendationCacheKey = 'recommendation_' . $id;
    
        // Retrieve item data with caching
        $item = cache()->remember($cacheKey, now()->addHours(6), function () use ($id) {
            return Item::where('id', $id)->first();
        });
    
        if (!$item) {
            abort(404);
        }
    
        // Retrieve recommendations with caching
        $recommendations = cache()->remember($recommendationCacheKey, now()->addHours(6), function () use ($item) {
            return Item::where([
                ['id', '!=', $item->id],
                ['public_view', true],
                ['status', 'approved'],
                ['creator_id', $item->creator->id]
            ])->inRandomOrder()->take(6)->get();
        });
        
    
        return inertia('Store/Item', [
            'item' => $item,
            'creator' => $item->creator,
            'itemOwnership' => Auth::check() ? Auth::user()->ownsItem($item->id) : false,
            'item.owners' => $item->owners(),
            'recommendations' => $recommendations,
        ]);
    }
    

    public function purchase(int $id, string $currencyType, ?int $resellerId = null)
    {
    $item = Item::where('id', '=', $id)->firstOrFail();
    $item->timestamps = false;

    $listing = null;
    $isReseller = $resellerId !== null;

    if ($isReseller) {
        $listing = ItemReseller::where('id', '=', $resellerId)->first();
    }

    if (!Auth::user()->isStaff() && !$item->public_view) {
        abort(403);
    }

    if ($item->status != 'approved') {
        return back()->withErrors(['This item is not approved.']);
    }

    if (!$isReseller && $item->rare && $item->stock <= 0) {
        return back()->withErrors(['This item is out of stock.']);
    }

    if (!$isReseller && !$item->onsale()) {
        return back()->withErrors(['This item is not on sale.']);
    }

    if ($isReseller && Auth::user()->id == $listing->seller->id) {
        return back()->withErrors(['You cannot buy your own item.']);
    }

    if (!$isReseller && Auth::user()->ownsItem($item->id)) {
        return back()->withErrors(['You already own this item.']);
    }

    if ($isReseller && $currencyType != 'bucks') {
        return back()->withErrors(['You can only buy resold items for bucks.']);
    }

    switch ($currencyType) {
        case 'coins':
            $price = $item->cost_coins;
            $column = 'coins';

            if ($price == 0) {
                return back()->withErrors(['This item cannot be purchased with coins.']);
            }
            break;
        case 'bucks':
            $price = ($isReseller) ? $listing->price : $item->cost_bucks;
            $column = 'bucks';

            if ($price == 0) {
                return back()->withErrors(['This item cannot be purchased with bucks.']);
            }
            break;
        case 'free':
            $price = 0;
            $column = null;

            if ($item->cost_coins > 0 && $item->cost_bucks > 0) {
                return back()->withErrors(['This item cannot be purchased for free.']);
            }
            break;
        default:
            abort(404);
    }

    $seller = (!$isReseller) ? $item->creator : $listing->seller;

    if ($currencyType != 'free') {
        if (Auth::user()->$column < $price && $price > 0) {
            return back()->withErrors(["You do not have enough {$currencyType} to purchase this item."]);
        }

        $seller->timestamps = false;
        $seller->$column += round(($price / 1.3), 0, PHP_ROUND_HALF_UP);
        $seller->save();

        $myU = Auth::user();
        $myU->$column -= $price;
        $myU->save();
    }

    if ($isReseller) {
        $inventory = $listing->inventory;
        $inventory->user_id = Auth::user()->id;
        $inventory->save();

        $listing->delete();

        if (!$seller->ownsItem($item->id) && $seller->isWearingItem($item->id)) {
            $seller->takeOffItem($item->id);

            $this->regeneratewithID($resellerId, $seller->id);
        }
    } else {
        $inventory = new Inventory;
        $inventory->user_id = Auth::user()->id;
        $inventory->item_id = $item->id;
        $inventory->save();
    }

    $purchase = new ItemPurchase;
    $purchase->seller_id = $seller->id;
    $purchase->buyer_id = Auth::user()->id;
    $purchase->item_id = $item->id;
    $purchase->ip = Auth::user()->lastIP();
    $purchase->currency_used = $currencyType;
    $purchase->price = $price;
    $purchase->save();

    if ($item->special_type && $item->stock > 0) {
        $item->stock -= 1;
        $item->save();
    }

    return back()->with('success_message', 'You now own this item!');
}


    public function resell(Request $request)
    {
        $copy = Inventory::where([
            ['id', '=', $request->id],
            ['user_id', '=', Auth::user()->id]
        ])->firstOrFail();
        $isReselling = ItemReseller::where('inventory_id', '=', $copy->id)->exists();

        if (!$copy->item->limited || ($copy->item->limited && $copy->item->stock > 0) | $isReselling) abort(404);

        $this->validate($request, [
            'price' => ['required', 'numeric', 'min:1', 'max:1000000']
        ]);

        $reseller = new ItemReseller;
        $reseller->seller_id = Auth::user()->id;
        $reseller->item_id = $copy->item->id;
        $reseller->inventory_id = $copy->id;
        $reseller->price = $request->price;
        $reseller->save();

        return redirect()->route('catalog.item', [$copy->item->id, $copy->item->slug()])->with('success_message', 'Item has been put up for sale.');
    }

    public function makeOffsale(Request $request)
    {
        $copy = ItemReseller::where([
            ['id', '=', $request->id],
            ['seller_id', '=', Auth::user()->id]
        ])->firstOrFail();

        $id = $copy->item_id;
        $slug = Item::where('id', '=', $id)->first()->slug();

        $copy->delete();

        return redirect()->route('catalog.item', [$id, $slug])->with('success_message', 'Item has been taken off sale.');
    }


    public function customizeIndex()
    {
        $colors = config('avatar_colors'); // Assuming you've defined the colors in a config file.

        return inertia('Customize/Index', [
            'avatar' => Auth::user()->avatar(),
            'avatar.thumbnail' => Auth::user()->thumbnail(),
            'colors' => $colors,
        ]);
    }

    public function regeneratewithID($request, $id)
    {
        $newVrcInstance = new RenderController();
        $vrs = $newVrcInstance;
        $vrs->UserRender($request, $id);
    }

    public function regenerate($request)
    {
        $newVrcInstance = new RenderController();
        $vrs = $newVrcInstance;
        $vrs->UserRender($request, Auth::user()->id);
    }
    public function UpdateAvatar(Request $request)
    {
        $avatar = Auth::user()->avatar();

        $newVrcInstance = new RenderController();
        $vrs = $newVrcInstance;

        switch ($request->action) {
            case 'reset':
                $avatar->reset();
                return $this->regenerate($request);
            case 'wear':
                $item = Item::find($request->id);

                if (!$item) {
                    return response()->json(['error' => 'Invalid item.']);
                }

                $item = $item->first();
                $column = ($item->type == 'hat') ? 'hat_1' : $item->type;

                if (!Auth::user()->ownsItem($item->id)) {
                    return response()->json(['error' => 'You do not own this item.']);
                }

                if ($item->status !== 'approved') {
                    return response()->json(['error' => 'This item is not approved.']);
                }

                if ($item->type === 'hat') {
                    if (!$avatar->hat_1) {
                        $column = 'hat_1';
                    } elseif (!$avatar->hat_2) {
                        $column = 'hat_2';
                    } elseif (!$avatar->hat_3) {
                        $column = 'hat_3';
                    }
                }

                $avatar->$column = $item->id;
                $avatar->save();

                $this->regenerate($request);

                return $vrs->getRenderHash($avatar->id);

            case 'remove':
                $validTypes = ['hat_1', 'hat_2', 'hat_3', 'head', 'face', 'gadget', 'tshirt', 'shirt', 'pants'];

                if (!in_array($request->type, $validTypes)) {
                    return response()->json(['error' => 'Invalid type.']);
                }

                $avatar->{$request->type} = null;
                $avatar->save();

                $this->regenerate($request);

                return $vrs->getRenderHash($avatar->id);
            case 'color':
                $colors = config('avatar_colors'); // Fetch colors from the configuration file

                $validBodyParts = ['head', 'torso', 'left_arm', 'right_arm', 'left_leg', 'right_leg'];

                if (!in_array($request->body_part, $validBodyParts)) {
                    return response()->json(['error' => 'Invalid body part.']);
                }


                // Check if the requested color exists in the $colors array
                if (!in_array($request->color, $colors)) {
                    return response()->json(['error' => 'Invalid color.']);
                }

                // Check if the avatar's current color for the specified body part matches the requested color
                if ($avatar->{"color_{$request->body_part}"} == $request->color) {
                    $this->regenerate($request);
                    return $vrs->getRenderHash($avatar->id);
                }

                // Update the avatar's color for the specified body part
                $avatar->{"color_{$request->body_part}"} = $request->color;
                $avatar->save();

                $this->regenerate($request);

                return $vrs->getRenderHash($avatar->id);


            default:
                return response()->json(['error' => 'Invalid action.']);
        }
    }

    public function ForumIndex($id)
    {
        // Define the sections
        $sectionFilters = [
            1 => ['section_id' => 1],
            2 => ['section_id' => 2],
            3 => ['section_id' => 3],
        ];

        // Apply staff-only view filters if the user is a staff member
        $isStaff = Auth::check() && Auth::user()->isStaff() == 1;
        if ($isStaff) {
            $sectionFilters[1]['is_staff_only_viewing'] = false;
            $sectionFilters[2]['hidden'] = false;
            $sectionFilters[3]['is_staff_only_viewing'] = false;
        }

        // Use caching to store the forum topics for each section
        $sectionOneTopics = cache()->remember('section_one_topics', now()->addMinutes(30), function () use ($sectionFilters) {
            return ForumTopic::where($sectionFilters[1])->orderBy('id', 'asc')->get();
        });

        $sectionTwoTopics = cache()->remember('section_two_topics', now()->addMinutes(30), function () use ($sectionFilters) {
            return ForumTopic::where($sectionFilters[2])->orderBy('id', 'asc')->get();
        });

        $sectionThreeTopics = cache()->remember('section_three_topics', now()->addMinutes(30), function () use ($sectionFilters) {
            return ForumTopic::where($sectionFilters[3])->orderBy('id', 'asc')->get();
        });

        // Fetch the selected forum topic
        $topic = ForumTopic::where('id', '=', $id)->firstOrFail();

        // Check permissions and abort if necessary
        if (!$isStaff && $topic->is_staff_only_viewing) {
            abort(403);
        }

        // Use caching to store the posts related to the selected topic
        $posts = cache()->remember('topic_' . $id . '_posts', now()->addMinutes(15), function () use ($topic) {
            return $topic->threads()->through(function ($post) {
                return [
                    'id' => $post->id,
                    'topic_id' => $post->id,
                    'seo' => $post->slug(),
                    'name' => $post->title,
                    'username' => $post->creator->username,
                    'display_name' => $post->creator->display_name,
                    'message' => $post->body,
                    'pinned' => $post->is_pinned,
                    'locked' => $post->is_locked,
                    'deleted' => $post->is_deleted,
                    'DateHum' => $post->DateHum,
                ];
            });
        });

        return inertia('Forum/Index', [
            'topic' => $topic,
            'posts' => $posts,
            'section_one' => $sectionOneTopics,
            'section_two' => $sectionTwoTopics,
            'section_three' => $sectionThreeTopics
        ]);
    }

    public function ForumPost($id, $slug, BBCodeService $bbcodeService)
    {
        // Define a cache key for this forum post
        $cacheKey = 'forum_post_' . $id;

        // Attempt to retrieve the forum post from cache
        $post = cache()->remember($cacheKey, now()->addMinutes(30), function () use ($id) {
            return ForumThread::findOrFail($id);
        });

        // Fetch the associated topic
        $topic = ForumTopic::findOrFail($post->in_topic_id);

        // Fetch replies based on staff status
        $replies = $post->replies();

        // Parse the post body using BBCodeService
        $post->body = $bbcodeService->parse($post->body);

        // Check conditions for displaying the post
        if ($slug != $post->slug() || $topic->is_staff_only_viewing || $post->is_deleted) {
            abort(404);
        }

        return inertia('Forum/Post', [
            'topic' => $topic,
            'post' => $post,
            'post.creator' => $post->creator,
            'replies' => $replies,
            'replies.creator' => $replies->creator,
        ]);
    }


    public function ForumCreate($id)
    {
        // Define a cache key for this forum create page
        $cacheKey = 'forum_create_' . $id;

        // Use caching to store the forum create page data
        $topic = cache()->remember($cacheKey, now()->addMinutes(60), function () use ($id) {
            return ForumTopic::where('id', $id)->firstOrFail();
        });

        if (!Auth::check() || (!Auth::user()->isStaff() && $topic->is_staff_only_posting)) {
            abort(403);
        }

        return inertia('Forum/Create', [
            'topic' => $topic,
        ]);
    }

    public function ForumVal($id, Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'max:100'],
            'body' => ['required', 'min:3', 'max:7500']
        ]);

        $title = $validatedData['title'];
        $body = $validatedData['body'];

        // Apply BBCode parsing
        $parser = new Parser();
        $parser->addCodeDefinitionSet(new DefaultCodeDefinitionSet());
        $parsedBody = $parser->parse($body)->getAsHTML();


        $post = new ForumThread;
        $post->in_topic_id = $id;
        $post->creator_id = Auth::user()->id;
        $post->title = $title;
        $post->body = $parsedBody;
        $post->save();
        
        Auth::user()->addPoints(10);
        
        return Redirect::route('forum.post', $post->id, $post->slug())->with('message', 'Your post has been created.');
    }

    public function ForumReply($id, Request $request)
    {
        $validatedData = $request->validate([
            'body' => ['required', 'min:3', 'max:7500']
        ]);

        $body = $validatedData['body'];

        // Apply BBCode parsing
        $parser = new Parser();
        $parser->addCodeDefinitionSet(new DefaultCodeDefinitionSet());
        $parsedBody = $parser->parse($body)->getAsHTML();


        $post = new ForumReply;
        $post->thread_id = $id;
        $post->creator_id = Auth::user()->id;
        $post->body = $parsedBody;
        $post->save();
        Auth::user()->addPoints(10);
        
        return redirect()->back()->with('message', 'Your post has been created.');
    }
    public function IndexingIndex()
    {
        //
    }
}
