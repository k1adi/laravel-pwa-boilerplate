<?php

namespace Database\Seeders;

use App\Models\UserBuRole;
use Illuminate\Database\Seeder;

class UserBuRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $buRoles = [
            ['user_id' => 1, 'bu_id' => 1, 'role_id' => 1],
            ['user_id' => 1, 'bu_id' => 2, 'role_id' => 1],
            ['user_id' => 1, 'bu_id' => 3, 'role_id' => 1],

            ['user_id' => 2, 'bu_id' => 1, 'role_id' => 2],
            ['user_id' => 3, 'bu_id' => 3, 'role_id' => 3],
        ];

        foreach ($buRoles as $buRole) {
            UserBuRole::create($buRole);
        }
    }
}
