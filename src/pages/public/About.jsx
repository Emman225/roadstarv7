import Seo from '../../components/ui/Seo';
import { motion } from 'framer-motion';
import { CheckCircle, Car, Users, Zap, Award, Handshake, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import historiqueImage from '../../assets/images/presentation/Historique.jpg';
import engagementsImage from '../../assets/images/presentation/Nos engagements.jpg';

const engagements = [
    {
        icon: Car,
        title: 'Des véhicules fiables',
        description: 'Entretenus régulièrement auprès des concessionnaires agréés, contrôlés et suivis avec rigueur.'
    },
    {
        icon: Users,
        title: 'Des conducteurs professionnels',
        description: 'Formés, disciplinés et strictement conformes aux exigences HSE.'
    },
    {
        icon: Zap,
        title: 'Une réactivité opérationnelle immédiate',
        description: 'Une organisation agile pour répondre rapidement à chaque situation.'
    },
    {
        icon: Award,
        title: 'Une qualité de service constante',
        description: 'Des standards élevés, maintenus dans la durée.'
    },
    {
        icon: Handshake,
        title: 'Un partenariat durable',
        description: 'Fondé sur la confiance, la transparence et la performance.'
    }
];

export default function About() {
    return (
        <div className="pt-32 min-h-screen">
            <Seo title="À Propos" description="Découvrez l'histoire et les valeurs de ROADSTAR, votre partenaire pour la location de véhicules et la mobilité professionnelle à Abidjan depuis 2009." path="/a-propos" />

            {/* Hero Header - Fond blanc */}
            <section className="bg-white pb-20">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Depuis 2009</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Votre Partenaire Pour La Route</h1>
                            <p className="text-gray-600 text-lg leading-relaxed">Créée en 2009, ROADSTAR accompagne les institutions ainsi que les entreprises, en leur proposant des solutions complètes de location de véhicules.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Historique - Fond gris clair */}
            <section className="py-24 bg-neutral-50 border-y border-neutral-100">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src={historiqueImage}
                                alt="ROADSTAR - Historique depuis 2009"
                                loading="lazy"
                                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                            />
                            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl border border-neutral-100 shadow-xl hidden md:block">
                                <span className="text-4xl font-bold text-primary block mb-1">17+</span>
                                <span className="text-gray-500 text-sm">Années d'excellence</span>
                            </div>
                            <div className="absolute -z-10 -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-2xl hidden lg:block" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Notre Histoire</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Notre Historique</h2>
                            <p className="text-gray-600 mb-5 leading-relaxed">
                                Nous mettons à disposition des véhicules avec chauffeurs professionnels, sélectionnés et formés à la conduite défensive, garantissant ainsi un haut niveau de sécurité, de confort et de professionnalisme.
                            </p>
                            <p className="text-gray-600 mb-5 leading-relaxed">
                                Nos offres sont adaptées aux dirigeants, délégations officielles et partenaires stratégiques avec une vaste gamme de services dans le domaine de la location de véhicules, allant de la location courte durée (LCD) à la location longue durée (LLD).
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Nous développons des solutions de mobilité sur mesure, conçues pour s'adapter à la durée et à la nature des missions confiées.
                            </p>
                            <Button to="/services" variant="primary" className="shadow-lg shadow-primary/20">
                                Découvrir nos services <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Nos Engagements - Fond blanc */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Nos Engagements</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">ROADSTAR s'engage à garantir à ses partenaires</h2>
                            <p className="text-gray-500">Des engagements forts pour une relation de confiance durable.</p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {engagements.map((engagement, idx) => {
                            const Icon = engagement.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{engagement.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{engagement.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Sécurité - Fond gris foncé / dark */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Sécurité</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">La sécurité au cœur de nos engagements</h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Nos véhicules font l'objet d'un entretien rigoureux chez le concessionnaire. La sécurité est au cœur de nos engagements.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    'Entretien rigoureux chez les concessionnaires agréés',
                                    'Chauffeurs formés à la conduite défensive',
                                    'Conformité stricte aux exigences HSE',
                                    'Contrôles réguliers et suivi avec rigueur'
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle className="text-primary shrink-0 mt-1" size={20} />
                                        <span className="text-gray-300">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                            <Button to="/contact" variant="primary" className="shadow-lg shadow-primary/20">
                                Contactez-nous <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={engagementsImage}
                                alt="Nos engagements sécurité - ROADSTAR"
                                loading="lazy"
                                className="rounded-2xl w-full h-auto object-contain shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA - Fond primary */}
            <section className="py-20 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Prêt à prendre la route avec nous ?</h2>
                        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">Découvrez nos solutions de mobilité et rejoignez les institutions et entreprises qui nous font confiance depuis 2009.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button to="/vehicules" className="bg-white text-primary hover:bg-neutral-100 border-none shadow-xl text-lg px-10 py-4">
                                Voir nos véhicules
                            </Button>
                            <Button to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-4">
                                Contactez-nous
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
