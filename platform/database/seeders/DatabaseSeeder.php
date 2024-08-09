<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (app()->isLocal()) {
            User::factory()->create([
                'name' => 'Daniel Reis',
                'email' => 'admin@admin.com',
                'is_admin' => true
            ]);
        }
    }
}
