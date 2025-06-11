<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(): Response
    {
        $user = auth()->user();
        $user = User::findOrFail($user->id);

        return Inertia::render('Profile/Index', [
            'user' => $user,
            'pivots' => $user->groupRoleByBU(),
            'bus' => buSelectOption(),
            'roles' => roleSelectOptions(),
        ]);
    }
     /**
     * Update the user's profile information.
     */
    public function update(UpdateProfileRequest $request, User $user): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $user->fill($validated);
            $user->save();

            DB::commit();

            return Redirect::route('dashboard')->with('toast-success', 'Profile Updated!');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }
}
