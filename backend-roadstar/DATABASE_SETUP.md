# 🗄️ Configuration de la base de données MySQL - Roadstar_DB

## 📋 Configuration requise

### Nom de la base de données
**Roadstar_DB**

---

## ⚙️ Étape 1 : Modifier le fichier .env

Ouvrez le fichier `.env` et modifiez la section **Configuration MySQL** (lignes 20-26) :

```env
# Configuration MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=Roadstar_DB
DB_USERNAME=root
DB_PASSWORD=
```

### 🔧 Paramètres à ajuster selon votre configuration

| Paramètre | Valeur par défaut | Description | À modifier ? |
|-----------|-------------------|-------------|--------------|
| `DB_CONNECTION` | `mysql` | Type de base de données | ❌ Non |
| `DB_HOST` | `127.0.0.1` | Adresse du serveur MySQL | ⚠️ Si MySQL distant |
| `DB_PORT` | `3306` | Port MySQL | ⚠️ Si port différent |
| `DB_DATABASE` | **`Roadstar_DB`** | Nom de la base de données | ✅ **Déjà configuré** |
| `DB_USERNAME` | `root` | Nom d'utilisateur MySQL | ⚠️ Selon votre config |
| `DB_PASSWORD` | _(vide)_ | Mot de passe MySQL | ⚠️ Selon votre config |

---

## 🗃️ Étape 2 : Créer la base de données

Vous avez **3 options** pour créer la base de données :

### Option A : Via MySQL Command Line (Recommandé)

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE Roadstar_DB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Vérifier la création
SHOW DATABASES LIKE 'Roadstar_DB';

# Quitter MySQL
EXIT;
```

### Option B : Via phpMyAdmin

1. Ouvrir phpMyAdmin (généralement `http://localhost/phpmyadmin`)
2. Cliquer sur **"Nouvelle base de données"**
3. Nom : **`Roadstar_DB`**
4. Interclassement : **`utf8mb4_unicode_ci`**
5. Cliquer sur **"Créer"**

### Option C : Via un client MySQL (MySQL Workbench, HeidiSQL, etc.)

1. Ouvrir votre client MySQL
2. Créer une nouvelle base de données
3. Nom : **`Roadstar_DB`**
4. Charset : **`utf8mb4`**
5. Collation : **`utf8mb4_unicode_ci`**

---

## ✅ Étape 3 : Tester la connexion

### Test rapide :

```bash
php artisan migrate:status
```

Si la connexion fonctionne, vous verrez un message indiquant qu'aucune migration n'a été exécutée.

Si vous voyez une erreur, vérifiez :
- ✅ Le serveur MySQL est démarré
- ✅ Les identifiants (username/password) sont corrects
- ✅ La base de données `Roadstar_DB` existe
- ✅ L'utilisateur a les permissions sur cette base de données

---

## 🚀 Étape 4 : Exécuter les migrations

Une fois la connexion établie :

```bash
# Exécuter toutes les migrations
php artisan migrate

# Si vous avez déjà des tables et voulez tout réinitialiser
php artisan migrate:fresh

# Avec les données de test
php artisan migrate:fresh --seed
```

---

## 🌱 Étape 5 : Générer les données de test

```bash
# Générer uniquement les données de test (sans reset)
php artisan db:seed --class=TestDataSeeder

# OU utiliser le script automatique complet
setup-postman-tests.bat
```

---

## 🔍 Vérification complète

### Commandes de vérification :

```bash
# 1. Tester la connexion
php artisan db:show

# 2. Voir l'état des migrations
php artisan migrate:status

# 3. Voir les tables créées
php artisan tinker
>>> DB::select('SHOW TABLES');
>>> exit

# 4. Compter les enregistrements
php artisan tinker
>>> \App\Models\User::count();
>>> \App\Models\Vehicle::count();
>>> \App\Models\Message::count();
>>> exit
```

### Résultats attendus après le seeding :

- **Users** : 1 admin
- **Vehicles** : 10 véhicules
- **Messages** : 9 messages (4 contacts + 5 réservations)

---

## 🐛 Troubleshooting

### Erreur : "SQLSTATE[HY000] [1049] Unknown database 'Roadstar_DB'"

**Cause** : La base de données n'existe pas

**Solution** :
```sql
CREATE DATABASE Roadstar_DB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### Erreur : "SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost'"

**Cause** : Mot de passe incorrect ou utilisateur n'existe pas

**Solutions** :
1. Vérifier le mot de passe dans `.env`
2. Si pas de mot de passe : `DB_PASSWORD=` (laisser vide)
3. Si mot de passe : `DB_PASSWORD=votre_mot_de_passe`

---

### Erreur : "SQLSTATE[HY000] [2002] No connection could be made"

**Cause** : MySQL n'est pas démarré ou mauvais host/port

**Solutions** :
1. Démarrer MySQL : `net start mysql` (Windows) ou via XAMPP/WAMP
2. Vérifier le port dans `.env` (généralement 3306)
3. Si vous utilisez `localhost`, essayez `127.0.0.1` ou vice-versa

---

### Erreur : "Specified key was too long"

**Cause** : Problème d'encodage avec les anciennes versions de MySQL

**Solution** : Ajouter dans `app/Providers/AppServiceProvider.php` :

```php
use Illuminate\Support\Facades\Schema;

public function boot()
{
    Schema::defaultStringLength(191);
}
```

---

## 📊 Structure de la base de données

Après les migrations, votre base de données `Roadstar_DB` contiendra :

### Tables principales :

1. **users** - Utilisateurs (admins)
2. **vehicles** - Véhicules
3. **messages** - Messages (contact + réservations)

### Tables système Laravel :

4. **migrations** - Historique des migrations
5. **sessions** - Sessions utilisateurs
6. **cache** - Cache de l'application
7. **jobs** - Files d'attente
8. **failed_jobs** - Jobs échoués
9. **password_reset_tokens** - Tokens de reset mot de passe

---

## 🔐 Permissions MySQL recommandées

Si vous créez un utilisateur dédié (recommandé pour la production) :

```sql
-- Créer un utilisateur dédié
CREATE USER 'roadstar_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe_securise';

-- Donner tous les privilèges sur la base Roadstar_DB
GRANT ALL PRIVILEGES ON Roadstar_DB.* TO 'roadstar_user'@'localhost';

-- Appliquer les changements
FLUSH PRIVILEGES;
```

Puis dans `.env` :
```env
DB_USERNAME=roadstar_user
DB_PASSWORD=votre_mot_de_passe_securise
```

---

## ✅ Checklist de configuration

- [ ] MySQL installé et démarré
- [ ] Base de données `Roadstar_DB` créée
- [ ] Fichier `.env` configuré avec les bons paramètres
- [ ] Connexion testée avec `php artisan db:show`
- [ ] Migrations exécutées avec `php artisan migrate`
- [ ] Données de test générées avec `php artisan db:seed --class=TestDataSeeder`
- [ ] Vérification : au moins 1 utilisateur, 10 véhicules, 9 messages

---

## 🎯 Configuration finale dans .env

Voici la configuration complète à utiliser :

```env
# Configuration MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=Roadstar_DB
DB_USERNAME=root
DB_PASSWORD=

# Si vous avez un mot de passe MySQL :
# DB_PASSWORD=votre_mot_de_passe

# Si vous utilisez XAMPP/WAMP avec port différent :
# DB_PORT=3307

# Si MySQL est sur un autre serveur :
# DB_HOST=192.168.1.XX
```

---

## 🚀 Script de configuration automatique

Pour automatiser la configuration, vous pouvez exécuter :

```bash
# Nettoyer le cache de configuration
php artisan config:clear

# Tester la connexion
php artisan db:show

# Créer les tables
php artisan migrate:fresh

# Générer les données de test
php artisan db:seed --class=TestDataSeeder

# Démarrer le serveur
php artisan serve
```

---

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifier les logs Laravel : `storage/logs/laravel.log`
2. Vérifier les erreurs MySQL
3. Tester la connexion manuellement avec `mysql -u root -p`

---

**Base de données configurée avec succès ! 🎉**

*Dernière mise à jour : 1er Janvier 2026*
