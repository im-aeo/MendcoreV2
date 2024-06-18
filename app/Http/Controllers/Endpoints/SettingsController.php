<?php

namespace App\Http\Controllers\Endpoints;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Country;
use App\Models\User;

use App\Models\UserBan;
use App\Models\UserSettings;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;

class SettingsController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function changeCountry($country)
    {        // Get the user
        $user = Auth::user();

        // Get the user's settings record (assuming a relationship exists)
        $settings = $user->settings;

        // Get the country code from the request
        $newCountryCode = strtoupper($country);

        // Check if country exists in the database
        $existingCountry = Country::where('code', $newCountryCode)->first();

        if ($existingCountry) {
            // Country exists, update settings
            $settings->country_code = $newCountryCode;
            $settings->save();

            // Success message
            return response()->json([
                "message" => "Country updated successfully.",
                "type" => "success",
            ], 200);
        } else {
            // Country does not exist
            return response()->json([
                "message" => "Invalid country code. Please select a valid country.",
                "type" => "error",
            ], 400); // Use 400 for Bad Request
        }
    }
    /**
     * Update the user's profile information.
     */
    public function update(Request $request, $user): RedirectResponse
    {
        switch ($request->category) {
            case 'general':
                return $this->updateGeneralSettings($request, $user);
            case 'account':
                return $this->updateAccountSettings($request, $user);
            case 'billing':
                return $this->updateBillingSettings($request, $user);
            default:
                abort(404);
        }
    }

    private function updateGeneralSettings($request, $user)
    {
        $this->validate($request, [
            'description' => ['max:1024'],
            'forum_signature' => ['max:100']
        ]);

        $user->description = $request->description;
        $user->forum_signature = $request->forum_signature;
        $user->save();

        $settings = $user->settings;
        $settings->theme = $request->has('theme') || 'light';
        $settings->save();

        return back()->with('message', 'Successfully updated general settings.');
    }

    private function updateAccountSettings($request, $user)
    {
        // Validate and update privacy settings
        $this->validate($request, [
            'private_profile' => ['boolean'],
            'followers_enabled' => ['boolean'],
            'trading_enabled' => ['boolean'],
            'posting_enabled' => ['boolean'],
            'chat_enabled' => ['boolean'],
            'notifications_enabled' => ['boolean'],
            'profile_picture_enabled' => ['boolean'],
        ]);

        $settings = $user->settings;

        $settings->private_profile = $request->has('private_profile');
        $settings->followers_enabled = $request->has('followers_enabled');
        $settings->trading_enabled = $request->has('trading_enabled');
        $settings->posting_enabled = $request->has('posting_enabled');
        $settings->chat_enabled = $request->has('chat_enabled');
        $settings->notifications_enabled = $request->has('notifications_enabled');
        $settings->profile_picture_enabled = $request->has('profile_picture_enabled');

        $settings->save();

        // Validate and update password if requested
        if ($request->has('new_password')) {
            $this->validate($request, [
                'current_password' => ['required'],
                'new_password' => ['required', 'confirmed', 'min:6', 'max:255']
            ]);

            if (!password_verify($request->current_password, $user->password))
                return back()->withErrors(['Incorrect current password.']);

            $user->password = bcrypt($request->new_password);
            $user->save();
        }

        return back()->with('message', 'Successfully updated account settings.');
    }

    /**
     * "Delete" the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        $ban = new UserBan;
        $ban->user_id = $user->id;
        $ban->banner_id = config("Values.system_account_id");
        $ban->type = "self-deletion";
        $ban->active = true;
        $ban->note = "You have requested deletion of your account. To restore in a timely manner, Please contact support.";
        $ban->length = Carbon::createFromTimestamp(time() + 31536000)->format('Y-m-d H:i:s');
        $ban->save();

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return back()->with('message', 'Account Deleted Successfully');
    }
}
