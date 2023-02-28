<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\News;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        for ($i=0; $i < 20; $i++) { 
            News::create([
                'title' => fake()->sentence(),
                'description' => fake()->paragraph(2, true),
                'category' => fake()->text(20),
                'author' => fake()->email(),
            ]);
        }
    }
}
