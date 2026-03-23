@echo off
REM ═══════════════════════════════════════════════════════════
REM Script de création de la base de données Roadstar_DB
REM ═══════════════════════════════════════════════════════════

echo.
echo ═══════════════════════════════════════════════════════════
echo  CREATION DE LA BASE DE DONNEES ROADSTAR_DB
echo ═══════════════════════════════════════════════════════════
echo.

REM Demander les identifiants MySQL
set /p mysql_user="Nom d'utilisateur MySQL (defaut: root): "
if "%mysql_user%"=="" set mysql_user=root

set /p mysql_password="Mot de passe MySQL (laisser vide si pas de mot de passe): "

echo.
echo [1/3] Creation de la base de donnees Roadstar_DB...
echo.

REM Créer un fichier SQL temporaire
echo CREATE DATABASE IF NOT EXISTS Roadstar_DB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; > create_db.sql
echo SHOW DATABASES LIKE 'Roadstar_DB'; >> create_db.sql

REM Exécuter le script SQL
if "%mysql_password%"=="" (
    mysql -u %mysql_user% < create_db.sql
) else (
    mysql -u %mysql_user% -p%mysql_password% < create_db.sql
)

if errorlevel 1 (
    echo [ERREUR] Impossible de creer la base de donnees !
    echo Verifiez vos identifiants MySQL et que MySQL est demarre.
    del create_db.sql
    pause
    exit /b 1
)

REM Nettoyer le fichier temporaire
del create_db.sql

echo [OK] Base de donnees Roadstar_DB creee avec succes !
echo.

echo [2/3] Test de la connexion Laravel...
php artisan config:clear
php artisan db:show

if errorlevel 1 (
    echo [ERREUR] Laravel ne peut pas se connecter a la base de donnees !
    echo Verifiez votre fichier .env
    pause
    exit /b 1
)

echo [OK] Connexion reussie !
echo.

echo [3/3] Execution des migrations...
php artisan migrate:fresh

if errorlevel 1 (
    echo [ERREUR] Echec des migrations !
    pause
    exit /b 1
)

echo [OK] Migrations executees avec succes !
echo.

echo ═══════════════════════════════════════════════════════════
echo  BASE DE DONNEES CONFIGUREE AVEC SUCCES !
echo ═══════════════════════════════════════════════════════════
echo.
echo  Base de donnees : Roadstar_DB
echo  Utilisateur     : %mysql_user%
echo  Statut          : Prete a l'emploi
echo.
echo  Prochaines etapes :
echo  1. Generer les donnees de test : php artisan db:seed --class=TestDataSeeder
echo  2. Demarrer le serveur         : php artisan serve
echo  3. Tester avec Postman
echo.
echo ═══════════════════════════════════════════════════════════
echo.
pause
