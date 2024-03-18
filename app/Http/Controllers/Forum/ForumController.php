<?php

namespace App\Http\Controllers\Forum;

use Inertia\Inertia;
use App\Models\User;
use App\Models\ForumReply;
use App\Models\ForumTopic;
use App\Models\ForumThread;
use App\Http\Controllers\Controller;

class ForumController extends Controller
{
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
}
