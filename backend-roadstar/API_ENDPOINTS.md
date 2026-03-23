# 📋 RoadStar API - Liste complète des endpoints

## Vue d'ensemble

**Base URL** : `http://localhost:8000/api`

**Total endpoints** : 24

---

## 🔐 Authentication (5 endpoints)

| # | Méthode | Endpoint | Auth | Description |
|---|---------|----------|------|-------------|
| 1 | POST | `/auth/register` | ❌ | Créer un nouveau compte |
| 2 | POST | `/auth/login` | ❌ | Se connecter (obtenir JWT) |
| 3 | GET | `/auth/me` | ✅ | Infos utilisateur connecté |
| 4 | POST | `/auth/refresh` | ✅ | Rafraîchir le token JWT |
| 5 | POST | `/auth/logout` | ✅ | Se déconnecter |

### Exemples de requêtes

#### POST /auth/register
```json
{
    "name": "Test User",
    "email": "test@roadstar.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

#### POST /auth/login
```json
{
    "email": "admin@roadstar.com",
    "password": "password123"
}
```

---

## 🚗 Vehicles - Public (4 endpoints)

| # | Méthode | Endpoint | Auth | Description |
|---|---------|----------|------|-------------|
| 6 | GET | `/vehicles` | ❌ | Liste de tous les véhicules |
| 7 | GET | `/vehicles/available` | ❌ | Véhicules disponibles uniquement |
| 8 | GET | `/vehicles/featured` | ❌ | Véhicules en vedette |
| 9 | GET | `/vehicles/{id}` | ❌ | Détails d'un véhicule |

### Filtres de status disponibles

- **available** : Véhicule disponible à la location
- **rented** : Véhicule actuellement loué
- **maintenance** : Véhicule en maintenance
- **reserved** : Véhicule réservé

---

## 🚗 Vehicles - Admin (4 endpoints)

| # | Méthode | Endpoint | Auth | Description |
|---|---------|----------|------|-------------|
| 10 | POST | `/admin/vehicles` | ✅ | Créer un véhicule |
| 11 | PUT | `/admin/vehicles/{id}` | ✅ | Modifier un véhicule |
| 12 | DELETE | `/admin/vehicles/{id}` | ✅ | Supprimer un véhicule |
| 13 | GET | `/admin/vehicles/stats` | ✅ | Statistiques des véhicules |

### Exemple : POST /admin/vehicles
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

### Champs obligatoires
- ✅ `brand` (string)
- ✅ `model` (string)
- ✅ `year` (integer, format: YYYY)
- ✅ `license_plate` (string, unique)
- ✅ `daily_rate` (decimal)
- ✅ `status` (enum: available|rented|maintenance|reserved)

### Champs optionnels
- `color` (string)
- `mileage` (integer)
- `fuel_type` (string: Essence|Diesel|Électrique|Hybride)
- `transmission` (string: Manuelle|Automatique)
- `seats` (integer)
- `is_featured` (boolean, default: false)
- `description` (text)
- `features` (array of strings)

---

## 💬 Messages - Public (2 endpoints)

| # | Méthode | Endpoint | Auth | Description |
|---|---------|----------|------|-------------|
| 14 | POST | `/messages/contact` | ❌ | Formulaire de contact |
| 15 | POST | `/messages/reservation` | ❌ | Demande de réservation |

### Exemple : POST /messages/contact
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

### Exemple : POST /messages/reservation
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

## 💬 Messages - Admin (9 endpoints)

| # | Méthode | Endpoint | Auth | Description |
|---|---------|----------|------|-------------|
| 16 | GET | `/admin/messages` | ✅ | Liste de tous les messages |
| 17 | GET | `/admin/messages/stats` | ✅ | Statistiques des messages |
| 18 | GET | `/admin/messages/unread-count` | ✅ | Nombre de messages non lus |
| 19 | GET | `/admin/messages/type/contact` | ✅ | Messages de type contact |
| 20 | GET | `/admin/messages/type/reservation` | ✅ | Messages de type reservation |
| 21 | GET | `/admin/messages/{id}` | ✅ | Détails d'un message |
| 22 | PUT | `/admin/messages/{id}/read` | ✅ | Marquer comme lu |
| 23 | PUT | `/admin/messages/{id}/unread` | ✅ | Marquer comme non lu |
| 24 | DELETE | `/admin/messages/{id}` | ✅ | Supprimer un message |

### Types de messages

- **contact** : Message du formulaire de contact
- **reservation** : Demande de réservation de véhicule

---

## 📊 Réponses standard

### ✅ Succès (200 OK)
```json
{
    "success": true,
    "data": { ... },
    "message": "Operation successful"
}
```

### ✅ Créé (201 Created)
```json
{
    "success": true,
    "data": { ... },
    "message": "Resource created successfully"
}
```

### ❌ Erreur de validation (422 Unprocessable Entity)
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "email": ["The email field is required."],
        "password": ["The password must be at least 8 characters."]
    }
}
```

### ❌ Non autorisé (401 Unauthorized)
```json
{
    "message": "Unauthenticated."
}
```

### ❌ Non trouvé (404 Not Found)
```json
{
    "success": false,
    "message": "Resource not found"
}
```

### ❌ Erreur serveur (500 Internal Server Error)
```json
{
    "message": "Server Error",
    "error": "Error details..."
}
```

---

## 🔑 Authentification JWT

### Headers requis pour les routes protégées
```
Authorization: Bearer {jwt_token}
```

### Flux d'authentification
```
1. POST /auth/login
   → Récupérer access_token

2. Utiliser le token dans les requêtes suivantes
   → Header: Authorization: Bearer {access_token}

3. Token expire après 60 minutes
   → POST /auth/refresh pour renouveler

4. POST /auth/logout
   → Invalider le token
```

---

## 📈 Statistiques des endpoints

### Par méthode HTTP
- **GET** : 15 endpoints (62.5%)
- **POST** : 6 endpoints (25%)
- **PUT** : 2 endpoints (8.3%)
- **DELETE** : 2 endpoints (4.2%)

### Par type d'accès
- **Routes publiques** : 11 endpoints (45.8%)
- **Routes protégées** : 13 endpoints (54.2%)

### Par ressource
- **Authentication** : 5 endpoints (20.8%)
- **Vehicles** : 8 endpoints (33.3%)
- **Messages** : 11 endpoints (45.8%)

---

## 🎯 Parcours de test recommandés

### Test basique (5 min)
```
1. GET /vehicles → Voir les véhicules
2. POST /auth/login → Se connecter
3. GET /auth/me → Vérifier l'utilisateur
4. GET /admin/vehicles/stats → Voir les stats
5. POST /auth/logout → Se déconnecter
```

### Test complet public (10 min)
```
1. GET /vehicles → Tous les véhicules
2. GET /vehicles/available → Véhicules disponibles
3. GET /vehicles/featured → Véhicules vedettes
4. GET /vehicles/1 → Détails véhicule
5. POST /messages/contact → Envoyer message
6. POST /messages/reservation → Faire réservation
```

### Test complet admin (15 min)
```
1. POST /auth/login → Connexion
2. GET /admin/vehicles/stats → Stats véhicules
3. POST /admin/vehicles → Créer véhicule
4. PUT /admin/vehicles/1 → Modifier véhicule
5. GET /admin/messages/unread-count → Messages non lus
6. GET /admin/messages → Tous les messages
7. PUT /admin/messages/1/read → Marquer lu
8. DELETE /admin/messages/1 → Supprimer message
9. DELETE /admin/vehicles/1 → Supprimer véhicule
10. POST /auth/logout → Déconnexion
```

---

## 🔧 Variables d'environnement Postman

```
base_url = http://localhost:8000/api
jwt_token = (auto-rempli après login)
```

---

## 📝 Notes importantes

### Ordre des opérations
- **Toujours se connecter avant** d'utiliser les routes `/admin/*`
- Le **token JWT est sauvegardé automatiquement** après login
- Les **IDs doivent exister** dans la base de données pour les opérations UPDATE/DELETE

### Données de test disponibles
Après avoir exécuté `TestDataSeeder` :
- ✅ 1 admin (admin@roadstar.com / password123)
- ✅ 10 véhicules variés
- ✅ 4 messages de contact
- ✅ 5 demandes de réservation

### Règles de validation importantes
- **Email** : Format valide requis
- **Password** : Minimum 8 caractères pour register
- **Dates** : Format YYYY-MM-DD
- **License plate** : Doit être unique
- **Daily rate** : Doit être un nombre positif

---

*Dernière mise à jour : 31 Décembre 2025*
