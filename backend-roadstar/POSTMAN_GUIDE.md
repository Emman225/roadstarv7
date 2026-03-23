# 🚗 Guide Postman - API RoadStar

## 📋 Table des matières
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Ordre de test recommandé](#ordre-de-test-recommandé)
4. [Détails des endpoints](#détails-des-endpoints)
5. [Gestion du JWT Token](#gestion-du-jwt-token)
6. [Exemples de tests](#exemples-de-tests)
7. [Troubleshooting](#troubleshooting)

---

## 📥 Installation

### Étape 1 : Importer la collection
1. Ouvrez Postman
2. Cliquez sur **Import** (en haut à gauche)
3. Sélectionnez le fichier `RoadStar_API.postman_collection.json`
4. Cliquez sur **Import**

### Étape 2 : Importer l'environnement
1. Cliquez sur **Import** 
2. Sélectionnez le fichier `RoadStar_Environment.postman_environment.json`
3. Cliquez sur **Import**

### Étape 3 : Activer l'environnement
1. Dans le coin supérieur droit, sélectionnez **RoadStar - Local Development** dans le menu déroulant
2. L'environnement est maintenant actif

---

## ⚙️ Configuration

### Variables d'environnement

| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `base_url` | `http://localhost:8000/api` | URL de base de l'API |
| `jwt_token` | (vide) | Token JWT (automatiquement rempli après login) |

### Modifier l'URL de base
Si votre API tourne sur un autre port/domaine :
1. Cliquez sur l'icône ⚙️ en haut à droite
2. Sélectionnez **RoadStar - Local Development**
3. Modifiez la valeur de `base_url`
4. Cliquez sur **Save**

---

## 🔄 Ordre de test recommandé

### Phase 1 : Configuration initiale
```
1. Démarrer le serveur Laravel (php artisan serve)
2. Vérifier que la base de données est configurée
3. Exécuter les migrations (php artisan migrate)
```

### Phase 2 : Tests publics (sans authentification)

#### A. Véhicules publics
1. ✅ **Get All Vehicles** - Voir tous les véhicules
2. ✅ **Get Available Vehicles** - Voir les véhicules disponibles
3. ✅ **Get Featured Vehicles** - Voir les véhicules en vedette
4. ✅ **Get Vehicle by ID** - Voir un véhicule spécifique

#### B. Formulaires publics
5. ✅ **Contact Form** - Envoyer un message de contact
6. ✅ **Reservation Form** - Envoyer une demande de réservation

### Phase 3 : Authentification
7. ✅ **Register** - Créer un compte (optionnel)
8. 🔑 **Login** - Se connecter (le token JWT sera sauvegardé automatiquement)
9. ✅ **Get User Info** - Vérifier l'utilisateur connecté

### Phase 4 : Tests admin (avec authentification)

#### C. Gestion des véhicules
10. ✅ **Get Vehicle Statistics** - Voir les statistiques
11. ✅ **Create Vehicle** - Créer un nouveau véhicule
12. ✅ **Update Vehicle** - Modifier un véhicule
13. ✅ **Delete Vehicle** - Supprimer un véhicule

#### D. Gestion des messages
14. ✅ **Get All Messages** - Voir tous les messages
15. ✅ **Get Message Statistics** - Voir les statistiques
16. ✅ **Get Unread Count** - Compter les non lus
17. ✅ **Get Messages by Type - Contact** - Filtrer par type contact
18. ✅ **Get Messages by Type - Reservation** - Filtrer par type réservation
19. ✅ **Get Message by ID** - Voir un message spécifique
20. ✅ **Mark Message as Read** - Marquer comme lu
21. ✅ **Mark Message as Unread** - Marquer comme non lu
22. ✅ **Delete Message** - Supprimer un message

### Phase 5 : Déconnexion
23. ✅ **Refresh Token** - Rafraîchir le token (optionnel)
24. ✅ **Logout** - Se déconnecter

---

## 📚 Détails des endpoints

### 🔐 Authentication

#### POST /auth/register
**Description** : Créer un nouveau compte utilisateur

**Body** :
```json
{
    "name": "Test User",
    "email": "test@roadstar.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Réponse (200)** :
```json
{
    "message": "User registered successfully",
    "user": {
        "id": 1,
        "name": "Test User",
        "email": "test@roadstar.com"
    },
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer",
    "expires_in": 3600
}
```

#### POST /auth/login
**Description** : Se connecter et obtenir un token JWT

**Body** :
```json
{
    "email": "admin@roadstar.com",
    "password": "password123"
}
```

**Script de test** : Le token JWT est automatiquement sauvegardé dans `{{jwt_token}}`

**Réponse (200)** :
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer",
    "expires_in": 3600
}
```

#### GET /auth/me
**Description** : Obtenir les informations de l'utilisateur connecté

**Headers** : `Authorization: Bearer {{jwt_token}}`

**Réponse (200)** :
```json
{
    "id": 1,
    "name": "Admin User",
    "email": "admin@roadstar.com",
    "created_at": "2025-12-31T10:00:00.000000Z"
}
```

---

### 🚗 Vehicles (Public)

#### GET /vehicles
**Description** : Récupérer tous les véhicules

**Réponse (200)** :
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "brand": "Mercedes",
            "model": "Classe S",
            "year": 2023,
            "daily_rate": 250.00,
            "status": "available",
            "is_featured": true,
            ...
        }
    ]
}
```

#### GET /vehicles/available
**Description** : Véhicules avec status = 'available'

#### GET /vehicles/featured
**Description** : Véhicules avec is_featured = true

#### GET /vehicles/{id}
**Description** : Détails d'un véhicule spécifique

---

### 🚗 Vehicles (Admin)

#### POST /admin/vehicles
**Description** : Créer un nouveau véhicule

**Headers** : `Authorization: Bearer {{jwt_token}}`

**Body** :
```json
{
    "brand": "Mercedes",
    "model": "Classe S",
    "year": 2023,
    "license_plate": "AB-123-CD",
    "color": "Noir",
    "mileage": 5000,
    "fuel_type": "Diesel",
    "transmission": "Automatique",
    "seats": 5,
    "daily_rate": 250.00,
    "status": "available",
    "is_featured": true,
    "description": "Véhicule de luxe",
    "features": ["GPS", "Climatisation", "Sièges en cuir"]
}
```

**Champs obligatoires** :
- `brand`, `model`, `year`, `license_plate`, `daily_rate`, `status`

**Valeurs possibles pour status** :
- `available` - Disponible
- `rented` - Loué
- `maintenance` - En maintenance
- `reserved` - Réservé

**Valeurs possibles pour fuel_type** :
- `Essence`, `Diesel`, `Électrique`, `Hybride`

**Valeurs possibles pour transmission** :
- `Manuelle`, `Automatique`

#### PUT /admin/vehicles/{id}
**Description** : Modifier un véhicule existant

**Headers** : `Authorization: Bearer {{jwt_token}}`

**Body** : Même structure que POST

#### DELETE /admin/vehicles/{id}
**Description** : Supprimer un véhicule

**Headers** : `Authorization: Bearer {{jwt_token}}`

#### GET /admin/vehicles/stats
**Description** : Statistiques des véhicules

**Headers** : `Authorization: Bearer {{jwt_token}}`

**Réponse (200)** :
```json
{
    "success": true,
    "data": {
        "total": 10,
        "available": 7,
        "rented": 2,
        "maintenance": 1,
        "featured": 3
    }
}
```

---

### 💬 Messages (Public)

#### POST /messages/contact
**Description** : Formulaire de contact

**Body** :
```json
{
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+243 812 345 678",
    "subject": "Demande d'information",
    "message": "Bonjour, je souhaiterais obtenir plus d'informations."
}
```

**Champs obligatoires** : `name`, `email`, `subject`, `message`

#### POST /messages/reservation
**Description** : Demande de réservation

**Body** :
```json
{
    "name": "Marie Martin",
    "email": "marie.martin@example.com",
    "phone": "+243 898 765 432",
    "vehicle_id": 1,
    "start_date": "2025-01-15",
    "end_date": "2025-01-20",
    "pickup_location": "Kinshasa Centre",
    "message": "Je souhaite réserver ce véhicule."
}
```

**Champs obligatoires** : `name`, `email`, `vehicle_id`, `start_date`, `end_date`

**Format de date** : `YYYY-MM-DD`

---

### 💬 Messages (Admin)

#### GET /admin/messages
**Description** : Tous les messages

**Headers** : `Authorization: Bearer {{jwt_token}}`

#### GET /admin/messages/stats
**Description** : Statistiques des messages

**Réponse (200)** :
```json
{
    "success": true,
    "data": {
        "total": 50,
        "contact": 30,
        "reservation": 20,
        "unread": 15
    }
}
```

#### GET /admin/messages/unread-count
**Description** : Nombre de messages non lus

**Réponse (200)** :
```json
{
    "success": true,
    "count": 15
}
```

#### GET /admin/messages/type/{type}
**Description** : Messages filtrés par type

**Types disponibles** : `contact`, `reservation`

#### GET /admin/messages/{id}
**Description** : Détails d'un message

#### PUT /admin/messages/{id}/read
**Description** : Marquer comme lu

#### PUT /admin/messages/{id}/unread
**Description** : Marquer comme non lu

#### DELETE /admin/messages/{id}
**Description** : Supprimer un message

---

## 🔑 Gestion du JWT Token

### Sauvegarde automatique
Le token JWT est **automatiquement sauvegardé** après un login réussi grâce au script de test :

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.access_token) {
        pm.environment.set("jwt_token", jsonData.access_token);
    }
}
```

### Utilisation du token
Toutes les routes admin utilisent automatiquement le token via :
```
Authorization: Bearer {{jwt_token}}
```

### Vérifier le token
Pour voir le token actuel :
1. Cliquez sur l'icône 👁️ en haut à droite
2. Vérifiez la valeur de `jwt_token`

### Durée de validité
Le token expire après **60 minutes** (3600 secondes). Utilisez **Refresh Token** pour le renouveler.

---

## 🧪 Exemples de tests

### Scénario complet : Gestion d'un véhicule

1. **Login**
   ```
   POST /auth/login
   ```

2. **Créer un véhicule**
   ```
   POST /admin/vehicles
   {
       "brand": "Toyota",
       "model": "Land Cruiser",
       "year": 2024,
       "license_plate": "CD-456-EF",
       "color": "Blanc",
       "mileage": 0,
       "fuel_type": "Diesel",
       "transmission": "Automatique",
       "seats": 7,
       "daily_rate": 200.00,
       "status": "available",
       "is_featured": true,
       "description": "SUV 4x4 robuste",
       "features": ["4x4", "GPS", "7 places"]
   }
   ```

3. **Vérifier la création**
   ```
   GET /vehicles
   ```

4. **Modifier le véhicule**
   ```
   PUT /admin/vehicles/1
   {
       ...
       "daily_rate": 220.00
   }
   ```

5. **Voir les statistiques**
   ```
   GET /admin/vehicles/stats
   ```

### Scénario complet : Traitement d'un message

1. **Client envoie un message**
   ```
   POST /messages/contact
   ```

2. **Admin se connecte**
   ```
   POST /auth/login
   ```

3. **Admin voit les messages non lus**
   ```
   GET /admin/messages/unread-count
   ```

4. **Admin lit un message**
   ```
   GET /admin/messages/1
   ```

5. **Admin marque comme lu**
   ```
   PUT /admin/messages/1/read
   ```

---

## 🔧 Troubleshooting

### Erreur 401 Unauthorized
**Problème** : Le token JWT est expiré ou invalide

**Solution** :
1. Exécutez **Login** à nouveau
2. Ou utilisez **Refresh Token**

### Erreur 404 Not Found
**Problème** : L'endpoint n'existe pas ou l'ID est incorrect

**Solution** :
1. Vérifiez l'URL
2. Vérifiez que l'ID existe dans la base de données

### Erreur 422 Validation Failed
**Problème** : Les données envoyées ne respectent pas les règles de validation

**Solution** :
1. Vérifiez les champs obligatoires
2. Vérifiez le format des données (dates, emails, etc.)
3. Regardez le message d'erreur pour plus de détails

**Exemple de réponse** :
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "email": ["The email field is required."],
        "password": ["The password must be at least 8 characters."]
    }
}
```

### Erreur 500 Internal Server Error
**Problème** : Erreur serveur

**Solution** :
1. Vérifiez les logs Laravel (`storage/logs/laravel.log`)
2. Vérifiez que la base de données est accessible
3. Vérifiez la configuration `.env`

### Base URL incorrecte
**Problème** : Cannot connect to API

**Solution** :
1. Vérifiez que Laravel tourne : `php artisan serve`
2. Vérifiez la variable `base_url` dans l'environnement Postman
3. Par défaut : `http://localhost:8000/api`

---

## 📝 Notes importantes

### Données de test
Pour avoir des données de test, vous pouvez :
1. Utiliser les seeders Laravel : `php artisan db:seed`
2. Créer manuellement via les endpoints de création

### Ordre des requêtes
Certaines requêtes dépendent d'autres :
- Les routes `/admin/*` nécessitent un token JWT
- Pour supprimer/modifier, l'élément doit exister
- Pour une réservation, le `vehicle_id` doit exister

### Variables dynamiques
Vous pouvez utiliser les variables Postman :
- `{{base_url}}` - URL de base
- `{{jwt_token}}` - Token d'authentification
- `{{$randomEmail}}` - Email aléatoire
- `{{$timestamp}}` - Timestamp actuel

### Export des résultats
Pour partager vos tests :
1. Click droit sur la collection
2. Export
3. Choisissez Collection v2.1

---

## 🎯 Checklist de test complète

### ✅ Authentication
- [ ] Register avec succès
- [ ] Login avec succès
- [ ] Login avec mauvais credentials (401)
- [ ] Get User Info
- [ ] Refresh Token
- [ ] Logout

### ✅ Vehicles (Public)
- [ ] Get All Vehicles
- [ ] Get Available Vehicles
- [ ] Get Featured Vehicles
- [ ] Get Vehicle by ID (existant)
- [ ] Get Vehicle by ID (inexistant - 404)

### ✅ Vehicles (Admin)
- [ ] Create Vehicle avec données valides
- [ ] Create Vehicle sans authentification (401)
- [ ] Create Vehicle avec données invalides (422)
- [ ] Update Vehicle
- [ ] Delete Vehicle
- [ ] Get Vehicle Stats

### ✅ Messages (Public)
- [ ] Contact Form avec données valides
- [ ] Contact Form avec données invalides (422)
- [ ] Reservation Form avec données valides
- [ ] Reservation Form avec vehicle_id inexistant
- [ ] Reservation Form avec dates invalides

### ✅ Messages (Admin)
- [ ] Get All Messages
- [ ] Get Message Statistics
- [ ] Get Unread Count
- [ ] Get Messages by Type (contact)
- [ ] Get Messages by Type (reservation)
- [ ] Get Message by ID
- [ ] Mark as Read
- [ ] Mark as Unread
- [ ] Delete Message

---

## 📞 Support

Pour toute question ou problème :
- Vérifiez d'abord ce guide
- Consultez la documentation Laravel
- Vérifiez les logs de l'application

**Bonne chance avec vos tests ! 🚀**
