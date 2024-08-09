<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\Settings\OccupationSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(OccupationSeeder::class);

        if (app()->isLocal()) {
            User::factory()->create([
                'name' => 'Daniel Reis',
                'email' => 'admin@admin.com',
                'is_admin' => true
            ]);
        }
    }
}
