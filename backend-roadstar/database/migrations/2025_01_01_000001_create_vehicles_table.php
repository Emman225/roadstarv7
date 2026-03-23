<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            
            // Informations de base
            $table->string('brand'); // Marque (Mercedes, Toyota, etc.)
            $table->string('model'); // Modèle (Classe S, Land Cruiser, etc.)
            $table->year('year'); // Année de fabrication
            $table->string('license_plate')->unique(); // Plaque d'immatriculation (unique)
            
            // Détails du véhicule
            $table->string('color')->nullable(); // Couleur
            $table->integer('mileage')->default(0); // Kilométrage
            $table->string('fuel_type')->nullable(); // Type de carburant (Essence, Diesel, Électrique, Hybride)
            $table->string('transmission')->nullable(); // Transmission (Manuelle, Automatique)
            $table->integer('seats')->default(5); // Nombre de places
            
            // Prix et disponibilité
            $table->decimal('daily_rate', 10, 2); // Prix par jour
            $table->enum('status', ['available', 'rented', 'maintenance', 'reserved'])->default('available');
            $table->boolean('is_featured')->default(false); // Véhicule en vedette
            
            // Description et caractéristiques
            $table->string('image')->nullable(); // Image principale
            $table->text('description')->nullable(); // Description détaillée
            $table->json('features')->nullable(); // Caractéristiques (GPS, Climatisation, etc.)
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
