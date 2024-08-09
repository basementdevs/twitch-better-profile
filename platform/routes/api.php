<?php

use App\Http\Controllers\Api\V1\OccupationsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    Route::get('/occupations', [OccupationsController::class, 'getOccupationsList']);
});
