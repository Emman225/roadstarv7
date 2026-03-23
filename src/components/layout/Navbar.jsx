import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoWhite from '../../assets/images/New_logo-RoadStar_blanc.png';
import logoDark from '../../assets/images/New_logo-RoadStar.png';
import { Menu, X, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Présentation', path: '/a-propos' },
    { name: 'Services', path: '/services' },
    { name: 'Véhicules', path: '/vehicules' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <div className='fixed top-0 left-0 w-full z-50'>
            {/* Top Header */}
            <div className="bg-primary text-white py-2 border-b border-white/20 hidden lg:block">
                <div className="container flex justify-between items-center text-xs font-medium">
                    <div className="flex items-center space-x-6">
                        <span className="text-white font-black tracking-widest uppercase">Votre partenaire pour la route</span>
                        <a href="tel:+2252122412842" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
                            <Phone size={14} /> <span>+225 21 22 41 28 42</span>
                        </a>
                        <a href="mailto:info@roadstar225.com" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
                            <Mail size={14} /> <span>info@roadstar225.com</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SocialLink href="#" icon={MessageCircle} label="WhatsApp" />
                        <SocialLink href="#" icon={Facebook} label="Facebook" />
                        <a href="#" className="hover:text-white/80 transition-colors" aria-label="TikTok">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                        </a>
                        <SocialLink href="#" icon={Instagram} label="Instagram" />
                        <SocialLink href="#" icon={Twitter} label="X" />
                        <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={cn(
                "w-full transition-all duration-300 border-b border-white/10",
                scrolled || isOpen ? "bg-black/95 backdrop-blur-md py-3 shadow-lg" : "bg-black py-4"
            )}>
                <div className="container flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="z-50 relative block">
                        <img src={logoWhite} alt="ROADSTAR" className="h-10 md:h-12 w-auto object-contain" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "text-sm uppercase tracking-wider font-semibold transition-colors hover:text-primary relative group",
                                    location.pathname === link.path ? "text-primary" : "text-white"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                                    location.pathname === link.path ? "w-full" : "w-0"
                                )} />
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Phone */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Button
                            to="/vehicules"
                            variant="primary"
                            className="py-2.5 px-6 text-sm transition-colors shadow-lg shadow-primary/20"
                        >
                            Réserver
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden transition-colors z-50 relative text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 top-[60px] bg-black backdrop-blur-xl lg:hidden h-screen flex flex-col pt-10 px-6"
                        >
                            <div className="flex flex-col space-y-6">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={cn(
                                                "text-2xl font-bold transition-colors hover:text-primary block border-b border-white/10 pb-4",
                                                location.pathname === link.path ? "text-primary" : "text-white"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Mobile Top Header Info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-4 flex flex-col gap-4 text-neutral-400"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Phone size={18} className="text-primary" />
                                        <span>+225 01 03 12 10 10</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Mail size={18} className="text-primary" />
                                        <span>info@roadstar225.com</span>
                                    </div>

                                    <div className="flex space-x-6 pt-4">
                                        <SocialLink href="#" icon={MessageCircle} label="WhatsApp" />
                                        <SocialLink href="#" icon={Facebook} label="Facebook" />
                                        <SocialLink href="#" icon={Instagram} label="Instagram" />
                                        <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                                    </div>

                                    <Button to="/vehicules" variant="primary" className="w-full justify-center text-lg py-4 mt-4">
                                        Réserver un véhicule
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}

function SocialLink({ href, icon: Icon, label }) {
    return (
        <a href={href} className="hover:text-primary transition-colors" aria-label={label}>
            <Icon size={14} />
        </a>
    );
}
