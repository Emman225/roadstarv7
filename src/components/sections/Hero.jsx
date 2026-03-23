import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import slide1 from '../../assets/images/presentation/bgp.png';
import slide2 from '../../assets/images/IMG_20230130_100607.jpg';

const slides = [
    {
        id: 1,
        image: slide1,
        align: 'right',
        subtitle: "Votre partenaire pour la route",
        title: <>Solutions de <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Mobilité Sur Mesure</span></>,
        description: "ROADSTAR accompagne les institutions et entreprises avec des solutions complètes de location de véhicules. Chauffeurs professionnels, sécurité et confort garantis.",
        primaryButtonText: "Découvrir nos services",
        primaryButtonLink: "/services",
        secondaryButtonText: "Notre flotte",
        secondaryButtonLink: "/vehicules"
    },
    {
        id: 2,
        image: slide2,
        subtitle: "Depuis 2009",
        title: <>L'Excellence à <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Chaque Trajet</span></>,
        description: "Location courte, moyenne et longue durée. Gestion de flotte, chauffeurs qualifiés et vente de pièces détachées.",
        primaryButtonText: "Voir la flotte",
        primaryButtonLink: "/vehicules",
        secondaryButtonText: "Contactez-nous",
        secondaryButtonLink: "/contact"
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent(current === length - 1 ? 0 : current + 1);
        }, 6000);
        return () => clearTimeout(timer);
    }, [current, length]);

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gray-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }} // Smooth cross-fade
                >
                    {/* Background Image with Ken Burns Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 7, ease: "easeOut" }}
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url("${slides[current].image}")` }}
                        />
                    </div>

                    {/* Overlay Gradient - Adjusted for readability */}
                    <div className={`absolute inset-0 mix-blend-hard-light opacity-90 ${slides[current].align === 'right' ? 'bg-gradient-to-l from-white via-white/80 to-transparent sm:via-white/40' : 'bg-gradient-to-r from-white via-white/80 to-transparent sm:via-white/40'}`} />
                    <div className={`absolute inset-0 ${slides[current].align === 'right' ? 'bg-gradient-to-l from-white/90 via-white/60 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/60 to-transparent'}`} />
                </motion.div>
            </AnimatePresence>

            {/* Content - Re-animates on slide change */}
            <div className={`relative h-full container flex flex-col justify-center pt-20 z-10 ${slides[current].align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${slides[current].id}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 pl-1 block">
                                {slides[current].subtitle}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${slides[current].id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold font-sans leading-[1.1] mb-8 text-gray-900"
                        >
                            {slides[current].title}
                        </motion.h1>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`desc-${slides[current].id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-lg md:text-xl text-gray-600 max-w-xl mb-12 leading-relaxed"
                        >
                            {slides[current].description}
                        </motion.p>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`btns-${slides[current].id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className={`flex flex-col sm:flex-row gap-6 ${slides[current].align === 'right' ? 'justify-end' : ''}`}
                        >
                            <Button to={slides[current].primaryButtonLink} variant="primary" className="text-lg px-10 py-4 shadow-xl shadow-primary/20">
                                {slides[current].primaryButtonText}
                            </Button>
                            <Button to={slides[current].secondaryButtonLink} variant="outline" className="text-lg px-10 py-4 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-black">
                                {slides[current].secondaryButtonText}
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-20 hidden md:flex">
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 bg-white/50 backdrop-blur-sm group"
                >
                    <ChevronLeft size={24} className="text-gray-700 group-hover:text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 bg-white/50 backdrop-blur-sm group"
                >
                    <ChevronRight size={24} className="text-gray-700 group-hover:text-white" />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 md:left-24 transform -translate-x-1/2 md:translate-x-0 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-1 transition-all duration-500 rounded-full ${index === current ? "w-12 bg-primary" : "w-4 bg-gray-400 hover:bg-gray-600"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 z-10 hidden md:flex"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] mb-4">Scroll Down</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent opacity-70" />
            </motion.div>
        </div>
    );
}
