<?php

namespace Database\Seeders\Settings;

use App\Models\Settings\Occupation;
use Illuminate\Database\Seeder;

class OccupationSeeder extends Seeder
{
    public function run(): void
    {
        foreach(config('extension.occupations') as $occupation) {
            Occupation::create($occupation);
        }
    }
}
