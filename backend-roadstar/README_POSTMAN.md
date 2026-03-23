# 🚗 RoadStar API - Guide de Test Complet

## 📦 Fichiers de la collection Postman

Ce dossier contient tous les fichiers nécessaires pour tester l'API RoadStar avec Postman :

### 📄 Fichiers disponibles

1. **`RoadStar_API.postman_collection.json`** 
   - Collection Postman complète avec tous les endpoints
   - 24 requêtes organisées en 5 catégories
   - Scripts automatiques pour la gestion du JWT

2. **`RoadStar_Environment.postman_environment.json`**
   - Variables d'environnement Postman
   - Configuration du base_url et jwt_token

3. **`POSTMAN_GUIDE.md`**
   - Guide détaillé d'utilisation
   - Documentation de tous les endpoints
   - Exemples de requêtes et réponses
   - Troubleshooting
   - Checklist de test complète

4. **`database/seeders/TestDataSeeder.php`**
   - Seeder Laravel pour générer des données de test
   - Crée un utilisateur admin
   - Génère 10 véhicules variés
   - Crée des messages de test

---

## 🚀 Démarrage rapide (Quick Start)

### Étape 1 : Préparer la base de données

```bash
# Se positionner dans le dossier backend
cd "d:\NEW DOC MANU 11102025\Site web ROADTSAR\APP\backend-roadstar"

# Exécuter les migrations
php artisan migrate

# Générer les données de test
php artisan db:seed --class=TestDataSeeder
```

### Étape 2 : Démarrer le serveur

```bash
php artisan serve
```

Le serveur démarrera sur `http://localhost:8000`

### Étape 3 : Importer dans Postman

1. Ouvrez Postman
2. Cliquez sur **Import**
3. Importez ces 2 fichiers :
   - `RoadStar_API.postman_collection.json`
   - `RoadStar_Environment.postman_environment.json`
4. Sélectionnez l'environnement **"RoadStar - Local Development"** (coin supérieur droit)

### Étape 4 : Premier test

1. Allez dans **Authentication** → **Login**
2. Exécutez la requête avec les identifiants :
   ```json
   {
       "email": "admin@roadstar.com",
       "password": "password123"
   }
   ```
3. Le token JWT sera automatiquement sauvegardé ✅
4. Vous pouvez maintenant tester toutes les routes admin !

---

## 📊 Structure de la collection

```
RoadStar API Collection
│
├── 🔐 Authentication (5 requêtes)
│   ├── Register
│   ├── Login (sauvegarde auto du JWT)
│   ├── Get User Info
│   ├── Refresh Token
│   └── Logout
│
├── 🚗 Vehicles (Public) (4 requêtes)
│   ├── Get All Vehicles
│   ├── Get Available Vehicles
│   ├── Get Featured Vehicles
│   └── Get Vehicle by ID
│
├── 🚗 Vehicles (Admin) (4 requêtes)
│   ├── Create Vehicle
│   ├── Update Vehicle
│   ├── Delete Vehicle
│   └── Get Vehicle Statistics
│
├── 💬 Messages (Public) (2 requêtes)
│   ├── Contact Form
│   └── Reservation Form
│
└── 💬 Messages (Admin) (9 requêtes)
    ├── Get All Messages
    ├── Get Message Statistics
    ├── Get Unread Count
    ├── Get Messages by Type - Contact
    ├── Get Messages by Type - Reservation
    ├── Get Message by ID
    ├── Mark Message as Read
    ├── Mark Message as Unread
    └── Delete Message
```

**Total : 24 endpoints testables**

---

## 🎯 Scénarios de test recommandés

### Scénario 1 : Test complet de l'authentification

```
1. Register (créer un nouveau compte)
2. Login (obtenir le token)
3. Get User Info (vérifier l'utilisateur)
4. Refresh Token (renouveler le token)
5. Logout (se déconnecter)
```

### Scénario 2 : Parcours client - Réservation

```
1. Get Featured Vehicles (voir les véhicules en vedette)
2. Get Vehicle by ID (details d'un véhicule)
3. Reservation Form (faire une demande de réservation)
```

### Scénario 3 : Parcours admin - Gestion de véhicules

```
1. Login (s'authentifier)
2. Get Vehicle Statistics (voir les stats)
3. Create Vehicle (ajouter un nouveau véhicule)
4. Get All Vehicles (vérifier la création)
5. Update Vehicle (modifier le véhicule)
6. Delete Vehicle (supprimer le véhicule)
```

### Scénario 4 : Parcours admin - Gestion des messages

```
1. Login (s'authentifier)
2. Get Unread Count (voir le nombre de non lus)
3. Get All Messages (voir tous les messages)
4. Get Message by ID (lire un message spécifique)
5. Mark as Read (marquer comme lu)
6. Get Messages by Type (filtrer par type)
7. Delete Message (supprimer un message)
```

---

## 📝 Données de test générées

Le seeder **TestDataSeeder** génère automatiquement :

### 👤 Utilisateur Admin
- **Email** : `admin@roadstar.com`
- **Password** : `password123`

### 🚗 Véhicules (10 au total)

| Marque | Modèle | Status | Featured | Prix/jour |
|--------|--------|--------|----------|-----------|
| Mercedes | Classe S | Available | ✅ | 250€ |
| Toyota | Land Cruiser | Available | ✅ | 200€ |
| BMW | Série 7 | Available | ✅ | 280€ |
| Audi | A6 | Available | ❌ | 180€ |
| Range Rover | Sport | **Rented** | ✅ | 300€ |
| Volkswagen | Tiguan | Available | ❌ | 120€ |
| Ford | Explorer | Available | ❌ | 190€ |
| Nissan | Patrol | **Maintenance** | ❌ | 210€ |
| Tesla | Model S | **Reserved** | ✅ | 320€ |
| Lexus | RX 450h | Available | ❌ | 240€ |

### 💬 Messages

- **4 messages de contact** (3 non lus)
- **5 demandes de réservation** (3 non lues)

---

## 🔑 Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `base_url` | URL de base de l'API | `http://localhost:8000/api` |
| `jwt_token` | Token JWT (auto-rempli) | _(vide au départ)_ |

---

## ✅ Checklist avant de commencer

- [ ] Laravel installé et configuré
- [ ] Base de données MySQL créée
- [ ] Fichier `.env` configuré
- [ ] Migrations exécutées (`php artisan migrate`)
- [ ] Données de test générées (`php artisan db:seed --class=TestDataSeeder`)
- [ ] Serveur Laravel démarré (`php artisan serve`)
- [ ] Postman installé
- [ ] Collection et environnement importés dans Postman
- [ ] Environnement "RoadStar - Local Development" sélectionné

---

## 📖 Documentation détaillée

Pour plus de détails, consultez le fichier **`POSTMAN_GUIDE.md`** qui contient :

- ✅ Instructions d'installation complètes
- ✅ Documentation de tous les endpoints
- ✅ Exemples de requêtes et réponses
- ✅ Guide de troubleshooting
- ✅ Checklist de test complète
- ✅ Scripts de test automatiques

---

## 🔧 Commandes utiles

### Base de données

```bash
# Reset complet de la base de données
php artisan migrate:fresh

# Reset et re-seeder
php artisan migrate:fresh --seed

# Seeder uniquement les données de test
php artisan db:seed --class=TestDataSeeder
```

### Serveur

```bash
# Démarrer le serveur (port par défaut 8000)
php artisan serve

# Démarrer sur un port spécifique
php artisan serve --port=8080

# Démarrer sur toutes les interfaces
php artisan serve --host=0.0.0.0
```

### JWT

```bash
# Générer la clé secrète JWT
php artisan jwt:secret
```

### Cache

```bash
# Vider le cache
php artisan cache:clear

# Vider le cache de configuration
php artisan config:clear

# Vider le cache de routes
php artisan route:clear
```

---

## 🐛 Troubleshooting rapide

### Le serveur ne démarre pas
```bash
# Vérifier les dépendances
composer install

# Vérifier le fichier .env
cp .env.example .env
php artisan key:generate
```

### Erreur 500 sur les routes
```bash
# Vérifier les logs
tail -f storage/logs/laravel.log
```

### Token JWT invalide
```bash
# Re-générer la clé JWT
php artisan jwt:secret
```

### Base de données inaccessible
```bash
# Vérifier la connexion dans .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=roadstar
DB_USERNAME=root
DB_PASSWORD=votre_password
```

---

## 📞 Support

### Documentation
- **Guide Postman** : `POSTMAN_GUIDE.md`
- **Documentation Laravel** : https://laravel.com/docs
- **Documentation JWT** : https://jwt-auth.readthedocs.io

### Logs
- **Laravel logs** : `storage/logs/laravel.log`
- **Postman console** : View → Show Postman Console

---

## 🎉 Prêt à tester !

Tout est configuré ! Vous pouvez maintenant :

1. ✅ Tester tous les endpoints de l'API
2. ✅ Vérifier l'authentification JWT
3. ✅ Tester les routes publiques
4. ✅ Tester les routes admin
5. ✅ Valider les règles de validation
6. ✅ Vérifier les réponses d'erreur

**Bon testing ! 🚀**

---

## 📊 Statistiques de la collection

- **Total endpoints** : 24
- **Routes publiques** : 10
- **Routes protégées** : 14
- **Méthodes HTTP** :
  - GET : 15
  - POST : 6
  - PUT : 2
  - DELETE : 2

---

*Dernière mise à jour : 31 Décembre 2025*
