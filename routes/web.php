<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShoppingListController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::resource('shoppinglist', ShoppingListController::class)
    ->only(['index', 'store']);

Route::delete('/shoppinglist', [ShoppingListController::class, 'clear'])->name('shoppinglist.clear');
Route::get('shoppinglist/sort', [ShoppingListController::class, 'sort'])->name('shoppinglist.sort');
Route::post('shoppinglist/mass-delete', [ShoppingListController::class, 'massDelete'])->name('shoppinglist.massDelete');


require __DIR__.'/auth.php';
