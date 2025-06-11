<?php

namespace Database\Seeders;

use App\Models\Bu;
use Illuminate\Database\Seeder;

class BuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bus = [
            ['code' => 'BU1', 'name' => 'Business Unit 1'],
            ['code' => 'BU2', 'name' => 'Business Unit 2'],
            ['code' => 'BU3', 'name' => 'Business Unit 3'],
        ];

        foreach ($bus as $bu) {
            Bu::create($bu);
        }
    }
}
