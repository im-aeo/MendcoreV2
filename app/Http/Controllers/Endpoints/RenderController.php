<?php

namespace App\Http\Controllers\Endpoints;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Avatar;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;

class RenderController extends Controller
{
    public function UserRender(Request $request, $id)
    {
        // Retrieve parameters for the request
        $user = Avatar::findOrFail($id);

        // Verify the encryption or any other required validations
        $avatar_thumbnail_name = bin2hex(random_bytes(22));
        $requestData = $this->prepareRequestData($user, $avatar_thumbnail_name);

        // Make HTTP request to the rendering server
        $this->makeRenderRequest($requestData);

        // Retrieve the rendered image path
        $imagePath = env('STORAGE_URL') . '/thumbnails/' . $avatar_thumbnail_name . '.png';

        // Read the rendered image file
        $imageData = file_get_contents($imagePath);

        // Update the user's image and save
        $user->image = $avatar_thumbnail_name;
        $user->save();

        // Return the rendered image as a response
        return $this->getRenderHash($user->id);
    }

    public function getRenderHash($id)
    {
        $user = Avatar::findOrFail($id);
        return env('STORAGE_URL') . '/thumbnails/' . $user->image . '.png';
    }

    private function prepareRequestData($user, $avatar_thumbnail_name)
    {
        return [
            'hash' => $avatar_thumbnail_name,
            'head_color' => $this->getColor($user->color_head, 'ffffff'),
            'torso_color' => $this->getColor($user->color_torso, '055e96'),
            'leftLeg_color' => $this->getColor($user->color_left_leg, 'ffffff'),
            'rightLeg_color' => $this->getColor($user->color_right_leg, 'ffffff'),
            'leftArm_color' => $this->getColor($user->color_left_arm, 'ffffff'),
            'rightArm_color' => $this->getColor($user->color_right_arm, 'ffffff'),
            'hat_1' => $user->hat1,
            'hat_2' => $user->hat2,
            'hat_3' => $user->hat3,
            'hat_4' => $user->hat4,
            'hat_5' => $user->hat5,
            'hat_6' => $user->hat6,
            'face' => $user->face,
            'tool' => $user->tool,
        ];
    }

    private function getColor($value, $default)
    {
        return isset($value) ? str_replace('#', '', $value) : $default;
    }

    private function makeRenderRequest($requestData)
    {
        if(env('RENDERER_HOST') && env('RENDERER_PORT')) {
            Http::get(env('RENDERER_HOST'), ':', env('RENDERER_PORT'), $requestData);
        } else {
            Http::get(env('RENDERER_HOST'), $requestData);
        }
    }
}
