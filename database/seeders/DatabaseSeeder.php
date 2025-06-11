<?php

namespace Database\Seeders;

use App\Models\UserBuRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            BuSeeder::class,

            RolePermissionSeeder::class,
            UserBuRoleSeeder::class,
        ]);
    }
}
