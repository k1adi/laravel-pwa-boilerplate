<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'dashboard_access',

            'user_access',
            'user_create',
            'user_edit',
            'user_delete',

            'role_access',
            'role_create',
            'role_edit',
            'role_delete',

            'permission_access',
            'permission_create',
            'permission_edit',
            'permission_delete',

            'bu_access',
            'bu_create',
            'bu_edit',
            'bu_delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
            ]);
        }
    }
}
