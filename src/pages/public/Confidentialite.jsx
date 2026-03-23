import Seo from '../../components/ui/Seo';

export default function Confidentialite() {
    return (
        <div className="pt-32 min-h-screen bg-white pb-20">
            <Seo title="Politique de Confidentialité" description="Politique de confidentialité et protection des données personnelles de ROADSTAR." path="/confidentialite" />

            <div className="container max-w-4xl text-gray-700">
                <h1 className="text-4xl font-bold text-gray-900 mb-10">Politique de Confidentialité</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte des données</h2>
                    <p className="mb-4">Nous collectons les informations que vous nous fournissez directement lorsque :</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Vous remplissez un formulaire de contact ou de réservation.</li>
                        <li>Vous nous contactez par email ou téléphone.</li>
                        <li>Vous naviguez sur notre site (via des cookies).</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
                    <p className="mb-4">Les informations collectées nous permettent de :</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Traiter vos demandes de réservation.</li>
                        <li>Répondre à vos questions et demandes de contact.</li>
                        <li>Améliorer notre site et nos services.</li>
                        <li>Vous envoyer des communications marketing (si vous avez accepté).</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Protection des données</h2>
                    <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisée.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies</h2>
                    <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites. Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vos droits</h2>
                    <p>Conformément à la législation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à : info@roadstar225.com.</p>
                </section>
            </div>
        </div>
    );
}
