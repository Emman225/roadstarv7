<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TestimonialController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Public Vehicle routes
Route::prefix('vehicles')->group(function () {
    Route::get('/', [VehicleController::class, 'index']);
    Route::get('/available', [VehicleController::class, 'available']);
    Route::get('/featured', [VehicleController::class, 'featured']);
    Route::get('/{id}', [VehicleController::class, 'show']);
});

// Public Message routes (Contact & Reservation forms)
Route::prefix('messages')->group(function () {
    Route::post('/contact', [MessageController::class, 'storeContact']);
    Route::post('/reservation', [MessageController::class, 'storeReservation']);
});

// Public Testimonial routes
Route::prefix('testimonials')->group(function () {
    Route::get('/', [TestimonialController::class, 'index']);
    Route::get('/{id}', [TestimonialController::class, 'show']);
});

// Protected routes (Admin only - JWT required)
Route::middleware('auth:api')->group(function () {
    
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // Admin Vehicle routes
    Route::prefix('admin/vehicles')->group(function () {
        Route::post('/', [VehicleController::class, 'store']);
        Route::put('/{id}', [VehicleController::class, 'update']);
        Route::delete('/{id}', [VehicleController::class, 'destroy']);
        Route::get('/stats', [VehicleController::class, 'stats']);
    });

    // Admin Testimonial routes
    Route::prefix('admin/testimonials')->group(function () {
        Route::get('/', [TestimonialController::class, 'adminIndex']);
        Route::post('/', [TestimonialController::class, 'store']);
        Route::put('/{id}', [TestimonialController::class, 'update']);
        Route::delete('/{id}', [TestimonialController::class, 'destroy']);
    });

    // Admin Message routes
    Route::prefix('admin/messages')->group(function () {
        Route::get('/', [MessageController::class, 'index']);
        Route::get('/stats', [MessageController::class, 'stats']);
        Route::get('/unread-count', [MessageController::class, 'unreadCount']);
        Route::get('/type/{type}', [MessageController::class, 'getByType']);
        Route::get('/{id}', [MessageController::class, 'show']);
        Route::put('/{id}/read', [MessageController::class, 'markAsRead']);
        Route::put('/{id}/unread', [MessageController::class, 'markAsUnread']);
        Route::delete('/{id}', [MessageController::class, 'destroy']);
    });
});
