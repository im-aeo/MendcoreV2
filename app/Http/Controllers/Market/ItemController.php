<?php

namespace App\Http\Controllers\Item;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules;

class ItemController extends Controller
{
    public function upload(Request $request)
    {
        $this->validateRequest($request);


        $item = new Item;
        $item->name = $request->name;
        $item->type = $request->type;

        $imagePath = $this->uploadImage($request->file('image'));
        $item->image = $imagePath;

        if ($request->hasFile('obj') && $request->type === 'hat') {
            // Upload OBJ only if item type is hat
            $objPath = $this->uploadOBJ($request->file('obj'));
            $item->obj = $objPath;
        }

        $item->save();

        return inertia('Store/Create', [ 
            'flash' => [
                'message' => 'Item created successfully!',
                'type' => 'success' // Optional: specify message type for styling
            ],
        ], 201);
    }

    private function uploadImage(Request $file)
    {
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        $path = Storage::disk('public')->put('items/images', $file, $fileName);

        return $path;
    }

    private function uploadOBJ(Request $file)
    {
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        $path = Storage::disk('public')->put('items/models', $file, $fileName);

        return $path;
    }
    private function validateRequest(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:shirt,hat', // Allowed item types
            'image' => 'required|image|mimes:png', // Validate PNG image
            'obj' => 'nullable|file|mimes:obj' // Optional OBJ file validation
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors());
        }
    }
}
