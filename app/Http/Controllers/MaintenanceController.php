<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class MaintenanceController extends Controller
{
    public function show()
    {
        if (Session::has('maintenance_password')) {
            return redirect()->route('Welcome')->with(['success' => 'Already authenticated.']);
        }

        return inertia('Maintenance/Index');
    }

    public function authenticate(Request $request)
    {
        $maintenancePasswords = config('Values.maintenance_passwords');

        if (Session::has('maintenance_password')) {
            return response()->json(['error' => 'Already authenticated.']);
        }

        $password = $request->input('password');

        if (empty($password)) {
            return response()->json(['error' => 'Please provide a password.']);
        }

        if (!in_array($password, $maintenancePasswords)) {
            return response()->json(['error' => 'Invalid password.']);
        }

        Session::put('maintenance_password', $password);

        return redirect()->route('Welcome')->with('success', 'Authenticated successfully.');
    }
    public function Exit()
    {
        session()->forget('maintenance_password');

        return redirect()->route('maintenance.page');
    }
}
