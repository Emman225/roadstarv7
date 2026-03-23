<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'Admin RoadStar',
            'email' => 'admin@roadstar225.com',
            'password' => Hash::make('admin123'),
        ]);

        // You can add sample vehicles here if needed
        // \App\Models\Vehicle::factory(10)->create();
    }
}
