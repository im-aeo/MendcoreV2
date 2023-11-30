<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Inventory;

class Item extends Model
{
    use HasFactory;
    protected $table = 'items';

    protected $fillable = [
        'creator_id',
        'creator_type',
        'name',
        'description',
        'hash',
        'item_type',
        'status',
        'public_view',
        'cost_coins',
        'cost_bucks',
        'sale_ongoing',
        'percent_off',
        'avatar_preview',
        'thumbnail_hash',
        'rare',
        'in_event',
        'event_id',
        'in_style',
        'style_of',
        'onsale',
        'initial_stock',
        'remaining_stock',
        'time_off_sale',
        'time_on_sale',
        'impression_count',
        'trade_lock',
        'limit_copies',
    ];

    protected $appends = ['DateHum', 'UpdateHum'];

    public function getDateHumAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function getUpdateHumAttribute()
    {
        return $this->updated_at->diffForHumans();
    }

    public function creator()
    {
        return $this->belongsTo('App\Models\User', 'creator_id');
    }
    public function onsale() {
        return $this->onsale ? true : false;
    }    

    public function owners()
    {
        return Inventory::where([
            ['item_id', '=', $this->id]
        ])->count();
    }
}
