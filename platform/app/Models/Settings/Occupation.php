<?php

namespace App\Models\Settings;

use Illuminate\Database\Eloquent\Model;

class Occupation extends Model
{
    protected $fillable = ['name', 'slug', 'translation_key'];

    public function getImageUrlAttribute(): string
    {
        return asset(sprintf("storage/icons/%s.png", $this->slug));
    }

    protected $appends = [
        'image_url'
    ];
}
