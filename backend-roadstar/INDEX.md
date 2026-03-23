# 🗂️ Documentation Postman - Index Principal

Bienvenue dans la documentation complète de la collection Postman pour l'API RoadStar !

---

## 📑 Navigation rapide

Choisissez le document approprié selon vos besoins :

### 🚀 Je veux commencer rapidement
→ **[QUICK_START.md](QUICK_START.md)**
- Résumé visuel de tout ce qui est disponible
- Instructions en 3 étapes
- Checklist de démarrage
- **Temps de lecture : 2-3 minutes**

### 📖 Je veux un guide complet étape par étape
→ **[README_POSTMAN.md](README_POSTMAN.md)**
- Guide de démarrage détaillé
- Scénarios de test recommandés
- Commandes utiles
- FAQ et troubleshooting
- **Temps de lecture : 10-15 minutes**

### 📚 Je veux la documentation complète
→ **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)**
- Documentation exhaustive
- Détails de tous les endpoints
- Exemples de requêtes/réponses
- Scripts de test
- Troubleshooting approfondi
- **Temps de lecture : 30-40 minutes**

### 📋 Je cherche un endpoint spécifique
→ **[API_ENDPOINTS.md](API_ENDPOINTS.md)**
- Liste complète des 24 endpoints
- Tableaux de référence rapide
- Paramètres et réponses
- Règles de validation
- **Format : Référence rapide**

### 📄 Je veux une carte de référence imprimable
→ **[REFERENCE_CARD.txt](REFERENCE_CARD.txt)**
- Format texte ASCII
- Tous les endpoints en un coup d'œil
- Données de test
- Checklist
- **Format : 1 page imprimable**

---

## 📦 Fichiers de la collection

| Fichier | Type | Description |
|---------|------|-------------|
| `RoadStar_API.postman_collection.json` | Collection | 24 endpoints organisés en 5 catégories |
| `RoadStar_Environment.postman_environment.json` | Environnement | Variables base_url et jwt_token |

---

## 🛠️ Scripts d'installation

| Script | Plateforme | Description |
|--------|------------|-------------|
| `setup-postman-tests.bat` | Windows CMD | Installation et démarrage automatiques |
| `setup-postman-tests.ps1` | PowerShell | Version PowerShell avec couleurs |

---

## 💾 Données de test

| Fichier | Description |
|---------|-------------|
| `database/seeders/TestDataSeeder.php` | Seeder Laravel pour générer les données de test |

**Données générées** :
- 1 compte admin (admin@roadstar.com / password123)
- 10 véhicules variés avec différents statuts
- 4 messages de contact
- 5 demandes de réservation

---

## 🎯 Guide selon votre profil

### 👨‍💻 Développeur Backend
1. Lisez **[README_POSTMAN.md](README_POSTMAN.md)** pour comprendre la structure
2. Exécutez `setup-postman-tests.bat`
3. Consultez **[API_ENDPOINTS.md](API_ENDPOINTS.md)** pour la référence
4. Gardez **[REFERENCE_CARD.txt](REFERENCE_CARD.txt)** ouvert pendant le développement

### 🧪 Testeur QA
1. Commencez par **[QUICK_START.md](QUICK_START.md)**
2. Suivez les scénarios de test dans **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)**
3. Utilisez la checklist complète pour valider tous les endpoints
4. Référez-vous à **[API_ENDPOINTS.md](API_ENDPOINTS.md)** pour les validations

### 📱 Développeur Frontend
1. Lisez **[API_ENDPOINTS.md](API_ENDPOINTS.md)** pour connaître les endpoints
2. Consultez les exemples de requêtes/réponses dans **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)**
3. Utilisez **[REFERENCE_CARD.txt](REFERENCE_CARD.txt)** comme référence rapide
4. Testez l'intégration avec la collection Postman

### 👔 Chef de projet
1. Lisez **[QUICK_START.md](QUICK_START.md)** pour une vue d'ensemble
2. Parcourez **[README_POSTMAN.md](README_POSTMAN.md)** pour comprendre les capacités
3. Référez-vous aux statistiques dans **[API_ENDPOINTS.md](API_ENDPOINTS.md)**

---

## 📊 Résumé de l'API

### Endpoints par catégorie

| Catégorie | Nombre | Public | Protégé |
|-----------|--------|--------|---------|
| Authentication | 5 | 2 | 3 |
| Vehicles | 8 | 4 | 4 |
| Messages | 11 | 2 | 9 |
| **TOTAL** | **24** | **8** | **16** |

### Méthodes HTTP

- **GET** : 15 endpoints (62.5%)
- **POST** : 6 endpoints (25%)
- **PUT** : 2 endpoints (8.3%)
- **DELETE** : 2 endpoints (4.2%)

---

## 🎓 Parcours d'apprentissage recommandé

### Niveau 1 : Débutant (30 min)
1. ✅ Lire **[QUICK_START.md](QUICK_START.md)**
2. ✅ Importer la collection dans Postman
3. ✅ Exécuter le script `setup-postman-tests.bat`
4. ✅ Tester le endpoint **Login**
5. ✅ Tester 2-3 endpoints publics

### Niveau 2 : Intermédiaire (1h)
1. ✅ Lire **[README_POSTMAN.md](README_POSTMAN.md)**
2. ✅ Comprendre le flux d'authentification JWT
3. ✅ Tester tous les endpoints publics
4. ✅ Tester tous les endpoints admin
5. ✅ Créer/modifier/supprimer un véhicule

### Niveau 3 : Avancé (2h)
1. ✅ Lire **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** en entier
2. ✅ Tester tous les scénarios de test complets
3. ✅ Valider toutes les règles de validation
4. ✅ Tester les cas d'erreur (401, 404, 422, 500)
5. ✅ Comprendre et modifier les scripts de test automatiques

---

## 🔍 Recherche rapide

### Je cherche...

**...comment installer la collection**
→ [README_POSTMAN.md - Installation](README_POSTMAN.md#installation)

**...les identifiants de test**
→ [QUICK_START.md - Données de test](QUICK_START.md#données-de-test-générées)

**...un endpoint spécifique**
→ [API_ENDPOINTS.md](API_ENDPOINTS.md)

**...comment gérer le JWT**
→ [POSTMAN_GUIDE.md - Gestion du JWT Token](POSTMAN_GUIDE.md#gestion-du-jwt-token)

**...comment créer un véhicule**
→ [API_ENDPOINTS.md - POST /admin/vehicles](API_ENDPOINTS.md#post-adminvehicles)

**...comment envoyer une réservation**
→ [API_ENDPOINTS.md - POST /messages/reservation](API_ENDPOINTS.md#post-messagesreservation)

**...les codes d'erreur**
→ [POSTMAN_GUIDE.md - Troubleshooting](POSTMAN_GUIDE.md#troubleshooting)

**...les scénarios de test**
→ [README_POSTMAN.md - Ordre de test recommandé](README_POSTMAN.md#ordre-de-test-recommandé)

---

## ✅ Checklist générale

### Installation
- [ ] Laravel configuré et fonctionnel
- [ ] Base de données MySQL créée
- [ ] Fichier `.env` configuré
- [ ] Migrations exécutées
- [ ] Données de test générées via TestDataSeeder
- [ ] Serveur Laravel démarré (`php artisan serve`)

### Postman
- [ ] Postman installé
- [ ] Collection `RoadStar_API.postman_collection.json` importée
- [ ] Environnement `RoadStar_Environment.postman_environment.json` importé
- [ ] Environnement "RoadStar - Local Development" sélectionné
- [ ] Variable `base_url` configurée correctement

### Tests
- [ ] Endpoint **Login** testé avec succès
- [ ] Token JWT sauvegardé automatiquement
- [ ] Au moins 1 endpoint public testé
- [ ] Au moins 1 endpoint admin testé
- [ ] Compréhension du flux d'authentification

---

## 🆘 Support et aide

### Problèmes courants

**"401 Unauthorized"**
→ [POSTMAN_GUIDE.md - Erreur 401](POSTMAN_GUIDE.md#erreur-401-unauthorized)

**"Cannot connect to API"**
→ Vérifier que `php artisan serve` est actif

**"Validation failed"**
→ [API_ENDPOINTS.md - Règles de validation](API_ENDPOINTS.md#règles-de-validation-importantes)

**"Token expired"**
→ Utiliser l'endpoint **Refresh Token** ou re-login

### Logs et debugging
- **Laravel logs** : `storage/logs/laravel.log`
- **Postman console** : View → Show Postman Console
- **Variables d'environnement** : Icône 👁️ en haut à droite de Postman

---

## 🎉 Prêt à commencer !

Vous avez maintenant accès à :
- ✅ Une collection Postman complète de 24 endpoints
- ✅ Des données de test réalistes
- ✅ Une documentation exhaustive
- ✅ Des scripts d'installation automatiques
- ✅ Des guides pour tous les niveaux

**Choisissez votre document et commencez à tester l'API RoadStar ! 🚀**

---

## 📞 Ressources supplémentaires

- [Documentation Laravel](https://laravel.com/docs)
- [Documentation JWT Auth](https://jwt-auth.readthedocs.io)
- [Documentation Postman](https://learning.postman.com/docs)

---

*Dernière mise à jour : 31 Décembre 2025*  
*Version : 1.0.0*  
*Organisation : RoadStar Development Team*
