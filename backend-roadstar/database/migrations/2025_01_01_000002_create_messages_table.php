<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            
            // Type de message
            $table->enum('type', ['contact', 'reservation'])->default('contact');
            
            // Informations de contact
            $table->string('name'); // Nom complet
            $table->string('email'); // Email
            $table->string('phone')->nullable(); // Téléphone
            
            // Contenu du message
            $table->string('subject')->nullable(); // Sujet (pour contact)
            $table->text('message'); // Message
            
            // Pour les réservations
            $table->unsignedBigInteger('vehicle_id')->nullable(); // ID du véhicule réservé
            $table->date('start_date')->nullable(); // Date de début
            $table->date('end_date')->nullable(); // Date de fin
            $table->string('pickup_location')->nullable(); // Lieu de récupération
            
            // Statut
            $table->boolean('is_read')->default(false); // Lu/non lu
            
            $table->timestamps();
            
            // Clé étrangère optionnelle (seulement si le véhicule existe)
            $table->foreign('vehicle_id')
                  ->references('id')
                  ->on('vehicles')
                  ->onDelete('set null'); // Si le véhicule est supprimé, mettre null
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
