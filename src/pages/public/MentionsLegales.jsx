import Seo from '../../components/ui/Seo';

export default function MentionsLegales() {
    return (
        <div className="pt-32 min-h-screen bg-white pb-20">
            <Seo title="Mentions Légales" description="Mentions légales de ROADSTAR, location de voitures à Abidjan." path="/mentions-legales" />

            <div className="container max-w-4xl text-gray-700">
                <h1 className="text-4xl font-bold text-gray-900 mb-10">Mentions Légales</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
                    <p className="mb-2">Le site roadstar225.com est édité par la société <strong>ROADSTAR</strong>.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Forme juridique :</strong> SARL (Société à Responsabilité Limitée)</li>
                        <li><strong>Siège social :</strong> Zone 4, Rue du Dr Blanchard, Abidjan, Côte d'Ivoire</li>
                        <li><strong>Téléphones :</strong> (+225) 21 22 41 28 42 / (+225) 01 03 12 10 10</li>
                        <li><strong>Assistance 24/7 :</strong> +225 01 01 70 25 29</li>
                        <li><strong>Email :</strong> info@roadstar225.com</li>
                        <li><strong>Registre du Commerce (RCCM) :</strong> CI-ABJ-03-2009-B12-01584</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
                    <p>Le site est hébergé par LWS (Ligne Web Services), France.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
                    <p>L'ensemble de ce site relève de la législation ivoirienne et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilité</h2>
                    <p>ROADSTAR s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toutefois, ROADSTAR ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site.</p>
                </section>
            </div>
        </div>
    );
}
