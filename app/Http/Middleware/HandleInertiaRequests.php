<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Get user permissions
        $permissions = $user ? $user->grantPermission() : [];

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'permissions' => $permissions,
            ],
            'flash' => [
                'alert-success' => $request->session()->get('alert-success'),
                'alert-error' => $request->session()->get('alert-error'),
                'toast-success' => $request->session()->get('toast-success'),
                'toast-error' => $request->session()->get('toast-error'),
            ],
        ];
    }
}
