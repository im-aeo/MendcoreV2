<?php

namespace App\Models;

use App\Models\Status;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AeoAuthenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Avatar;
use App\Models\Admin;
use App\Models\Level;
use App\Models\ForumThread;
use Illuminate\Support\Facades\Auth;

class User extends AeoAuthenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'display_name',
        'email',
        'password',
        'birthdate',
        'social_id',
        'social_type',
        'wallet_address',
        'status',
        'about_me',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['DateHum'];

    // Classes
    public function avatar()
    {
        return Avatar::where('user_id', '=', $this->id)->first();
    }
    public function getDateHumAttribute()
    {
        return $this->updated_at->diffForHumans();
    }

    // Define the followers relationship
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id');
    }

    public function posts()
    {
        return $this->hasMany(ForumThread::class, 'creator_id');
    }

    public function sentMessages()
    {
        return $this->hasMany(UserMessages::class, 'sending_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(UserMessages::class, 'receiving_id');
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id');
    }

    public function ownsItem($id)
    {
        return Inventory::where([
            ['user_id', '=', $this->id],
            ['item_id', '=', $id]
        ])->exists();
    }

    public function ipLogs()
    {
        return $this->hasMany(IpLog::class);
    }

    public function lastIP()
    {
        // Assuming IpLog model has a 'ip' column
        $lastLog = $this->ipLogs()->latest()->first();

        return $lastLog ? $lastLog->ip : null;
    }

    public function resellableCopiesOfItem($id)
    {
        $i = 1;
        $resellableCopies = [];
        $copies = Inventory::where([
            ['user_id', '=', $this->id],
            ['item_id', '=', $id]
        ])->get();

        foreach ($copies as $copy) {
            $isReselling = ItemReseller::where('inventory_id', '=', $copy->id)->exists();

            if (!$isReselling) {
                $copy->number = $i;
                $resellableCopies[] = $copy;
                $i++;
            }
        }

        return $resellableCopies;
    }

    public function spaces()
    {
        return $this->hasMany(SpaceMember::class, 'user_id')->get()->pluck('space')->unique('id');
    }

    public function primarySpace()
    {
        return $this->belongsTo(Space::class, $this->settings->primary_space) || null;
    }

    public function navSpaces()
    {
        if ($this->primarySpace()) {
            return $this->spaces()
                ->where('id', '!=', $this->settings->primary_space)
                ->sortByDesc('updated_at')
                ->add($this->primarySpace)
                ->take(5);
        }

        return $this->spaces()
            ->where('id', '!=', $this->primary_space_id)
            ->sortByDesc('updated_at')
            ->take(5);
    }



    public function canEditItem($id)
    {
        $item = Item::where('id', '=', $id)->first();

        return ($item->creator_type == 'user' && $this->id == $item->creator->id) || ($item->creator_type == 'group' && $this->id == $item->creator->owner_id);
    }


    public function online()
    {
        // Calculate the expiration time for online status
        $expirationTime = strtotime($this->updated_at) + 300;

        // Check if the expiration time is greater than the current time
        return $expirationTime > time();
    }

    public function settings()
    {
        return $this->belongsTo(UserSettings::class, 'id');
    }

    public function isStaff()
    {
        return Admin::where([
            ['user_id', '=', $this->id],
        ])->exists();
    }

    public function currentLevel()
    {
        return $this->belongsTo(Level::class, 'current_level_id');
    }

    public function levelUp()
    {
        // Logic to check if user's experience crosses the next level threshold
        $nextLevel = Level::where('experience_required', '>', $this->experience)->orderBy('experience_required')->first();
        // If it does, update user's level and perform additional actions
        if ($nextLevel) {
            $this->current_level_id = $nextLevel->id;
            // Additional actions: reward items, currency, etc.
            $this->save();
        }
    }

    public function gainExperience(int $experience)
    {
        $curentLevel = $this->settings->current_level;

        if ($experience < 0) {
            return "Negative Experience Is Not Accepted";
        }

        if ($curentLevel > 0 && !isset($this->levels[$curentLevel])) {
            return "You've reached the max level";
        }

        $resultOfCalculation = $this->calculate($experience + $this->settings->experience, $curentLevel);

        $this->updateAttributes($resultOfCalculation['level'], $resultOfCalculation['experience_remainder']);

        if ($curentLevel !== $resultOfCalculation['level']) {
            $this->settings->current_level + 1;
        }
    }

    public function thumbnail()
    {
        $url = config('Values.storage.url');
        $image = ($this->avatar()?->image === 'default') ? config('Values.render.default_avatar') : $this->avatar()?->image;
        return "{$url}/thumbnails/{$image}.png";
    }
    public function headshot()
    {
        $url = config('Values.storage.url');
        if ($this->settings->profile_picture_enabled != false) {
            $image = ($this->settings->profile_picture_url) || $this->avatar()?->image;
            return "{$url}/thumbnails/pfp/{$image}.png";
        } else {
            $image = ($this->avatar()?->image === 'default') ? config('Values.render.default_avatar') : $this->avatar()?->image;
            return "{$url}/thumbnails/{$image}_headshot.png";
        }
    }
    
    public function latestStatus()
    {
        return $this->hasOne(Status::class, 'creator_id')->latest();
    }
    public function isFollowing(User $userToCheck)
    {
        return $this->following()->where('following_id', $userToCheck->id)->exists();
    }

    public function isFollowedBy(User $userToCheck)
    {
        return $this->followers()->where('follower_id', $userToCheck->id)->exists();
    }

    public function getStatusAttribute()
    {
        return $this->latestStatus?->message;
    }
}
