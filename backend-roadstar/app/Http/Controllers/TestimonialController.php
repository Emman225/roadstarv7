<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TestimonialController extends Controller
{
    /**
     * Liste publique des témoignages actifs
     */
    public function index()
    {
        try {
            $testimonials = Testimonial::active()->orderBy('created_at', 'desc')->get();
            return response()->json($testimonials);
        } catch (\Exception $e) {
            Log::error('Error fetching testimonials: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur serveur'], 500);
        }
    }

    /**
     * Liste admin de tous les témoignages
     */
    public function adminIndex()
    {
        try {
            $testimonials = Testimonial::orderBy('created_at', 'desc')->get();
            return response()->json($testimonials);
        } catch (\Exception $e) {
            Log::error('Error fetching testimonials (admin): ' . $e->getMessage());
            return response()->json(['error' => 'Erreur serveur'], 500);
        }
    }

    /**
     * Créer un témoignage
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'role' => 'nullable|string|max:255',
                'content' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
                'is_active' => 'nullable|boolean',
            ]);

            $validated['is_active'] = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

            $testimonial = Testimonial::create($validated);

            return response()->json($testimonial, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error creating testimonial: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la création'], 500);
        }
    }

    /**
     * Afficher un témoignage
     */
    public function show($id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);
            return response()->json($testimonial);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Témoignage non trouvé'], 404);
        }
    }

    /**
     * Mettre à jour un témoignage
     */
    public function update(Request $request, $id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'role' => 'nullable|string|max:255',
                'content' => 'sometimes|required|string',
                'rating' => 'sometimes|required|integer|min:1|max:5',
                'is_active' => 'nullable',
            ]);

            if ($request->has('is_active')) {
                $validated['is_active'] = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
            }

            $testimonial->update($validated);

            return response()->json($testimonial);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Témoignage non trouvé'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error updating testimonial: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la mise à jour'], 500);
        }
    }

    /**
     * Supprimer un témoignage
     */
    public function destroy($id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);
            $testimonial->delete();

            return response()->json(['message' => 'Témoignage supprimé avec succès']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Témoignage non trouvé'], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting testimonial: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la suppression'], 500);
        }
    }
}
