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

    public function replies($perPage = 4)
    {
    // Validate and check if the thread exists
    $thread = ForumThread::findOrFail($this->id);

    $query = ForumReply::with('creator')->where('thread_id', '=', $thread->id)->orderBy('created_at', 'ASC');

    // Filter based on user permissions
    if (!Auth::check() || !Auth::user()->isstaff()) {
        $query->where('is_deleted', false);
    }

    // Apply pagination using dedicated methods for clarity
    return $query->paginate($perPage);
    }

    public function lastReply()
    {
        return ForumReply::where('thread_id', '=', $this->id)->orderBy('created_at', 'DESC')->first();
    }

    public function slug(): string
    {
    $text = $this->title;

    // Convert to lowercase and replace spaces with a separator
    $text = strtolower(trim(preg_replace('/\s+/', '-', $text)));

    $allowedChars = 'a-z0-9-'; // Adjust this to include desired characters
    $text = preg_replace('/[^' . $allowedChars . ']/', '', $text);
    $text = preg_replace('/-{2,}/', '-', $text);

    // Handle trailing separators
    $text = trim($text, '-');

    return $text;
    }
}
