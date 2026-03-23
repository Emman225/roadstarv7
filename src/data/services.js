import { Clock, Calendar, CalendarRange, Car, UserPlus, Wrench } from 'lucide-react';

export const services = [
    {
        id: 1,
        title: 'Location Courte Durée (LCD)',
        duration: 'De 1 à 30 jours',
        description: 'Pensée pour répondre aux besoins immédiats ou temporaires, la location ponctuelle offre une solution rapide, flexible et sans engagement à long terme.',
        icon: Clock
    },
    {
        id: 2,
        title: 'Location Moyenne Durée (LMD)',
        duration: 'De 3 à 12 mois',
        description: 'Solution intermédiaire entre la location ponctuelle et la longue durée. Idéal pour une mission temporaire, un chantier ou une période de transition, alliant souplesse et maîtrise budgétaire.',
        icon: Calendar
    },
    {
        id: 3,
        title: 'Location Longue Durée (LLD)',
        duration: 'Plus de 12 mois',
        description: 'La location longue durée constitue une solution structurée pour les institutions et entreprises souhaitant externaliser leur parc automobile, avec un loyer mensuel maîtrisé et des services intégrés (maintenance, assistance, gestion administrative).',
        icon: CalendarRange
    },
    {
        id: 4,
        title: 'Gestion de Flotte Automobile',
        description: 'Au-delà de la location, ROADSTAR accompagne ses clients dans la gestion complète ou partielle de leur parc automobile. Optimisation de l\'utilisation des véhicules, maîtrise des coûts et pilotage efficace des ressources.',
        icon: Car
    },
    {
        id: 5,
        title: 'Chauffeur sans Voiture',
        description: 'Vous disposez déjà d\'un véhicule ? ROADSTAR met à votre disposition des chauffeurs professionnels qualifiés, formés à la conduite défensive, pour assurer vos déplacements en toute sécurité. Discrets, ponctuels et expérimentés.',
        icon: UserPlus
    },
    {
        id: 6,
        title: 'Vente de Pièces Détachées',
        description: 'En partenariat avec SPRIINT TECH (Bosch), ROADSTAR propose la vente de pièces de rechange, principalement des pièces d\'usure pour les entretiens réguliers. Des pièces fiables, conformes aux standards de qualité.',
        icon: Wrench
    }
];
