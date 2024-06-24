<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class Admin extends Model
{
    use HasFactory;

    protected $table = 'admins'; // Specify the actual table name
    protected $fillable = ['adminPoints', 'role_id']; // Allow mass assignment of points

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function rolePermissions($key)
    {
        $roles = Cache::remember('admin_role_' . Auth::id(), now()->addMinutes(30), function () {
            return AdminRoles::where('id',  $this->role_id); // Change to use the find() method instead of where() + first()
        });

        if (!$roles) {
            return null; // or return a default value or throw an exception
        }

        // Use optional chaining to access the property safely
        return optional($roles)->$key;
    }
}
