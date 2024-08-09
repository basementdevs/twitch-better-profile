<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Settings\Occupation;
use Illuminate\Http\JsonResponse;

class OccupationsController extends Controller
{
    public function getOccupationsList(): JsonResponse
    {
        $ttl = 60 * 60; // 1 hour
        $cachedOccupations = cache()->remember('occupations', $ttl , function () {
            return Occupation::query()->select(['id', 'name', 'slug', 'translation_key'])->get();
        });

        return response()->json($cachedOccupations);
    }
}
