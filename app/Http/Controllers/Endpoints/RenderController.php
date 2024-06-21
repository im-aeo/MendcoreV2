<?php

namespace App\Http\Controllers\Endpoints;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Avatar;
use App\Models\Item;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;

class RenderController extends Controller
{
    public function UserRender($id)
    {
        // Retrieve parameters for the request
        $user = Avatar::findOrFail($id);

        // Verify the encryption or any other required validations
        $avatar_thumbnail_name = bin2hex(random_bytes(22));
        $requestData = $this->prepareRequestData('user', $user, $avatar_thumbnail_name);

        // Make HTTP request to the rendering server
        $this->makeRenderRequest($requestData);

        // Update the user's image and save
        $user->image = $avatar_thumbnail_name;
        $user->save();

        // Return the rendered image as a response
        return $this->getAvatarRenderHash($user->id);
    }

    public function ItemRender($id)
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
        $item->avatar_preview = $itemPreview;
        $item->save();

        // Return the rendered image as a response
        return $this->getItemThumb($item->id);
    }

    public function ItemPreviewRender($id, $noNameOverride = false, $itemName = null)
    {
        // Retrieve parameters for the request
        $item = Item::findOrFail($id);

        // Verify the encryption or any other required validations
        $itemHashName = bin2hex(random_bytes(22));
        if ($noNameOverride) {
            $requestData = $this->prepareRequestData('item_preview', $item, $itemName);
        } else {
            $requestData = $this->prepareRequestData('item_preview', $item, $itemHashName);
        }
        $itemPreview = "{$itemHashName}_preview";
        // Make HTTP request to the rendering server
        $this->makeRenderRequest($requestData);

        // Update the items image and save
        if ($noNameOverride) {
            $item->hash = $itemName;
        } else {
            $item->hash = $itemHashName;
        }
        $item->avatar_preview = $itemPreview;
        $item->save();

        // Return the rendered image as a response
        return $this->getItemThumb($item->id, true);
    }

    public function getAvatarRenderHash($id)
    {
        $user = Avatar::findOrFail($id);
        return env('STORAGE_URL') . '/thumbnails/' . $user->image . '.png';
    }

    public function getItemThumb($id, bool $isPreview = false)
    {
        $item = Item::findOrFail($id);
        if ($isPreview) {
            return env('STORAGE_URL') . '/uploads/' . $item->hash . '_preview.png';
        } else {
            return env('STORAGE_URL') . '/uploads/' . $item->hash . '.png';
        }
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
                $value = $db->{"hat_$i"};
                if ($value) {
                    $requestData[$key] = getItemHash($value);
                }
            }
            if ($db->addon) {
                $requestData['addon'] =  getItemHash($db->addon);
            };
            if ($db->head) {
                $requestData['head'] =  getItemHash($db->head);
            };
            if ($db->face) {
                $requestData['face'] = getItemHash($db->face);
            } else {
                $requestData['face'] = 'none';
            };
            if ($db->tool) {
                $requestData['tool'] =  getItemHash($db->tool);
            };
            if ($db->tshirt) {
                $requestData['tshirt'] =  getItemHash($db->tshirt);
            };
            if ($db->shirt) {
                $requestData['shirt'] =  getItemHash($db->shirt);
            };
            if ($db->pants) {
                $requestData['pants'] =  getItemHash($db->pants);
            };
        } elseif ($type == 'item') {
            if ($db->type == 'hat' || $db->type == 'addon') {
                $requestData['item'] = getItemHash($db->id);
            } else {
                $requestData['tool'] = getItemHash($db->id);
            }
        } elseif ($type == 'item_preview') {
            if ($db->item_type == 'hat') {
                $requestData['item'] = getItemHash($db->id);
            } elseif ($db->item_type == 'addon') {
                $requestData['item'] = getItemHash($db->id);
            } elseif ($db == 'face') {
                $requestData['item'] = getItemHash($db->id);
                $requestData['isFace'] = true;
            } elseif ($db->item_type == 'tshirt') {
                $requestData['item'] = getItemHash($db->id);
                $requestData['isTshirt'] = true;
                $requestData['pathmod'] = false;
            } elseif ($db->item_type == 'tool') {
                $requestData['item'] = getItemHash($db->id);
                $requestData['isTool'] = true;
            } elseif ($db->item_type == 'shirt') {
                $requestData['item'] = getItemHash($db->id);
                $requestData['isShirt'] = true;
                $requestData['pathmod'] = false;
            } elseif ($db->item_type == 'pants') {
                $requestData['item'] = getItemHash($db->id);
                $requestData['isPants'] = true;
                $requestData['pathmod'] = false;
            } else {
                $requestData['item'] = getItemHash($db->id);
            }
        } elseif ($type == 'preview_tool') {
            if ($db->type == 'hat') {
                $requestData['hat_1'] = getItemHash($db->hat1);
            } else {
                $requestData['tool'] = getItemHash($db->tool);
            }
        }

        return $requestData;
    }

    private function getColor($value, $default)
    {
        return isset($value) ? str_replace('#', '', $value) : $default;
    }

    private function makeRenderRequest($requestData)
    {
        $host = env('RENDERER_HOST');
        $port = env('RENDERER_PORT');

        if ($port) {
            $url = $host . ":" . $port;
        } else {
            $url =  $host;
        }

        return Http::get($url, $requestData);
    }
}
