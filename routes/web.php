<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [NewsController::class, 'index'])->name('homepage');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/news', [NewsController::class, 'store']);
    Route::get('/news', [NewsController::class, 'show']);
    Route::get('/news/edit/{id}', [NewsController::class, 'edit']);
    Route::post('/news/update', [NewsController::class, 'update']);
    Route::get('/news/destroy/{id}', [NewsController::class, 'destroy']);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
