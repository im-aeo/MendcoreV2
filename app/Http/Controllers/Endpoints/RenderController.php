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
        
        // Update the user's image and save
        $user->image = $avatar_thumbnail_name;
        $user->save();

        // Return the rendered image as a response
        return $item->getAvatarRenderHash($user->id);
    }
    
    public function ItemRender(Request $request, $id)
    {
        // Retrieve parameters for the request
        $item = Item::findOrFail($id);

        // Verify the encryption or any other required validations
        $itemHashName = bin2hex(random_bytes(22));
        $requestData = $this->prepareRequestData('item', $item, $itemHashName);
        $itemPreview = "{$itemHashName}_preview";
        // Make HTTP request to the rendering server
        $this->makeRenderRequest($requestData);
        
        // Update the items image and save
        $item->hash = $itemHashName;
        $item->preview = $itemPreview;
        $item->save();

        // Return the rendered image as a response
        return $this->getItemThumb($user->id);
    }
    public function getAvatarRenderHash($type, $id)
    {
        $user = Avatar::findOrFail($id);
        return env('STORAGE_URL') . '/thumbnails/' . $user->image . '.png';
    }
    
    public function getItemThumb($type, $id)
    {
        $item = Item::findOrFail($id);
        return env('STORAGE_URL') . '/uploads/' . $item->hash . '.png';
    }
    
    private function prepareRequestData($type, $db, $hash)
    {
        return [
            'renderType' => $type,
            'hash' => $hash,
            'head_color' => $this->getColor($db->color_head, 'ffffff'),
            'torso_color' => $this->getColor($db->color_torso, '055e96'),
            'leftLeg_color' => $this->getColor($db->color_left_leg, 'ffffff'),
            'rightLeg_color' => $this->getColor($db->color_right_leg, 'ffffff'),
            'leftArm_color' => $this->getColor($db->color_left_arm, 'ffffff'),
            'rightArm_color' => $this->getColor($db->color_right_arm, 'ffffff'),
            if ($type == 'user') {
                'hat_1' => getItemHash($db->hat1),
                'hat_2' => getItemHash($db->hat2),
                'hat_3' => getItemHash($db->hat3),
                'hat_4' => getItemHash($db->hat4),
                'hat_5' => getItemHash($db->hat5),
                'hat_6' => getItemHash($db->hat6),
                'face' => getItemHash($db->face),
                'tool' => getItemHash($db->tool),
            } elseif($type == 'item') {
              if($db->type == 'hat') {
                'hat_1' => getItemHash($item->hat1),
              } elseif($db == 'face') {
                'face' => getItemHash($db->face),
              } else {
                'tool' => getItemHash($db->tool),
              }
            }
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
