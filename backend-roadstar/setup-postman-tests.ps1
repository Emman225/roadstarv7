# ═══════════════════════════════════════════════════════════
# Script de préparation pour les tests Postman (PowerShell)
# RoadStar API - Backend
# ═══════════════════════════════════════════════════════════

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host " ROADSTAR API - PREPARATION DES TESTS POSTMAN" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Vérifier si nous sommes dans le bon dossier
if (-not (Test-Path "artisan")) {
    Write-Host "[ERREUR] Fichier 'artisan' introuvable !" -ForegroundColor Red
    Write-Host "Assurez-vous d'être dans le dossier backend-roadstar" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "[1/6] Vérification de l'environnement..." -ForegroundColor Green
Write-Host ""

# Vérifier si .env existe
if (-not (Test-Path ".env")) {
    Write-Host "[ATTENTION] Fichier .env introuvable !" -ForegroundColor Yellow
    Write-Host "Copie de .env.example vers .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ""
    Write-Host "[INFO] Veuillez configurer votre .env avant de continuer !" -ForegroundColor Cyan
    Read-Host "Appuyez sur Entrée après avoir configuré .env"
}

Write-Host "[2/6] Nettoyage du cache..." -ForegroundColor Green
php artisan cache:clear | Out-Null
php artisan config:clear | Out-Null
php artisan route:clear | Out-Null
Write-Host "[OK] Cache nettoyé" -ForegroundColor Green
Write-Host ""

Write-Host "[3/6] Vérification de la clé JWT..." -ForegroundColor Green
# Vérifier si JWT_SECRET existe dans .env
$jwtExists = Select-String -Path ".env" -Pattern "JWT_SECRET=" -Quiet
if (-not $jwtExists) {
    Write-Host "[INFO] Génération de la clé JWT..." -ForegroundColor Cyan
    php artisan jwt:secret
} else {
    Write-Host "[OK] Clé JWT déjà configurée" -ForegroundColor Green
}
Write-Host ""

Write-Host "[4/6] Reset de la base de données..." -ForegroundColor Green
Write-Host "[ATTENTION] Ceci va supprimer toutes les données existantes !" -ForegroundColor Yellow
$confirm = Read-Host "Continuer ? (O/N)"
if ($confirm -ne "O" -and $confirm -ne "o") {
    Write-Host "Opération annulée." -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 0
}

php artisan migrate:fresh 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] Échec des migrations !" -ForegroundColor Red
    Write-Host "Vérifiez votre configuration de base de données dans .env" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}
Write-Host "[OK] Migrations exécutées avec succès" -ForegroundColor Green
Write-Host ""

Write-Host "[5/6] Génération des données de test..." -ForegroundColor Green
php artisan db:seed --class=TestDataSeeder 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] Échec du seeding !" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}
Write-Host ""

Write-Host "[6/6] Préparation du serveur..." -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host " PREPARATION TERMINEE AVEC SUCCES !" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host " Données de test générées :" -ForegroundColor White
Write-Host " - 1 utilisateur admin" -ForegroundColor Gray
Write-Host " - 10 véhicules" -ForegroundColor Gray
Write-Host " - 4 messages de contact" -ForegroundColor Gray
Write-Host " - 5 demandes de réservation" -ForegroundColor Gray
Write-Host ""
Write-Host " Identifiants admin :" -ForegroundColor White
Write-Host " Email    : admin@roadstar.com" -ForegroundColor Cyan
Write-Host " Password : password123" -ForegroundColor Cyan
Write-Host ""
Write-Host " URL de l'API : http://localhost:8000/api" -ForegroundColor Magenta
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Le serveur va démarrer maintenant..." -ForegroundColor Yellow
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host ""
Read-Host "Appuyez sur Entrée pour démarrer le serveur"

# Démarrer le serveur
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host " SERVEUR LARAVEL EN COURS D'EXECUTION" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
php artisan serve
