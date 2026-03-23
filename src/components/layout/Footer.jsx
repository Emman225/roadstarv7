
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, ArrowUp, Linkedin } from 'lucide-react';
import PropTypes from 'prop-types';
import logoDark from '../../assets/images/New_logo-RoadStar.png';
import { cn } from '../../lib/utils';

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-neutral-200">
            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={cn(
                    "fixed bottom-24 right-8 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:text-primary transition-all duration-300 z-50 focus:outline-none",
                    showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                )}
                aria-label="Retour en haut"
            >
                <ArrowUp size={24} />
            </button>

            {/* Top Section: Light */}
            <div className="bg-neutral-50 text-gray-700 pt-12 pb-10">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="space-y-6">
                            <Link to="/" className="block">
                                <img src={logoDark} alt="ROADSTAR" className="h-10 w-auto object-contain" />
                            </Link>
                            <p className="leading-relaxed text-sm text-gray-500">
                                Votre partenaire de confiance pour la location de voitures à Abidjan. Véhicules de prestige et service premium pour tous vos déplacements professionnels et privés.
                            </p>
                            <div className="flex space-x-4">
                                <SocialIcon icon={Facebook} />
                                <SocialIcon icon={Instagram} />
                                <SocialIcon icon={Twitter} />
                                <SocialIcon icon={Linkedin} />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-6">Navigation</h4>
                            <ul className="space-y-4 text-sm">
                                <FooterLink to="/" label="Accueil" />
                                <FooterLink to="/a-propos" label="Présentation" />
                                <FooterLink to="/services" label="Nos Services" />
                                <FooterLink to="/vehicules" label="Nos Véhicules" />
                                <FooterLink to="/contact" label="Contact" />
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-6">Services</h4>
                            <ul className="space-y-4 text-sm">
                                <li className="hover:text-primary transition-colors cursor-pointer">Location courte durée</li>
                                <li className="hover:text-primary transition-colors cursor-pointer">Location longue durée</li>
                                <li className="hover:text-primary transition-colors cursor-pointer">Location avec chauffeur</li>
                                <li className="hover:text-primary transition-colors cursor-pointer">Transfert aéroport</li>
                                <li className="hover:text-primary transition-colors cursor-pointer">Services entreprises</li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-6">Nous Contacter</h4>
                            <ul className="space-y-5 text-sm">
                                <li className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>Abidjan, Côte d'Ivoire</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <a href="tel:+2250103121010" className="hover:text-primary transition-colors">+225 01 03 12 10 10</a>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <a href="mailto:info@roadstar225.com" className="hover:text-primary transition-colors">info@roadstar225.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Black */}
            <div className="bg-black py-4 text-neutral-400">
                <div className="container flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-white font-bold">&copy; 2026 ROADSTAR. Tous droits réservés.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
                        <Link to="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ to, label }) {
    return (
        <li>
            <Link to={to} className="hover:text-primary transition-colors block">{label}</Link>
        </li>
    );
}

FooterLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

function SocialIcon({ icon: Icon }) {
    return (
        <a href="#" className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm text-gray-700">
            <Icon size={18} />
        </a>
    );
}

SocialIcon.propTypes = {
    icon: PropTypes.elementType.isRequired
};
