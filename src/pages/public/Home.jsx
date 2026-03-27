import { Link } from 'react-router-dom';
import Seo from '../../components/ui/Seo';
import Hero from '../../components/sections/Hero';
import Button from '../../components/ui/Button';
import VehicleCard from '../../components/sections/VehicleCard';
import { useData } from '../../context/DataContext';
import { services } from '../../data/services';
import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { ArrowRight, Star, Car, Users, Zap, Award, Handshake, ChevronLeft, ChevronRight } from 'lucide-react';
import p7 from '../../assets/images/partenaires/Image7.jpg';
import p8 from '../../assets/images/partenaires/Image8.jpg';
import p9 from '../../assets/images/partenaires/Image9.jpg';
import p10 from '../../assets/images/partenaires/Image10.jpg';
import p11 from '../../assets/images/partenaires/Image11.jpg';
import p12 from '../../assets/images/partenaires/Image12.jpg';
import p13 from '../../assets/images/partenaires/Image13.jpg';
import p14 from '../../assets/images/partenaires/Image14.jpg';
import p15 from '../../assets/images/partenaires/Image15.jpg';
import p16 from '../../assets/images/partenaires/Image16.jpg';
import p17 from '../../assets/images/partenaires/Image17.jpg';
import p18 from '../../assets/images/partenaires/Image18.jpg';
import presentationImage from '../../assets/images/IMG_20230130_100803.jpg';
<meta name="google-site-verification" content="HipksyBv0iX6oAnbpq1vt5jGK7pMDI7pAddDOA_qUiQ" />
const allPartners = [p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18];

function PartnersCarousel() {
    const scrollRef = useRef(null);

    const scroll = useCallback((direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <section className="py-20 bg-white border-y border-neutral-100 overflow-hidden">
            <div className="container">
                <div className="text-center mb-12">
                    <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Nos Partenaires</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ils nous font confiance</h2>
                </div>

                <div className="relative group">
                    {/* Bouton gauche */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 -ml-2 md:opacity-0 md:group-hover:opacity-100"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Bouton droit */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 -mr-2 md:opacity-0 md:group-hover:opacity-100"
                    >
                        <ChevronRight size={22} />
                    </button>

                    {/* Dégradés latéraux */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    {/* Conteneur scrollable */}
                    <div
                        ref={scrollRef}
                        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                    >
                        <div className="flex gap-6 items-center py-4 px-8 w-max animate-scroll-logos hover:[animation-play-state:paused]">
                            {[...Array(3)].flatMap((_, repeat) =>
                                allPartners.map((partner, index) => (
                                    <div
                                        key={`${repeat}-${index}`}
                                        className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 flex items-center justify-center h-24 min-w-[150px] shrink-0 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                                    >
                                        <img
                                            src={partner}
                                            alt={`Partenaire ROADSTAR`}
                                            loading="lazy"
                                            className="max-h-14 w-auto object-contain"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const engagements = [
    { icon: Car, title: 'Des véhicules fiables', desc: 'Entretenus régulièrement auprès des concessionnaires agréés, contrôlés et suivis avec rigueur.' },
    { icon: Users, title: 'Des conducteurs professionnels', desc: 'Formés, disciplinés et strictement conformes aux exigences HSE.' },
    { icon: Zap, title: 'Réactivité opérationnelle', desc: 'Une organisation agile pour répondre rapidement à chaque situation.' },
    { icon: Award, title: 'Qualité de service constante', desc: 'Des standards élevés, maintenus dans la durée.' },
    { icon: Handshake, title: 'Un partenariat durable', desc: 'Fondé sur la confiance, la transparence et la performance.' }
];

const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ROADSTAR",
    "description": "Location de véhicules premium à Abidjan. SUVs, Berlines et services avec chauffeur pour entreprises et particuliers depuis 2009.",
    "url": "https://roadstar.vercel.app",
    "telephone": "+2252722412842",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "II Plateaux Vallons, Avenue Boga Doudou",
        "addressLocality": "Abidjan",
        "addressCountry": "CI"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "5.3600",
        "longitude": "-4.0083"
    },
    "foundingDate": "2009",
    "priceRange": "$$$$",
    "openingHours": "Mo-Sa 07:00-19:00",
    "sameAs": [],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Location de Véhicules",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Location courte durée",
                    "description": "Location de véhicules premium pour quelques jours ou semaines"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Location longue durée",
                    "description": "Contrats flexibles de location longue durée pour entreprises"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Service chauffeur",
                    "description": "Chauffeurs professionnels pour vos déplacements"
                }
            }
        ]
    }
};

export default function Home() {
    const { vehicles, testimonials } = useData();
    const featuredVehicles = vehicles.filter(v => v.featured).slice(0, 3);

    const activeTestimonials = testimonials.filter(t => t.is_active !== false && t.is_active !== 0);
    const avgRating = activeTestimonials.length > 0
        ? (activeTestimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / activeTestimonials.length).toFixed(1)
        : "5.0";

    const jsonLdWithReviews = [
        homeJsonLd,
        ...(activeTestimonials.length > 0 ? [{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ROADSTAR",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": avgRating,
                "reviewCount": String(activeTestimonials.length),
                "bestRating": "5",
                "worstRating": "1"
            }
        }] : [])
    ];

    return (
        <>
            <Seo
                title="Accueil"
                description="ROADSTAR, votre partenaire premium pour la location de véhicules à Abidjan. SUVs, Berlines et services avec chauffeur."
                path="/"
                jsonLd={jsonLdWithReviews}
            />

            <Hero />

            {/* Presentation Section */}
            <section className="py-20 bg-neutral-50 border-b border-neutral-100">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src={presentationImage}
                                    alt="ROADSTAR - Location de véhicules premium à Abidjan"
                                    loading="lazy"
                                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-neutral-100 hidden md:block">
                                <span className="text-4xl font-bold text-primary block">2009</span>
                                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Année de création</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Qui sommes-nous ?</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Votre partenaire pour la route</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                Créée en 2009, ROADSTAR accompagne les institutions ainsi que les entreprises, en leur proposant des solutions complètes de location de véhicules.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Nous mettons à disposition des véhicules avec chauffeurs professionnels, sélectionnés et formés à la conduite défensive, garantissant ainsi un haut niveau de sécurité, de confort et de professionnalisme.
                            </p>
                            <Button to="/a-propos" variant="primary" className="shadow-lg shadow-primary/20">
                                Découvrir notre histoire
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-white relative overflow-hidden text-gray-900 border-b border-neutral-100">
                <div className="container relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Nos Services</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Une expérience sur mesure</h2>
                        <p className="text-gray-600">Des solutions de mobilité sur mesure, conçues pour s'adapter à la durée et à la nature des missions confiées.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.slice(0, 3).map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-xl transition-all group"
                            >
                                <div className="w-14 h-14 bg-neutral-50 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shadow-md shadow-neutral-100">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                            </motion.div>
                        ))}

                        {/* Voir Plus Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link
                                to="/services"
                                className="h-full bg-neutral-50 p-8 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-primary hover:bg-primary/5 transition-all group flex flex-col justify-center items-center text-center cursor-pointer"
                            >
                                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 text-gray-400 group-hover:text-primary group-hover:scale-110 transition-transform shadow-sm">
                                    <ArrowRight size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Voir tous les services</h3>
                                <p className="text-gray-500 text-sm mb-4">Découvrez nos autres prestations (Chauffage, Sécurité, etc.)</p>
                                <span className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Accéder au catalogue <ArrowRight size={16} />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Vehicles */}
            <section className="py-24 bg-neutral-50/50">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Notre Flotte</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Véhicules en vedette</h2>
                        </div>
                        <Button to="/vehicules" variant="ghost" className="hidden md:flex items-center gap-2 group text-gray-900 hover:text-primary">
                            Voir tout le catalogue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredVehicles.map((vehicle, idx) => (
                            <motion.div
                                key={vehicle.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <VehicleCard vehicle={vehicle} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Button to="/vehicules" variant="outline" className="w-full justify-center">
                            Voir tout le catalogue
                        </Button>
                    </div>
                </div>
            </section>

            {/* Nos Engagements */}
            <section className="py-24 bg-neutral-100 relative">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Nos Engagements</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">ROADSTAR s’engage à garantir à ses partenaires</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {engagements.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-xl transition-all group"
                                >
                                    <div className="w-14 h-14 bg-neutral-50 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shadow-md shadow-neutral-100">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        <Button to="/a-propos" variant="primary" className="shadow-lg shadow-primary/20">
                            En savoir plus sur ROADSTAR
                        </Button>
                    </div>
                </div>
            </section>

            {/* Partners / References */}
            <PartnersCarousel />


            {/* Testimonials */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full pointer-events-none" />
                <div className="container relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ce que disent nos clients</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {activeTestimonials.map((t, idx) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-neutral-50 border border-neutral-100 p-8 rounded-2xl relative hover:border-primary/20 hover:shadow-lg transition-all"
                            >
                                <div className="text-primary mb-4 flex gap-1">
                                    {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary border border-neutral-200">
                                        {t.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-gray-900 font-bold text-sm">{t.name}</h4>
                                        <span className="text-gray-500 text-xs block">{t.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="container relative flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Prêt à prendre la route ?</h2>
                        <p className="text-white/80 text-lg">Réservez dès maintenant votre véhicule et profitez d'un service d'exception.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button to="/vehicules" className="bg-white text-primary hover:bg-neutral-100 shadow-xl border-none">
                            Voir nos véhicules
                        </Button>
                        <Button to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                            Contactez-nous
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
