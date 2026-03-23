# Frontend RoadStar - React Application

Frontend React pour le site de location de voitures RoadStar, connecté à l'API Laravel.

## 🚀 Fonctionnalités

### Partie Publique
- Visualisation de tous les véhicules depuis l'API
- Formulaire de contact connecté à l'API
- Formulaire de réservation connecté à l'API
- Design moderne avec animations

### Partie Admin (Protégée JWT)
- Authentification sécurisée avec JWT
- Dashboard avec statistiques
- CRUD complet des véhicules
- Gestion complète des messages (contact + réservations)
- Déconnexion sécurisée

## 📋 Prérequis

- Node.js >= 18
- npm ou yarn
- Backend Laravel en cours d'exécution (http://localhost:8000)

## ⚙️ Installation

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de l'environnement

Le fichier `.env` est déjà configuré avec :
```env
VITE_API_URL=http://localhost:8000/api
```

**Important** : Si votre backend Laravel tourne sur un autre port ou domaine, modifiez cette valeur.

### 3. Lancer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### 4. Build pour production
```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

## 🔐 Authentification

### Connexion Admin

**URL** : `/admin`

**Identifiants par défaut** (configurés dans le backend) :
- Email: `admin@roadstar225.com`
- Mot de passe: `admin123`

Le token JWT est automatiquement :
- Stocké dans `localStorage` sous la clé `jwt_token`
- Ajouté à chaque requête API via un intercepteur axios
- Supprimé à la déconnexion

## 📡 Intégration API

### Service API (`src/services/api.js`)

Toutes les requêtes passent par ce service centralisé qui :
- Ajoute automatiquement le token JWT aux requêtes protégées
- Gère les erreurs 401 (redirection vers login)
- Expose des méthodes pour chaque endpoint

#### Endpoints publics
```javascript
import { vehiclesAPI, messagesAPI } from './services/api';

// Véhicules
const vehicles = await vehiclesAPI.getAll();
const available = await vehiclesAPI.getAvailable();
const featured = await vehiclesAPI.getFeatured();

// Formulaires
await messagesAPI.sendContact(formData);
await messagesAPI.sendReservation(formData);
```

#### Endpoints Admin (JWT requis)
```javascript
import { vehiclesAdminAPI, messagesAdminAPI, authAPI } from './services/api';

// Auth
await authAPI.login({ email, password });
await authAPI.logout();

// Véhicules Admin
await vehiclesAdminAPI.create(vehicleData);
await vehiclesAdminAPI.update(id, vehicleData);
await vehiclesAdminAPI.delete(id);

// Messages Admin
const messages = await messagesAdminAPI.getAll();
await messagesAdminAPI.markAsRead(id);
await messagesAdminAPI.delete(id);
```

## 📂 Structure du Projet

```
src/
├── assets/          # Images et ressources
├── components/      # Composants réutilisables
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, VehicleCard
│   └── ui/          # Button, Seo, ReservationModal
├── context/         # DataContext (gestion état global)
├── layouts/         # PublicLayout, AdminLayout
├── pages/
│   ├── admin/       # Pages administration
│   └── public/      # Pages publiques
├── services/        # Service API axios
└── data/            # Données statiques (non utilisé avec API)
```

## 🔄 Workflow Complet

### 1. Navigation Publique
1. L'utilisateur visite `/` ou `/vehicules`
2. `DataContext` charge automatiquement les véhicules depuis l'API au montage
3. Les véhicules s'affichent en temps réel

### 2. Formulaire de Contact
1. L'utilisateur remplit le formulaire sur `/contact`
2. La soumission appelle `messagesAPI.sendContact()`
3. Le message est envoyé à l'API Laravel
4. Confirmation visuelle avec animation

### 3. Réservation de Véhicule
1. L'utilisateur clique sur "Réserver" sur une carte véhicule
2. Une modal s'ouvre avec le formulaire pré-rempli
3. La soumission appelle `messagesAPI.sendReservation()`
4. Le nom du véhicule est envoyé avec le message

### 4. Administration
1. L'admin se connecte sur `/admin`
2. JWT token stocké localement
3. `AdminLayout` charge les messages au montage avec `fetchMessages()`
4. Toutes les actions CRUD utilisent l'API
5. Les listes se rafraîchissent automatiquement après chaque action

## 🛠️ Technologies Utilisées

- **React 18** : Bibliothèque UI
- **React Router v7** : Navigation
- **Axios** : Client HTTP
- **Tailwind CSS** : Styling
- **Framer Motion** : Animations
- **SweetAlert2** : Notifications
- **Lucide React** : Icônes

## 🚨 Gestion des Erreurs

### Erreurs API
Toutes les erreurs API sont capturées et affichées via SweetAlert2 :
```javascript
try {
  await api.doSomething();
} catch (error) {
  Swal.fire({
    title: "Erreur!",
    text: error.response?.data?.message || "Une erreur est survenue",
    icon: "error"
  });
}
```

### Token Expiré
Si le token JWT expire, l'intercepteur axios :
1. Détecte l'erreur 401
2. Supprime le token
3. Redirige vers `/admin`

## 📝 Notes Importantes

### LocalStorage
Le frontend utilise localStorage pour :
- `jwt_token` : Token d'authentification
- `isAuthenticated` : Flag de connexion
- `user` : Infos utilisateur connecté

### CORS
Le backend doit avoir CORS activé pour accepter les requêtes depuis `http://localhost:5173` en développement.

### Images des Véhicules
Les URLs d'images sont stockées directement dans la base de données (Unsplash par défaut).

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Lint
npm run lint
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. Push sur GitHub
2. Connecter le repo sur Vercel
3. Variables d'environnement à configurer :
   ```
   VITE_API_URL=https://votre-api.com/api
   ```
4. Deploy automatique

Le fichier `vercel.json` est déjà configuré pour le routing SPA.

## 📄 Licence

Projet privé - RoadStar 2025
