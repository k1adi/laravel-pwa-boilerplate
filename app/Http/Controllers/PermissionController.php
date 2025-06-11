<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Http\Resources\PermissionListResource;
use App\Models\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('permission_access');

        $data = Permission::advancedFilter()->paginate(25);
        $lists = PermissionListResource::collection($data);

        return Inertia::render('Permission/Index', [
            'permissions' => $lists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('permission_create');

        return Inertia::render('Permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePermissionRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            Permission::create($validated);
            DB::commit();
            
            return Redirect::route('permissions.index')->with('toast-success', 'Permission created!');
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
    public function edit(Permission $permission): Response
    {
        Gate::authorize('permission_edit');

        return Inertia::render('Permission/Edit', [
            'permission' => $permission,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $permission->fill($validated);

            $permission->save();
            DB::commit();

            return Redirect::route('permissions.index')->with('toast-success', 'Permission updated!');
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
    public function destroy(Permission $permission): RedirectResponse
    {
        Gate::authorize('permission_delete');

        $permission->delete();
        return Redirect::back()->with('toast-success', 'Permission deleted!');
    }
}
