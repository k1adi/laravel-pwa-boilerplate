<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserListResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('user_access');

        $data = User::advancedFilter()->paginate(25);
        $lists = UserListResource::collection($data);

        return Inertia::render('User/Index', [
            'users' => $lists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('user_create');

        return Inertia::render('User/Create', [
            'bus' => buSelectOption(),
            'roles' => roleSelectOptions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $user = User::create($validated);

            // Handle bu roles sync
            $user->syncBuRoles($validated['pivots']);

            DB::commit();
            return Redirect::route('users.index')->with('toast-success', 'User created!');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        Gate::authorize('user_edit');

        $user->load('bus', 'roles');
        return Inertia::render('User/Edit', [
            'user' => $user,
            'bus' => buSelectOption(),
            'roles' => roleSelectOptions(),
            'pivots' => $user->groupRoleByBU()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            
            // Fill and save user
            $user->fill($validated);
            $user->save();
            
            // Detach and sync user bu roles
            $user->bus()->detach();
            $user->syncBuRoles($validated['pivots']);

            DB::commit();
            return Redirect::route('users.index')->with('toast-success', 'User updated!');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        Gate::authorize('user_delete');

        $user->delete();
        return Redirect::back()->with('toast-success', 'User deleted!');
    }
}
