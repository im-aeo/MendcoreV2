<?php

namespace App\Models;

use App\Models\Avatar;
use App\Models\Admin;
use App\Models\Level;
use App\Models\Status;
use App\Models\ForumThread;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use LevelUp\Experience\Concerns\GiveExperience;
use LevelUp\Experience\Concerns\HasAchievements;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AeoAuthenticatable;
use Laravel\Scout\Searchable;
use App\Models\IpLog;
use Illuminate\Support\Facades\Cache;

class User extends AeoAuthenticatable
{
    use HasApiTokens, HasFactory, GiveExperience, HasAchievements, Notifiable, Searchable;

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
        'status',
        'about_me',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'coins',
        'bucks',
        'about_me',
        'latest_status',
        'social_id',
        'social_type',
        'wallet_address',
        'email',
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

    /**
     * Meilisearch search array.
     *
     * @var array<string, string>
     */
    public function toSearchableArray(): array
    {
        // All model attributes are made searchable
        $array = $this->toArray();

        // Then we add some additional fields
        $array['id'] = $this->getKey();
        $array['username'] = $this->username;
        $array['display_name'] = $this->display_name;
        $array['headshot'] = $this->headshot();
        $array['thumbnail'] = $this->thumbnail();

        return $array;
    }

    // Classes
    public function avatar()
    {
        $cacheKey = "user_{$this->id}_avatar";
        return cache()->remember($cacheKey, now()->addMinutes(5), function () {
            return $this->hasOne(Avatar::class)->first();
        });
    }

    public function getNextLevelExp()
    {
        $currentLevel = min($this->getLevel() + 1, 100);
        $nextLevel = Level::where('level', $currentLevel)->first();
        return $nextLevel->next_level_experience;
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

    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id');
    }

    public function isFollowing(User $user)
    {
        return $this->following()->where('following_id', $user->id)->exists();
    }

    /**
     * Checks if the user has an active ban.
     *
     * @return bool True if an active ban is found, false otherwise.
     */
    public function hasActiveBan(): bool
    {
        // Leverage the relationship to efficiently check for active bans
        return $this->bans()->where('active', 1)->exists();
    }

    public function bans()
    {
        return $this->hasMany(UserBan::class, 'user_id', 'id');
    }

    public function isFollowedBy(User $userToCheck)
    {
        return $this->followers()->where('follower_id', $userToCheck->id)->exists();
    }

    public function posts()
    {
        return $this->hasMany(ForumThread::class, 'creator_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sending_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiving_id');
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
        return $this->hasMany(IpLog::class, 'user_id');
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
        return $this->hasOne(UserSettings::class);
    }

    public function isStaff()
    {
        return Admin::where([
            ['user_id', '=', $this->id],
        ])->exists();
    }

    public function CurrentPosition()
    {
        if ($this->isStaff()) {
            $admin = Admin::where([
                ['user_id', '=', $this->id],
            ])->first();

            $adminRole = AdminRoles::where([
                ['id', '=', $admin->role_id],
            ])->first();

            return $adminRole->name;
        } else {
            return null;
        }
    }

    public function thumbnail()
    {
        $url = env('STORAGE_URL');
        $image = ($this->avatar()?->image === 'default') ? env('DEFAULT_AVATAR_FILE') : $this->avatar()?->image;
        if ($this->avatar()?->image === 'default') {
            return "/{$image}.png";
        } else {
            return "{$url}/thumbnails/{$image}.png";
        }
    }

    public function headshot()
    {
        $url = env('STORAGE_URL');
        if ($this->settings->profile_picture_enabled != false) {
            $image = ($this->settings->profile_picture_url) || $this->avatar()?->image;
            return "{$url}/thumbnails/profile-pictures/{$image}.png";
        } else {
            $image = ($this->avatar()?->image === 'default') ? env('DEFAULT_AVATAR_FILE') : $this->avatar()?->image;
            if ($this->avatar()?->image === 'default') {
                return "/{$image}_headshot.png";
            } else {
                return "{$url}/thumbnails/{$image}_headshot.png";
            }
        }
    }

    public function latestStatus()
    {
        return $this->hasOne(Status::class, 'creator_id')->latest();
    }

    public function getStatusAttribute()
    {
        return $this->latestStatus?->message;
    }
}
