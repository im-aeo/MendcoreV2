<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Admin;
use App\Models\Item;
use App\Models\Avatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\IpLog;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\UploadedFile;
use App\Jobs\ItemRenderer;
use App\Models\Inventory;

class AdminController extends Controller
{
    public function AdminIndex()
    {
        if (!Auth::check() || !Auth::user()->isStaff()) {
            abort(403); // Immediately return a 404 for unauthorized users
        }
        $admin = Admin::where('user_id', Auth::id())->first();
        return inertia('Admin/Dashboard', [
            'stats' => [
                'adminPoints' => $admin->adminPoints,
                'canControlMaintenance' => $admin->can_activate_maintenance ?? false,
                'items' => Item::count(),
                'avatars' => Avatar::count(),
            ],
            'siteSettings' => [
                'inMaintenance' => site_setting("site_maintenance"),
                'maintenanceMessage' => $admin->maintenance_message ?? ''
            ],
        ]);
    }

    public function UserIndex()
    {
        // Define a cache key for this query result
        $cacheKey = 'users_index';
        $users = cache()->remember($cacheKey, now()->addMinutes(30), function () {
            return User::orderBy('id', 'asc')->paginate(10)->through(function ($user) {
                return [
                    'id' => $user->id,
                    'isBanned' => $user->hasActiveBan(),
                    'isStaff' => $user->isStaff(),
                    'username' => $user->username,
                    'display_name' => $user->display_name,
                    'email' => $user->email,
                    'status' => $user->status,
                    'DateHum' => $user->DateHum,
                    'headshot' => $user->headshot(),
                ];
            });
        });
        return inertia('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function ItemIndex()
    {
        // Define a cache key for this query result
        $cacheKey = 'users_index';
        $items = cache()->remember($cacheKey, now()->addMinutes(30), function () {
            return Item::where("creator_id", "=", config("Values.system_account_id"))->orderBy('id', 'asc')->paginate(10)->through(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'isOffsale' => $item->offsale ?? false,
                    'thumbnail' => $item->thumbnail(),
                ];
            });
        });
        return inertia('Admin/Items/Index', [
            'items' => $items
        ]);
    }
    public function CreateIndex()
    {
        return inertia('Admin/Items/Create');
    }

    public function uploadItem(Request $request)
    {
        $this->validateRequest($request);
        $itemHashName = bin2hex(random_bytes(22));
        $previewName = "{$itemHashName}_preview";

        $item = new Item;
        $item->name = $request->name;
        $item->description = $request->description;

        if (Auth::user()->isStaff() && $request->hasFile('modal') && $request->type === 'hat' || $request->type === 'addon' || $request->type === 'tool') {
            // Upload OBJ only if item type deals with models
            $this->uploadOBJ($request->file('modal'), $itemHashName);
            $this->uploadImage($request->file('image'), $itemHashName);
        } elseif ($request->type === 'face') {
            $this->uploadToThumbnails($request->file('image'), $itemHashName);
            $this->uploadImage($request->file('image'), $itemHashName);
        } else {
            $this->uploadImage($request->file('image'), $itemHashName);
        }
        
        $item->hash = $itemHashName;
        $item->creator_id = config('Values.system_account_id');
        $item->item_type = $request->type;
        $item->status = 'approved';
        $item->public_view = false;
        $item->cost_coins =  $request->price_coins;
        $item->cost_bucks =  $request->price_bucks;
        $item->avatar_preview = $previewName;
        $item->onsale = true;
        $item->save();

        $inventory = new Inventory;
        $inventory->user_id = Auth::id();
        $inventory->item_id = $item->id;
        $inventory->save(); 

        ItemRenderer::dispatch($item->id);

        $itemUrl = route('store.item', $item->id);

        return redirect()->to($itemUrl);
    }

    private function uploadToThumbnails(UploadedFile $file, string $name): string
    {
        $path = Storage::disk('public')->putFileAs('uploads', $file, "{$name}.png");

        return $path;
    }

    private function uploadImage(UploadedFile $file, string $name): string
    {
        $path = Storage::disk('public')->putFileAs('uploads', $file, "{$name}.png");

        return $path;
    }

    private function uploadOBJ(UploadedFile $file, string $name): string
    {
        $path = Storage::disk('public')->putFileAs('uploads', $file, "{$name}.obj");

        return $path;
    }
    private function validateRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:30',
            'description' => 'required|string|max:255',
            'type' => 'required|string|in:hat,addon,tool,face', // Allowed item types
            'image' => 'required|image|mimes:png', // Validate PNG image
            'modal' => 'file|mimes:obj', // Validate Object
        ]);
        if ($validator->fails()) { // Use Validator object's fails method on $validator
            return ValidationException::withMessages([$validator->errors()]);
        }
    }
    public function ManageUser(int $id)
    {
        // Define a cache key for this query result
        $cacheKey = 'users_manage';
        $user = cache()->remember($cacheKey, now()->addMinutes(30), function () use ($id) {
            //->load(['settings'])
            return User::where(['id' => $id])->first();
        });
        if (!$user) {
            abort(404);
        }
        $joindate = Carbon::parse($user->created_at)->format('M d Y');

        return inertia('Admin/Users/Manage', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'display_name' => $user->display_name,
                'lastIp' => $user->LastIp(),
                'email' => $user->email,
                'about_me' => $user->about_me,
                'headshot' => $user->headshot(),
                'bucks' => $user->bucks,
                'coins' => $user->coins,
                'joined' => $joindate,
            ]
        ]);
    }
    public function ManageItem(int $id)
    {
        // Define a cache key for this query result
        $cacheKey = 'users_manage';
        $item = cache()->remember($cacheKey, now()->addMinutes(30), function () use ($id) {
            return Item::where(['id' => $id])->first();
        });
        if (!$item) {
            abort(404);
        }

        return inertia('Admin/Items/Manage', [
            'item' => [
                'id' => $item->id,
                'item_type' => $item->item_type,
                'sold' => $item->owners(),
                'name' => $item->name,
                'description' => $item->description,
                'thumbnail' => $item->thumbnail(),
                'cost_bucks' => $item->cost_bucks,
                'cost_coins' => $item->cost_coins,
                'isRare' => $item->rare ?? false,
                'isOnsale' => $item->onsale ?? false,
                'initial_stock' => $item->initial_stock ?? 0,
                'remaining_stock' => $item->remaining_stock ?? 0,
            ]
        ]);
    }
}
