<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Message;
use Illuminate\Support\Facades\Hash;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Ce seeder génère des données de test pour faciliter les tests Postman
     */
    public function run(): void
    {
        // 1. Créer un utilisateur admin pour les tests
        $admin = User::create([
            'name' => 'Admin RoadStar',
            'email' => 'admin@roadstar.com',
            'password' => Hash::make('password123'),
        ]);

        echo "✅ Utilisateur admin créé : admin@roadstar.com / password123\n";

        // 2. Créer des véhicules de test
        $vehicles = [
            [
                'brand' => 'Mercedes',
                'model' => 'Classe S',
                'year' => 2023,
                'license_plate' => 'AB-123-CD',
                'color' => 'Noir',
                'mileage' => 5000,
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatique',
                'category' => 'Berlines',
                'seats' => 5,
                'daily_rate' => 250.00,
                'status' => 'available',
                'is_featured' => true,
                'description' => 'Véhicule de luxe avec toutes les options. Confort maximal pour vos déplacements professionnels.',
                'features' => json_encode(['GPS', 'Climatisation', 'Sièges en cuir', 'Caméra de recul', 'Régulateur de vitesse']),
                'image' => 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Toyota',
                'model' => 'Land Cruiser',
                'year' => 2024,
                'license_plate' => 'CD-456-EF',
                'color' => 'Blanc',
                'mileage' => 1000,
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatique',
                'category' => '4x4',
                'seats' => 7,
                'daily_rate' => 200.00,
                'status' => 'available',
                'is_featured' => true,
                'description' => 'SUV 4x4 robuste, parfait pour tous les terrains. Idéal pour les voyages en famille.',
                'features' => json_encode(['4x4', 'GPS', '7 places', 'Climatisation', 'Toit ouvrant']),
                'image' => 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'BMW',
                'model' => 'Série 7',
                'year' => 2023,
                'license_plate' => 'GH-789-IJ',
                'color' => 'Gris métallisé',
                'mileage' => 3000,
                'fuel_type' => 'Hybride',
                'transmission' => 'Automatique',
                'category' => 'Berlines',
                'seats' => 5,
                'daily_rate' => 280.00,
                'status' => 'available',
                'is_featured' => true,
                'description' => 'Berline premium hybride alliant performance et écologie.',
                'features' => json_encode(['GPS', 'Climatisation automatique', 'Sièges massants', 'Sound system premium', 'Conduite autonome niveau 2']),
                'image' => 'https://images.unsplash.com/photo-1555215695-3004980ad953?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Audi',
                'model' => 'A6',
                'year' => 2022,
                'license_plate' => 'KL-012-MN',
                'color' => 'Bleu nuit',
                'mileage' => 15000,
                'fuel_type' => 'Essence',
                'transmission' => 'Automatique',
                'category' => 'Berlines',
                'seats' => 5,
                'daily_rate' => 180.00,
                'status' => 'available',
                'is_featured' => false,
                'description' => 'Berline élégante et confortable pour vos déplacements quotidiens.',
                'features' => json_encode(['GPS', 'Climatisation', 'Bluetooth', 'Caméra de recul']),
                'image' => 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Range Rover',
                'model' => 'Sport',
                'year' => 2024,
                'license_plate' => 'OP-345-QR',
                'color' => 'Noir',
                'mileage' => 500,
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatique',
                'category' => 'S.U.V',
                'seats' => 5,
                'daily_rate' => 300.00,
                'status' => 'available',
                'is_featured' => true,
                'description' => 'SUV de luxe sportif avec performances exceptionnelles.',
                'features' => json_encode(['4x4', 'GPS', 'Sièges en cuir Nappa', 'Assistance au stationnement', 'Système audio Meridian']),
                'image' => 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Volkswagen',
                'model' => 'Transporter',
                'year' => 2021,
                'license_plate' => 'ST-678-UV',
                'color' => 'Gris',
                'mileage' => 25000,
                'fuel_type' => 'Diesel',
                'transmission' => 'Manuelle',
                'category' => 'Mini Van / Car',
                'seats' => 9,
                'daily_rate' => 150.00,
                'status' => 'available',
                'is_featured' => false,
                'description' => 'Van idéal pour le transport de personnel ou groupes.',
                'features' => json_encode(['9 places', 'Climatisation', 'Bluetooth']),
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Ford',
                'model' => 'Ranger',
                'year' => 2023,
                'license_plate' => 'WX-901-YZ',
                'color' => 'Argent',
                'mileage' => 8000,
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatique',
                'category' => 'PickUp',
                'seats' => 5,
                'daily_rate' => 100.00,
                'status' => 'available',
                'is_featured' => false,
                'description' => 'Pick-up robuste pour vos besoins utilitaires et tout-terrain.',
                'features' => json_encode(['4x4', 'Climatisation', 'Bluetooth', 'Benne spacieuse']),
                'image' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Hyundai',
                'model' => 'Tucson',
                'year' => 2022,
                'license_plate' => 'BC-234-DE',
                'color' => 'Blanc perle',
                'mileage' => 12000,
                'fuel_type' => 'Essence',
                'transmission' => 'Automatique',
                'category' => 'S.U.V',
                'seats' => 5,
                'daily_rate' => 70.00,
                'status' => 'available',
                'is_featured' => false,
                'description' => 'SUV compact moderne et confortable.',
                'features' => json_encode(['GPS', 'Climatisation', 'Caméra de recul']),
                'image' => 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Toyota',
                'model' => 'Prado',
                'year' => 2024,
                'license_plate' => 'FG-567-HI',
                'color' => 'Noir',
                'mileage' => 2000,
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatique',
                'category' => '4x4',
                'seats' => 7,
                'daily_rate' => 180.00,
                'status' => 'available',
                'is_featured' => true,
                'description' => 'Le confort du luxe allié à la puissance du 4x4.',
                'features' => json_encode(['4x4', 'GPS', '7 places', 'Cuir']),
                'image' => 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'brand' => 'Mercedes',
                'model' => 'V-Class',
                'year' => 2023,
                'license_plate' => 'JK-890-LM',
                'color' => 'Noir',
                'mileage' => 6000,
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatique',
                'category' => 'Mini Van / Car',
                'seats' => 7,
                'daily_rate' => 220.00,
                'status' => 'available',
                'is_featured' => false,
                'description' => 'Minivan de luxe pour transferts VIP.',
                'features' => json_encode(['7 places VIP', 'Climatisation tri-zone', 'Portes coulissantes électriques']),
                'image' => 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
            ],
        ];

        foreach ($vehicles as $vehicleData) {
            Vehicle::create($vehicleData);
        }

        echo "✅ " . count($vehicles) . " véhicules créés\n";

        // 3. Créer des messages de contact
        $contactMessages = [
            [
                'type' => 'contact',
                'name' => 'Jean Dupont',
                'email' => 'jean.dupont@example.com',
                'phone' => '+243 812 345 678',
                'subject' => 'Demande d\'information sur la location',
                'message' => 'Bonjour, je souhaiterais obtenir plus d\'informations sur vos services de location de voitures. Proposez-vous des tarifs dégressifs pour les locations de longue durée ?',
                'is_read' => false,
            ],
            [
                'type' => 'contact',
                'name' => 'Marie Martin',
                'email' => 'marie.martin@example.com',
                'phone' => '+243 898 765 432',
                'subject' => 'Question sur l\'assurance',
                'message' => 'Bonjour, quelle est la couverture d\'assurance incluse dans la location ? Est-il possible de souscrire une assurance tous risques ?',
                'is_read' => true,
            ],
            [
                'type' => 'contact',
                'name' => 'Paul Mbemba',
                'email' => 'paul.mbemba@example.com',
                'phone' => '+243 823 456 789',
                'subject' => 'Partenariat entreprise',
                'message' => 'Bonjour, notre entreprise cherche un partenaire pour la location de véhicules pour nos employés. Proposez-vous des contrats entreprise ?',
                'is_read' => false,
            ],
            [
                'type' => 'contact',
                'name' => 'Sophie Nkulu',
                'email' => 'sophie.nkulu@example.com',
                'phone' => '+243 845 678 901',
                'subject' => 'Véhicule adapté handicapé',
                'message' => 'Bonjour, disposez-vous de véhicules adaptés pour personnes à mobilité réduite ?',
                'is_read' => false,
            ],
        ];

        foreach ($contactMessages as $messageData) {
            Message::create($messageData);
        }

        echo "✅ " . count($contactMessages) . " messages de contact créés\n";

        // 4. Créer des demandes de réservation
        $reservationMessages = [
            [
                'type' => 'reservation',
                'name' => 'Alice Kasongo',
                'email' => 'alice.kasongo@example.com',
                'phone' => '+243 856 789 012',
                'vehicle_id' => 1, // Mercedes Classe S
                'start_date' => '2025-01-15',
                'end_date' => '2025-01-20',
                'pickup_location' => 'Kinshasa Centre',
                'message' => 'Je souhaite réserver ce véhicule pour un voyage d\'affaires. Pouvez-vous confirmer la disponibilité ?',
                'is_read' => false,
            ],
            [
                'type' => 'reservation',
                'name' => 'Bob Tshilombo',
                'email' => 'bob.tshilombo@example.com',
                'phone' => '+243 867 890 123',
                'vehicle_id' => 2, // Toyota Land Cruiser
                'start_date' => '2025-01-18',
                'end_date' => '2025-01-25',
                'pickup_location' => 'Aéroport de N\'djili',
                'message' => 'Réservation pour un voyage en famille. Arrivée prévue le 18/01 à 14h.',
                'is_read' => true,
            ],
            [
                'type' => 'reservation',
                'name' => 'Christine Mukendi',
                'email' => 'christine.mukendi@example.com',
                'phone' => '+243 878 901 234',
                'vehicle_id' => 3, // BMW Série 7
                'start_date' => '2025-02-01',
                'end_date' => '2025-02-05',
                'pickup_location' => 'Gombe',
                'message' => 'Réservation pour une conférence internationale. Besoin d\'un chauffeur également.',
                'is_read' => false,
            ],
            [
                'type' => 'reservation',
                'name' => 'David Kalala',
                'email' => 'david.kalala@example.com',
                'phone' => '+243 889 012 345',
                'vehicle_id' => 7, // Ford Explorer
                'start_date' => '2025-01-22',
                'end_date' => '2025-01-28',
                'pickup_location' => 'Kinshasa Centre',
                'message' => 'Voyage en famille avec 6 personnes. Le véhicule 7 places serait parfait.',
                'is_read' => false,
            ],
            [
                'type' => 'reservation',
                'name' => 'Emma Mbuyi',
                'email' => 'emma.mbuyi@example.com',
                'phone' => '+243 890 123 456',
                'vehicle_id' => 10, // Lexus RX 450h
                'start_date' => '2025-02-10',
                'end_date' => '2025-02-17',
                'pickup_location' => 'Ma Campagne',
                'message' => 'Intéressée par le véhicule hybride pour une semaine. Quel est le tarif total ?',
                'is_read' => true,
            ],
        ];

        foreach ($reservationMessages as $messageData) {
            Message::create($messageData);
        }

        echo "✅ " . count($reservationMessages) . " demandes de réservation créées\n";

        echo "\n";
        echo "═══════════════════════════════════════════════════════════\n";
        echo "✅ DONNÉES DE TEST CRÉÉES AVEC SUCCÈS !\n";
        echo "═══════════════════════════════════════════════════════════\n";
        echo "\n";
        echo "📊 Résumé :\n";
        echo "   • 1 utilisateur admin\n";
        echo "   • " . count($vehicles) . " véhicules\n";
        echo "   • " . count($contactMessages) . " messages de contact\n";
        echo "   • " . count($reservationMessages) . " demandes de réservation\n";
        echo "\n";
        echo "🔑 Identifiants admin :\n";
        echo "   Email    : admin@roadstar.com\n";
        echo "   Password : password123\n";
        echo "\n";
        echo "📝 Vous pouvez maintenant tester l'API avec Postman !\n";
        echo "═══════════════════════════════════════════════════════════\n";
    }
}
