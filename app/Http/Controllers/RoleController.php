<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleListResource;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('role_access');

        $data = Role::advancedFilter()->paginate(25);
        $data->load('hasPermissions');
        $lists = RoleListResource::collection($data);

        return Inertia::render('Role/Index', [
            'roles' => $lists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('role_create');

        return Inertia::render('Role/Create', [
            'permissions' => permissionSelectOptions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoleRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $role = Role::create($validated);
            $role->hasPermissions()->sync($validated['permission']);

            DB::commit();
            return Redirect::route('roles.index')->with('toast-success', 'Role created!');
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
    public function edit(Role $role): Response
    {
        Gate::authorize('role_edit');

        $role->load('hasPermissions');
        return Inertia::render('Role/Edit', [
            'permissions' => permissionSelectOptions(),
            'role' => $role,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $role->fill($validated);
            $role->hasPermissions()->sync($validated['permission']);
            $role->save();

            DB::commit();
            return Redirect::route('roles.index')->with('toast-success', 'Role updated!');
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
    public function destroy(Role $role): RedirectResponse
    {
        Gate::authorize('role_delete');

        $role->delete();
        return Redirect::back()->with('toast-success', 'Role deleted!');
    }
}
