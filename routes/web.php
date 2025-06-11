<?php

use App\Http\Controllers\BuController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resources([
        'database/bus' => BuController::class,

        'authorization/users' => UserController::class,
        'authorization/roles' => RoleController::class,
        'authorization/permissions' => PermissionController::class,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/my-profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::put('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__.'/auth.php';

