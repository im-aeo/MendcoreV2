<?php

namespace App\Models;

use App\Models\SpaceRanks;
use App\Models\SpaceMembers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class Space extends Model
{
    use HasFactory, Searchable;

    protected $table = 'spaces';

    protected $fillable = [
        'owner_id',
        'name',
        'description',
        'alert_message',
        'thumbnail'
    ];

    public function toSearchableArray(): array
    {
        // All model attributes are made searchable
        $array = $this->toArray();

        // Then we add some additional fields
        $array['id'] = $this->getKey();
        $array['name'] = $this->name;
        $array['slug'] = $this->slug();
        $array['description'] = $this->description;
        $array['thumbnail'] = $this->thumbnail();
        $array['alert_message'] = $this->alert_message;
        $array['owner'] = $this->owner();

        return $array;
    }

    public function owner()
    {
        return $this->belongsTo('App\Models\User', 'owner_id');
    }

    public function thumbnail()
    {
        if ($this->thumbnail_pending)
            return asset('img/pending.png');
        else if ($this->thumbnail == 'denied')
            return asset('img/denied.png');

        $url = config('Values.storage.url');

        return "{$url}/{$this->thumbnail}.png";
    }

    public function slug()
    {
        $name = str_replace('-', ' ', $this->name);

        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    }

    public function members()
    {
        return SpaceMembers::where('group_id', '=', $this->id)->get();
    }

    public function ranks()
    {
        return SpaceRanks::where('group_id', '=', $this->id)->orderBy('rank', 'ASC')->get();
    }
}