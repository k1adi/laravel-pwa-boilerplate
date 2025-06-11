<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Permission;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Check if the permissions table exists before trying to load permissions
        try {
            // Only proceed if the database connection is established and the table exists
            if (Schema::hasTable('permissions')) {
                // Dynamically define gates based on permissions
                Permission::all()->each(function ($permission) {
                    Gate::define($permission->name, function ($user) use ($permission) {
                        // Use the `grantPermission` method from the User model
                        return $user->grantPermission()->contains($permission->name);
                    });
                });
            }
        } catch (\Exception $e) {
            // Log the exception or handle it silently during initial setup
            // This prevents errors when the database isn't set up yet
            report($e);
        }
    }
}
