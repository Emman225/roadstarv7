# Manuel d'Utilisation - Plateforme Roadstar

Ce document présente les fonctionnalités de la plateforme Roadstar, conçue pour faciliter la location de véhicules et la gestion de l'activité. La solution se compose de deux interfaces principales : une interface **Grand Public** (Site Web & Application Mobile) pour les clients, et une interface **Administration** pour la gestion interne.

---

## 1. Interface Grand Public (Clients)

Cette partie est visible par tous les visiteurs. Elle est optimisée pour présenter vos services, votre flotte de véhicules et faciliter la prise de contact ou la réservation.

### Supports
- **Site Web** : Accessible via navigateur sur ordinateurs, tablettes et mobiles.
- **Application Mobile** : Application native (Android/iOS) pour une expérience utilisateur fluide.

### Fonctionnalités Clés

#### 🏠 Accueil (Home)
La page d'accueil sert de vitrine. Elle met en avant :
- Une présentation visuelle impactante (Hero section).
- Un aperçu rapide des services offerts.
- Les véhicules "phares" ou nouveautés.
- Des témoignages clients pour renforcer la confiance.

#### 🚗 Catalogue de Véhicules (Vehicles)
Le cœur de l'application. Les utilisateurs peuvent :
- **Consulter la flotte** : Une liste claire de tous les véhicules disponibles.
- **Voir les détails** : Chaque véhicule dispose d'une fiche détaillée (Marque, Modèle, Année, Prix journalier, Caractéristiques techniques, Photos).
- **Filtrer** : (Selon disponibilité) Trouver un véhicule selon des critères spécifiques.

#### 🛠️ Services
Une page dédiée décrivant en détail les prestations proposées par Roadstar (ex: Location courte durée, Location avec chauffeur, Entretien, etc.).

#### 📞 Contact & Réservation
Pour transformer les visiteurs en clients :
- **Formulaire de Contact** : Permet aux utilisateurs d'envoyer un message directement depuis le site ou l'application.
- **Demande de Réservation** : Les utilisateurs peuvent s'informer sur la disponibilité d'un véhicule spécifique.

#### ℹ️ Informations & Confiance
- **À propos (About)** : Présentation de l'entreprise Roadstar.
- **Témoignages** : Retours d'expérience d'autres clients.
- **Mentions Légales & Confidentialité** : Pages obligatoires pour le respect des normes web (RGPD, etc.).

---

## 2. Interface Administration (Back-office)

Cette partie est strictement réservée aux administrateurs de Roadstar. Elle permet de piloter le contenu du site et de l'application mobile en temps réel.

### Accès
L'accès se fait via une page de connexion sécurisée (`/admin/login`) nécessitant un identifiant et un mot de passe.

### Fonctionnalités Clés

#### 📊 Tableau de Bord (Dashboard)
La page d'accueil de l'administration. Elle offre une vue d'ensemble de l'activité (s'il y a des statistiques implémentées, ex: nombre de véhicules, derniers messages).

#### 🚙 Gestion de la Flotte (Vehicles Management)
C'est ici que vous gérez votre catalogue. Vous avez la main totale :
- **Ajouter un véhicule** : Remplir un formulaire complet (Marque, Modèle, Immatriculation, Prix, Photos, Options, etc.) pour rendre un nouveau véhicule visible immédiatement sur le site et l'app.
- **Modifier un véhicule** : Mettre à jour les prix, changer les photos, ou corriger des informations.
- **Supprimer un véhicule** : Retirer un véhicule de la location.
- **Statut** : Gérer la disponibilité (ex: Disponible, En maintenance, Loué).

#### 💬 Gestion des Messages (Messages)
Une boîte de réception centralisée pour :
- Consulter les messages envoyés via le formulaire de contact du site/app.
- Voir les détails de l'expéditeur (Nom, Email, Téléphone).
- Traiter les demandes et y répondre.

---

## Résumé du Flux

1. **Le Client** visite le site ou l'app ➡️ Consulte les véhicules ➡️ Envoie une demande via le formulaire de contact.
2. **L'Administrateur** se connecte au Back-office ➡️ Reçoit la notification/message dans l'onglet "Messages" ➡️ Traite la demande.
3. **L'Administrateur** met à jour la flotte dans l'onglet "Véhicules" si un véhicule est loué ou si un nouveau véhicule rentre en parc.
