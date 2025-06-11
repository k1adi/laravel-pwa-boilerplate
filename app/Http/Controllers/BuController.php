<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBuRequest;
use App\Http\Requests\UpdateBuRequest;
use App\Http\Resources\BuListResource;
use App\Models\Bu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = Bu::advancedFilter()->paginate(25);
        $lists = BuListResource::collection($data);

        return Inertia::render('Bu/Index', [
            'bus' => $lists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Bu/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateBuRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try{
            $validated = $request->validated();
            
            // Insert bu data to bu table
            Bu::create($validated);
            DB::commit();

            return Redirect::route('bus.index')->with('toast-success', 'Business Unit created!');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e
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
    public function edit(Bu $bu): Response
    {
        return Inertia::render('Bu/Edit', [
            'bu' => $bu,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBuRequest $request, Bu $bu): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            
            $bu->fill($validated);
            $bu->save();
            DB::commit();

            return Redirect::route('bus.index')->with('toast-success', 'Business Unit updated!');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bu $bu)
    {
        $bu->delete();
        return Redirect::back()->with('toast-success', 'Business Unit deleted!');
    }
}
