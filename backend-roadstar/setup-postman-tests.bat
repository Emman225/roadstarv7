@echo off
REM ═══════════════════════════════════════════════════════════
REM Script de préparation pour les tests Postman
REM RoadStar API - Backend
REM ═══════════════════════════════════════════════════════════

echo.
echo ═══════════════════════════════════════════════════════════
echo  ROADSTAR API - PREPARATION DES TESTS POSTMAN
echo ═══════════════════════════════════════════════════════════
echo.

REM Vérifier si nous sommes dans le bon dossier
if not exist "artisan" (
    echo [ERREUR] Fichier 'artisan' introuvable !
    echo Assurez-vous d'etre dans le dossier backend-roadstar
    pause
    exit /b 1
)

echo [1/6] Verification de l'environnement...
echo.

REM Vérifier si .env existe
if not exist ".env" (
    echo [ATTENTION] Fichier .env introuvable !
    echo Copie de .env.example vers .env...
    copy .env.example .env
    echo.
    echo [INFO] Veuillez configurer votre .env avant de continuer !
    echo Appuyez sur une touche apres avoir configure .env...
    pause
)

echo [2/6] Nettoyage du cache...
php artisan cache:clear
php artisan config:clear
php artisan route:clear
echo [OK] Cache nettoye
echo.

echo [3/6] Verification de la cle JWT...
REM Vérifier si JWT_SECRET existe dans .env
findstr /C:"JWT_SECRET=" .env >nul
if errorlevel 1 (
    echo [INFO] Generation de la cle JWT...
    php artisan jwt:secret
) else (
    echo [OK] Cle JWT deja configuree
)
echo.

echo [4/6] Reset de la base de donnees...
echo [ATTENTION] Ceci va supprimer toutes les donnees existantes !
set /p confirm="Continuer ? (O/N) : "
if /i "%confirm%" NEQ "O" (
    echo Operation annulee.
    pause
    exit /b 0
)

php artisan migrate:fresh
if errorlevel 1 (
    echo [ERREUR] Echec des migrations !
    echo Verifiez votre configuration de base de donnees dans .env
    pause
    exit /b 1
)
echo [OK] Migrations executees avec succes
echo.

echo [5/6] Generation des donnees de test...
php artisan db:seed --class=TestDataSeeder
if errorlevel 1 (
    echo [ERREUR] Echec du seeding !
    pause
    exit /b 1
)
echo.

echo [6/6] Demarrage du serveur...
echo.
echo ═══════════════════════════════════════════════════════════
echo  PREPARATION TERMINEE AVEC SUCCES !
echo ═══════════════════════════════════════════════════════════
echo.
echo  Donnees de test generees :
echo  - 1 utilisateur admin
echo  - 10 vehicules
echo  - 4 messages de contact
echo  - 5 demandes de reservation
echo.
echo  Identifiants admin :
echo  Email    : admin@roadstar.com
echo  Password : password123
echo.
echo  URL de l'API : http://localhost:8000/api
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo Le serveur va demarrer maintenant...
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
pause

REM Démarrer le serveur
php artisan serve
