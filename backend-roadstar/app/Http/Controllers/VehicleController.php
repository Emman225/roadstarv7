<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{
    /**
     * Display a listing of vehicles (Public)
     */
    public function index()
    {
        $vehicles = Vehicle::orderBy('created_at', 'desc')->get();
        return response()->json($vehicles);
    }

    /**
     * Display available vehicles only (Public)
     */
    public function available()
    {
        $vehicles = Vehicle::where('status', 'available')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($vehicles);
    }

    /**
     * Display featured vehicles (Public)
     */
    public function featured()
    {
        $vehicles = Vehicle::where('is_featured', true)
            ->where('status', 'available')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($vehicles);
    }

    /**
     * Store a newly created vehicle (Admin)
     */
    public function store(Request $request)
    {
        // Convert string booleans to actual booleans for multipart/form-data compatibility
        foreach (['is_featured', 'featured', 'available'] as $field) {
            if ($request->has($field)) {
                $value = $request->input($field);
                if ($value === 'true' || $value === '1') {
                    $request->merge([$field => true]);
                } elseif ($value === 'false' || $value === '0') {
                    $request->merge([$field => false]);
                }
            }
        }

        // Supporting both old and new field names for maximum compatibility
        $validated = $request->validate([
            'brand' => 'required_without:name|string|max:255',
            'model' => 'required_without:name|string|max:255',
            'name' => 'nullable|string|max:255', // fallback
            'year' => 'nullable|integer',
            'license_plate' => 'nullable|string|unique:vehicles,license_plate',
            'color' => 'nullable|string|max:255',
            'mileage' => 'nullable|integer',
            'daily_rate' => 'required_without:price|numeric',
            'price' => 'nullable|string', // fallback
            'image' => 'nullable', // allow string or file
            'seats' => 'nullable|integer',
            'passengers' => 'nullable|integer', // fallback
            'transmission' => 'nullable|string',
            'fuel_type' => 'nullable|string',
            'fuel' => 'nullable|string', // fallback
            'is_featured' => 'boolean',
            'featured' => 'nullable|boolean', // fallback
            'status' => 'nullable|string',
            'available' => 'nullable|boolean', // fallback
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'category' => 'nullable|string',
            'type' => 'nullable|string', // fallback
        ]);

        // Mapping old fields to new ones if necessary
        $data = $validated;
        
        if ($request->has('name') && $request->filled('name') && !$request->has('brand')) {
            $parts = explode(' ', $request->name, 2);
            $data['brand'] = $parts[0];
            $data['model'] = $parts[1] ?? 'Modèle';
        }
        
        if ($request->has('price') && $request->filled('price') && !$request->has('daily_rate')) {
            $cleanPrice = str_replace([' ', 'FCFA', 'fcfa', ','], '', $request->price);
            if (is_numeric($cleanPrice)) {
                $data['daily_rate'] = (float) $cleanPrice;
            }
        }
        
        if ($request->has('passengers') && !$request->has('seats')) {
            $data['seats'] = (int) $request->passengers;
        }
        
        if ($request->has('fuel') && !$request->has('fuel_type')) {
            $data['fuel_type'] = $request->fuel;
        }

        if ($request->has('featured') && !$request->has('is_featured')) {
            $data['is_featured'] = (bool) $request->featured;
        }

        if ($request->has('available') && !$request->has('status')) {
            $data['status'] = $request->available ? 'available' : 'maintenance';
        }

        if ($request->has('type') && !$request->has('category')) {
            $data['category'] = $request->type;
        }

        // Default values for missing essential fields
        $data['brand'] = $data['brand'] ?? 'Marque';
        $data['model'] = $data['model'] ?? 'Modèle';
        $data['year'] = $data['year'] ?? date('Y');
        $data['license_plate'] = $data['license_plate'] ?? 'TEMP-' . time();
        // Handle image upload if a file is provided
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            // Store directly in public/uploads/vehicles
            $file->move(public_path('uploads/vehicles'), $filename);
            $data['image'] = asset('uploads/vehicles/' . $filename);
        }

        try {
            $vehicle = Vehicle::create($data);
            return response()->json([
                'message' => 'Véhicule créé avec succès',
                'vehicle' => $vehicle
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création du véhicule : ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la création du véhicule',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified vehicle (Public)
     */
    public function show($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        return response()->json($vehicle);
    }

    /**
     * Update the specified vehicle (Admin)
     */
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::findOrFail($id);

        // Convert string booleans to actual booleans for multipart/form-data compatibility
        foreach (['is_featured', 'featured', 'available'] as $field) {
            if ($request->has($field)) {
                $value = $request->input($field);
                if ($value === 'true' || $value === '1') {
                    $request->merge([$field => true]);
                } elseif ($value === 'false' || $value === '0') {
                    $request->merge([$field => false]);
                }
            }
        }

        $validated = $request->validate([
            'brand' => 'sometimes|string|max:255',
            'model' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer',
            'license_plate' => 'sometimes|string|unique:vehicles,license_plate,' . $id,
            'color' => 'nullable|string|max:255',
            'mileage' => 'nullable|integer',
            'daily_rate' => 'sometimes|numeric',
            'image' => 'nullable', // allow string or file
            'seats' => 'sometimes|integer',
            'transmission' => 'sometimes|string',
            'fuel_type' => 'sometimes|string',
            'is_featured' => 'boolean',
            'status' => 'sometimes|string',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            // Fallbacks for frontend
            'name' => 'nullable|string',
            'price' => 'nullable|string',
            'passengers' => 'nullable|integer',
            'fuel' => 'nullable|string',
            'featured' => 'nullable|boolean',
            'available' => 'nullable|boolean',
            'category' => 'nullable|string',
            'type' => 'nullable|string',
        ]);

        $data = $validated;
        
        // Comprehensive mapping for backward compatibility
        if ($request->has('name') && $request->filled('name')) {
            $parts = explode(' ', $request->name, 2);
            $data['brand'] = $parts[0];
            $data['model'] = $parts[1] ?? ($data['model'] ?? $vehicle->model);
        }
        
        if ($request->has('price') && $request->filled('price')) {
            // Remove spaces, FCFA, and commas for numerical conversion
            $cleanPrice = str_replace([' ', 'FCFA', 'fcfa', ','], '', $request->price);
            if (is_numeric($cleanPrice)) {
                $data['daily_rate'] = (float) $cleanPrice;
            }
        }
        
        if ($request->has('passengers')) $data['seats'] = (int) $request->passengers;
        if ($request->has('fuel')) $data['fuel_type'] = $request->fuel;
        if ($request->has('featured')) $data['is_featured'] = (bool) $request->featured;
        
        if ($request->has('available')) {
            $data['status'] = $request->available ? 'available' : ($data['status'] ?? $vehicle->status);
            // If it was already rented or maintenance, don't force 'available' if 'available' is false
            if (!$request->available && $data['status'] === 'available') {
                $data['status'] = 'maintenance';
            }
        }

        if ($request->has('type') && !$request->has('category')) {
            $data['category'] = $request->type;
        }

        // Ensure essential fields are not cleared to null if they are required
        // Handle image upload if a file is provided
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            // Store directly in public/uploads/vehicles
            $file->move(public_path('uploads/vehicles'), $filename);
            $data['image'] = asset('uploads/vehicles/' . $filename);
        }

        try {
            $vehicle->update($data);
            return response()->json([
                'message' => 'Véhicule mis à jour avec succès',
                'vehicle' => $vehicle->fresh()
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du véhicule : ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du véhicule',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified vehicle (Admin)
     */
    public function destroy($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->delete();

        return response()->json([
            'message' => 'Véhicule supprimé avec succès'
        ]);
    }

    /**
     * Get statistics (Admin)
     */
    public function stats()
    {
        $stats = [
            'total' => Vehicle::count(),
            'available' => Vehicle::where('status', 'available')->count(),
            'rented' => Vehicle::where('status', 'rented')->count(),
            'maintenance' => Vehicle::where('status', 'maintenance')->count(),
            'featured' => Vehicle::where('is_featured', true)->count(),
        ];

        return response()->json($stats);
    }
}
