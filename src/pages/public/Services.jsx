import Seo from '../../components/ui/Seo';
import { services } from '../../data/services';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import domainesImage from '../../assets/images/presentation/nos-domaines-intervention.jpg';
import chauffeurSansVoitureImage from '../../assets/images/presentation/Chauffeur sans voiture.jpg';
import gestionFlotteImage from '../../assets/images/presentation/gestion-flotte-automobile.png';

const serviceImages = {
    'Chauffeur sans Voiture': chauffeurSansVoitureImage,
    'Gestion de Flotte Automobile': gestionFlotteImage
};

// Séparer les services de location (avec durée) des autres services
const locationServices = services.filter(s => s.duration);
const otherServices = services.filter(s => !s.duration);

export default function Services() {
    return (
        <div className="pt-32 min-h-screen">
            <Seo title="Nos Services" description="Découvrez les services de location de véhicules ROADSTAR : courte durée, longue durée, chauffeur." path="/services" />

            {/* Hero Section - Fond blanc */}
            <section className="bg-white pb-20">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Nos Solutions</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Nos Domaines d'Intervention</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">Des solutions de mobilité sur mesure, conçues pour s'adapter à la durée et à la nature des missions confiées.</p>
                            <Button to="/contact" variant="primary" className="shadow-lg shadow-primary/20">
                                Demander un devis gratuit
                            </Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src={domainesImage}
                                alt="Nos domaines d'intervention - ROADSTAR"
                                loading="lazy"
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section Location - Fond gris clair */}
            <section className="py-24 bg-neutral-50 border-y border-neutral-100">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Location de Véhicules</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Des formules adaptées à vos besoins</h2>
                        <p className="text-gray-500">De la location ponctuelle à l'externalisation complète de votre parc automobile.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {locationServices.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="bg-white rounded-3xl p-10 border border-neutral-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 flex flex-col items-start group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Icon size={32} />
                                    </div>
                                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">{service.duration}</span>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8 flex-1">{service.description}</p>
                                    <Button to="/contact" variant="outline" className="border-neutral-200 text-gray-700 hover:bg-primary hover:text-white hover:border-primary shadow-none group-hover:border-primary/30">
                                        Demander un devis <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section Autres Services - Fond blanc */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Services Complémentaires</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Au-delà de la location</h2>
                        <p className="text-gray-500">Des prestations professionnelles pour accompagner tous vos besoins de mobilité.</p>
                    </div>

                    <div className="space-y-8">
                        {otherServices.map((service, idx) => {
                            const Icon = service.icon;
                            const serviceImage = serviceImages[service.title];
                            const isReversed = idx % 2 !== 0;

                            return serviceImage ? (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className={`grid grid-cols-1 md:grid-cols-2 ${isReversed ? 'md:direction-rtl' : ''}`}>
                                        <div className={isReversed ? 'md:order-2' : ''}>
                                            <img
                                                src={serviceImage}
                                                alt={service.title}
                                                loading="lazy"
                                                className="w-full h-full min-h-[320px] object-cover object-top"
                                            />
                                        </div>
                                        <div className={`p-12 flex flex-col items-start justify-center ${isReversed ? 'md:order-1' : ''}`}>
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                                                <Icon size={32} />
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.description}</p>
                                            <Button to="/contact" variant="primary" className="shadow-lg shadow-primary/20">
                                                Demander un devis <ArrowRight size={16} className="ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className={`rounded-3xl p-12 border border-neutral-100 hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'bg-neutral-50' : 'bg-white border-neutral-200'}`}
                                >
                                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                        <Icon size={40} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                                    </div>
                                    <Button to="/contact" variant="outline" className="shrink-0 border-neutral-200 text-gray-700 hover:bg-primary hover:text-white hover:border-primary shadow-none">
                                        Demander un devis <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section - Fond primary */}
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
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Besoin d'une solution personnalisée ?</h2>
                        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">Nous sommes à votre écoute pour concevoir l'offre qui correspond exactement à vos attentes.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button to="/contact" className="bg-white text-primary hover:bg-neutral-100 border-none shadow-xl text-lg px-10 py-4">
                                Contactez notre équipe commerciale
                            </Button>
                            <Button to="/vehicules" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-4">
                                Voir nos véhicules
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
