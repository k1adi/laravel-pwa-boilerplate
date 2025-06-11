<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([ // 1
            'username' => 'master admin',
            'fullname' => 'Master Admin',
            'email' => 'masteradmin@boilerplate.com',
            'phone' => '081234567890',
            'password' => Hash::make(env('ADMIN_PASSWORD')),
        ]);

        User::create([ // 2
            'username' => 'admin',
            'fullname' => 'Admin',
            'email' => 'admin@boilerplate.com',
            'phone' => '081234567891',
            'password' => Hash::make('adminpassword'),
        ]);

        User::create([ // 3
            'username' => 'user',
            'fullname' => 'User',
            'email' => 'user@boilerplate.com',
            'phone' => '081234567892',
            'password' => Hash::make('userpassword'),
        ]);
    }
}
