<?php

namespace App\Models;

use App\Models\ForumReply;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;

class ForumThread extends Model
{
    use HasFactory;

    protected $table = 'forum_threads';

    protected $fillable = [
        'topic_id',
        'creator_id',
        'title',
        'body'
    ];

    protected $appends = ['DateHum'];

    public function getDateHumAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function creator()
    {
        return $this->belongsTo('App\Models\User', 'creator_id');
    }

    public function topic()
    {
        return $this->belongsTo('App\Models\ForumTopic', 'topic_id');
    }

    public function replies()
    {
        // Validate and check if the thread exists
        $thread = ForumThread::findOrFail($this->id);
    
        // Check if the user is authenticated and has staff privileges
        if (Auth::check() && Auth::user()->isstaff()) {
            $query = ForumReply::where('thread_id', $thread->id)->orderBy('created_at', 'ASC');
        } else {
            // Regular user or guest, filter out deleted replies
            $query = ForumReply::where([
                ['thread_id', $thread->id],
                ['is_deleted', false]
            ])->orderBy('created_at', 'ASC');
        }
    
        // Apply pagination if required, default to 4 items per page
        $replies = $query->first();
    
        // Eager load creator relationship for each reply
        $replies->load('creator'); // Load creator relationship on the replies collection
    
        return $replies;
    }

    public function lastReply()
    {
        return ForumReply::where('thread_id', '=', $this->id)->orderBy('created_at', 'DESC')->first();
    }

    public function slug()
    {
        $title = str_replace('-', ' ', $this->title);

        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
    }
}
