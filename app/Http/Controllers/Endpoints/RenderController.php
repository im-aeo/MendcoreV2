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
        return $this->getItemThumb($item->id);
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
        $requestData = [
            'renderType' => $type,
            'hash' => $hash,
        // ... other color properties
      ];
        if ($type == 'user') {
            $requestData['head_color'] = $this->getColor($db->color_head, 'ffffff');
            $requestData['torso_color'] = $this->getColor($db->color_torso, '055e96');
            $requestData['leftLeg_color'] = $this->getColor($db->color_left_leg, 'ffffff');
            $requestData['rightLeg_color'] = $this->getColor($db->color_right_leg, 'ffffff');
            $requestData['leftArm_color'] = $this->getColor($db->color_left_arm, 'ffffff');
            $requestData['rightArm_color'] = $this->getColor($db->color_right_arm, 'ffffff');
                
            for ($i = 1; $i <= 6; $i++) {
              $key = "hat_$i";
              $value = $db->{"hat$i"};
              $requestData[$key] = getItemHash($value);
            }
            
            $requestData['face'] = getItemHash($db->face);
            $requestData['tool'] =  getItemHash($db->tool);
        } elseif($type == 'item') {
            if($db->type == 'hat') {
                $requestData['hat_1'] = getItemHash($item->hat1);
              } elseif($db == 'face') {
                $requestData['face'] = getItemHash($db->face);
              } else {
                $requestData['tool'] = getItemHash($db->tool);
              }
        }
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
