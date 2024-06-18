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
use App\Jobs\UserRenderer;
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


    public function SpacesIndex(Request $request)
    {
        $search = $request->input('search', '');

        $spaces = Space::where([
            ['thumbnail_pending', '!=', false]
        ])->orderBy('created_at', 'desc')->paginate(12)->through(function ($space) {
            return [                'name' => $space->name,
                'id' => $space->id,
                'slug' => $space->slug(),
                'name' => $space->name,
                'creator' => $space->owner->display_name,
                'timecreated' => $space->created_at,
                'description' => $space->description,
                'DateHum' => $space->DateHum,
                'member_count' => $space->member_count,
                'thumbnail' => $space->thumbnail(),
            ];
        });


        return inertia('Spaces/Index', [
            'spaces' => $spaces,
            'search' => $search,
        ]);
    }
    
    public function SpacesView(Request $request, $id)
    {
        $space = Space::where('id', $id)->first();

        return inertia('Spaces/View', [
            'space' => $space,
        ]);
    }

    public function customizeIndex()
    {
        $colors = config('avatar_colors'); // Assuming you've defined the colors in a config file.
        $cacheKey = 'customization_categories';

        $categories = cache()->remember($cacheKey, now()->addHours(6), function () {
            return config('SimpleCategories');
        });

        /** @var \App\Models\User $user **/
        $user = Auth::user();

        return inertia('Customize/Index', [
            'avatar' => $user->avatar(),
            'avatar.current_face' => env('STORAGE_URL') . (
                $user->avatar()->face ? '/uploads/' . getItemHash($user->avatar()->face) . ".png" : '/assets/default.png'
            ),            
            'avatar.thumbnail' => $user->thumbnail(),
            'colors' => $colors,
            'categories' => $categories,
        ]);
    }

    public function regeneratewithID($id)
    {
        UserRenderer::dispatch($id);
    }

    public function regenerate()
    {
        UserRenderer::dispatch(Auth::user()->id);
    }

    public function UpdateAvatar(Request $request)
    {
        /** @var \App\Models\User $user **/
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
                $validTypes = ['hat_1', 'hat_2', 'hat_3', 'head', 'face', 'tool', 'addon', 'torso', 'left_arm', 'right_arm', 'left_leg', 'right_leg', 'tshirt', 'shirt', 'pants'];

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

                return $vrs->getAvatarRenderHash($avatar->id);


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
