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
            'username' => 'admin',
            'fullname' => 'Master Admin',
            'email' => 'admin@boilerplate.com',
            'phone' => '081234567890',
            'password' => Hash::make('password'),
        ]);//
    }
}
