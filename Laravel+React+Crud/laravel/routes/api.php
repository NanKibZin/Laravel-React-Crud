<!-- 

// use App\Http\Controllers\ProductController;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    //     return $request->user();
    // });
    
    
    // Route::get('product',[ProductController::class,'list']);
    // Route::post('product',[ProductController::class,'store']);
    // Route::get('product/{id}',[ProductController::class,'getProductById']);
    // Route::post('product/{id}',[ProductController::class,'update']);
    // Route::delete('product/{id}',[ProductController::class,'delete']);
    -->


    <?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth routes (public)
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

// User info route (protected)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Product routes (protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('product', [ProductController::class, 'list']);
    Route::post('product', [ProductController::class, 'store']);
    Route::get('product/{id}', [ProductController::class, 'getProductById']);
    Route::post('product/{id}', [ProductController::class, 'update']);
    Route::delete('product/{id}', [ProductController::class, 'delete']);
    Route::post('/logout',[AuthController::class, 'logout'])->name('logout');
});




