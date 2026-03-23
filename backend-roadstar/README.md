# Backend RoadStar - API Laravel

Backend API Laravel pour le site de location de voitures RoadStar.

## 🚀 Fonctionnalités

### API Publique
- **Véhicules** : Liste, détails, disponibilité, véhicules en vedette
- **Formulaire de contact** : Envoi de messages
- **Formulaire de réservation** : Demandes de réservation

### API Admin (Protégée par JWT)
- **Authentification** : Login/Logout avec JWT
- **CRUD Véhicules** : Création, modification, suppression
- **Gestion Messages** : Consultation, marquage lu/non lu, suppression
- **Statistiques** : Dashboard avec stats véhicules et messages

## 📋 Prérequis

- PHP >= 8.2
- Composer
- MySQL
- Node.js & npm (pour assets si nécessaire)

## ⚙️ Installation

### 1. Installation des dépendances
```bash
composer install
```

### 2. Configuration de l'environnement
```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos paramètres MySQL :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=roadstar_db
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

### 3. Générer la clé d'application
```bash
php artisan key:generate
```

### 4. Créer la base de données
Créez manuellement la base de données MySQL :
```sql
CREATE DATABASE roadstar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Exécuter les migrations
```bash
php artisan migrate
```

### 6. Créer l'utilisateur admin par défaut
```bash
php artisan db:seed
```

**Identifiants admin par défaut :**
- Email: `admin@roadstar225.com`
- Mot de passe: `admin123`

### 7. Lancer le serveur
```bash
php artisan serve
```

L'API sera accessible sur `http://localhost:8000`

## 📡 Documentation API

### Endpoints Publics

#### Véhicules
- `GET /api/vehicles` - Liste tous les véhicules
- `GET /api/vehicles/available` - Véhicules disponibles uniquement
- `GET /api/vehicles/featured` - Véhicules en vedette
- `GET /api/vehicles/{id}` - Détails d'un véhicule

#### Formulaires
- `POST /api/messages/contact` - Envoyer un message de contact
- `POST /api/messages/reservation` - Envoyer une demande de réservation

### Endpoints Protégés (Admin - JWT requis)

#### Authentification
- `POST /api/auth/login` - Connexion (retourne le JWT)
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Rafraîchir le token
- `GET /api/auth/me` - Infos utilisateur connecté

#### Véhicules Admin
- `POST /api/admin/vehicles` - Créer un véhicule
- `PUT /api/admin/vehicles/{id}` - Modifier un véhicule
- `DELETE /api/admin/vehicles/{id}` - Supprimer un véhicule
- `GET /api/admin/vehicles/stats` - Statistiques véhicules

#### Messages Admin
- `GET /api/admin/messages` - Liste tous les messages
- `GET /api/admin/messages/{id}` - Détails d'un message
- `GET /api/admin/messages/stats` - Statistiques messages
- `GET /api/admin/messages/unread-count` - Nombre de non lus
- `GET /api/admin/messages/type/{type}` - Messages par type (contact/reservation)
- `PUT /api/admin/messages/{id}/read` - Marquer comme lu
- `PUT /api/admin/messages/{id}/unread` - Marquer comme non lu
- `DELETE /api/admin/messages/{id}` - Supprimer un message

## 🔐 Authentification JWT

Pour accéder aux endpoints admin, incluez le token JWT dans l'en-tête :
```
Authorization: Bearer {votre_token_jwt}
```

### Exemple de connexion
```javascript
// Request
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@roadstar225.com",
  "password": "admin123"
}

// Response
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbG...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "name": "Admin RoadStar",
    "email": "admin@roadstar225.com"
  }
}
```

## 📊 Structure Base de Données

### Table `users`
- Utilisateurs administrateurs
- Authentification JWT

### Table `vehicles`
- Informations des véhicules
- Champs : name, type, price, image, passengers, transmission, fuel, featured, available

### Table `messages`
- Messages de contact et demandes de réservation
- Champs : nom, prenom, email, telephone, sujet, message, status, type, vehicle_name

## 🛠️ Configuration Frontend

Pour connecter votre frontend React :

1. URL de base : `http://localhost:8000/api`
2. CORS est déjà configuré pour accepter toutes les origines en développement
3. En production, mettez à jour `config/cors.php` avec votre domaine frontend

## 📝 Notes Importantes

- Le token JWT expire après 60 minutes (configurable dans `.env`)
- Les images des véhicules sont stockées comme URLs pour l'instant
- Pour changer le mot de passe admin, créez un nouveau seeder ou utilisez tinker

## 🔧 Commandes Utiles

```bash
# Réinitialiser la base de données
php artisan migrate:fresh --seed

# Effacer le cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Lister toutes les routes
php artisan route:list

# Accéder au REPL Laravel
php artisan tinker
```

## 📦 Packages Installés

- `laravel/framework` : Framework Laravel 11
- `tymon/jwt-auth` : Authentification JWT
- Autres packages Laravel standards

## 🚀 Déploiement

En production :
1. Configurez vos variables d'environnement
2. Exécutez les migrations
3. Optimisez les fichiers de configuration
4. Configurez CORS avec votre domaine frontend

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📄 Licence

Projet privé - RoadStar 2025
