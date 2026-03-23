import Seo from '../../components/ui/Seo';
import { testimonials } from '../../data/testimonials';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
    return (
        <div className="pt-32 min-h-screen bg-dark pb-20">
            <Seo title="Témoignages" description="Découvrez ce que nos clients disent de leur expérience avec ROADSTAR. Avis et retours clients." path="/temoignages" />

            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Avis Clients</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Ils nous font confiance</h1>
                    <p className="text-neutral-400 text-lg leading-relaxed">La satisfaction de nos clients est notre plus belle récompense. Découvrez leurs retours sur l'expérience ROADSTAR.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative"
                        >
                            <Quote className="absolute top-8 right-8 text-neutral-800" size={48} />
                            <div className="text-primary mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-neutral-300 italic mb-8 leading-relaxed relative z-10">"{t.content}"</p>
                            <div className="flex items-center gap-4 border-t border-neutral-800 pt-6">
                                <div className="w-12 h-12 rounded-full bg-dark-lighter flex items-center justify-center font-bold text-primary border border-neutral-700 text-xl">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">{t.name}</h4>
                                    <span className="text-neutral-500 text-xs block">{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
