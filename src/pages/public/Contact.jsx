import { useState } from 'react';
import Seo from '../../components/ui/Seo';
import Button from '../../components/ui/Button';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { messagesAPI } from '../../services/api';
import contactImage from '../../assets/images/presentation/Nous Contacter.jpg';

export default function Contact() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        // Validation
        if (!formData.nom || !formData.email || !formData.message) {
            setStatus('error');
            setErrorMessage('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        try {
            await messagesAPI.sendContact(formData);
            setStatus('success');
            setFormData({ nom: '', prenom: '', email: '', telephone: '', message: '' });
        } catch (error) {
            console.error('Error sending contact message:', error);
            setStatus('error');
            setErrorMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        }
    };

    return (
        <div className="pt-32 min-h-screen bg-white pb-20">
            <Seo title="Contact" description="Contactez ROADSTAR pour vos besoins de location de voitures à Abidjan. Devis gratuit, assistance 24/7." path="/contact" />

            {/* Hero Contact - Image + Titre côte à côte */}
            <div className="container mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 block">Contact</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Parlons de votre projet</h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Une question ? Une demande spécifique ? Remplissez le formulaire ou contactez-nous directement. Notre équipe vous répondra dans les plus brefs délais.
                        </p>

                        {/* Coordonnées rapides */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 text-center hover:border-primary/30 hover:shadow-lg transition-all">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                                    <Phone size={18} />
                                </div>
                                <h3 className="text-gray-900 font-bold text-sm mb-1">Téléphone</h3>
                                <a href="tel:+2252722412842" className="text-gray-500 hover:text-primary transition-colors text-xs block">27 22 41 28 42</a>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 text-center hover:border-primary/30 hover:shadow-lg transition-all">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                                    <Mail size={18} />
                                </div>
                                <h3 className="text-gray-900 font-bold text-sm mb-1">Email</h3>
                                <a href="mailto:info@roadstar225.com" className="text-gray-500 hover:text-primary transition-colors text-xs block">info@roadstar225.com</a>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 text-center hover:border-primary/30 hover:shadow-lg transition-all">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                                    <MapPin size={18} />
                                </div>
                                <h3 className="text-gray-900 font-bold text-sm mb-1">Adresse</h3>
                                <p className="text-gray-500 text-xs">II Plateaux Vallons</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={contactImage}
                            alt="Nous Contacter - ROADSTAR"
                            loading="lazy"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Coordonnées détaillées + Formulaire */}
            <div className="bg-neutral-50 border-y border-neutral-100 py-20">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Info détaillée */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos coordonnées</h2>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-bold text-lg mb-2">Téléphone</h3>
                                    <a href="tel:+2252722412842" className="text-gray-600 hover:text-primary transition-colors block text-sm">(+225) 27 22 41 28 42</a>
                                    <a href="tel:+2250103117171" className="text-gray-600 hover:text-primary transition-colors block text-sm">(+225) 01 03 11 71 71</a>
                                    <a href="tel:+2250103121010" className="text-gray-600 hover:text-primary transition-colors block text-sm">(+225) 01 03 12 10 10</a>
                                    <a href="tel:+2250101050404" className="text-gray-600 hover:text-primary transition-colors block text-sm">(+225) 01 01 05 04 04</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-bold text-lg mb-2">Email</h3>
                                    <a href="mailto:roadstar225@gmail.com" className="text-gray-600 hover:text-primary transition-colors block text-sm">roadstar225@gmail.com</a>
                                    <a href="mailto:info@roadstar225.com" className="text-gray-600 hover:text-primary transition-colors block text-sm">info@roadstar225.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-bold text-lg mb-2">Adresse</h3>
                                    <p className="text-gray-600 text-sm">II Plateaux Vallons</p>
                                    <p className="text-gray-500 text-xs mb-1">Avenue Boga Doudou, Sens Ena - Paul</p>
                                    <p className="text-gray-500 text-xs">Abidjan, Côte d'Ivoire</p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="w-full h-64 bg-white rounded-2xl overflow-hidden relative border border-neutral-200 shadow-sm">
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-400 group-hover:text-primary transition-colors z-0">
                                <span className="flex items-center gap-2"><MapPin /> Carte Google Maps</span>
                            </div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15891.95460293774!2d-4.0083!3d5.3033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1c1badf6f36ab%3A0x1d7c041113612d!2sZone%204%2C%20Abidjan!5e0!3m2!1sen!2sci!4v1620000000000!5m2!1sen!2sci"
                                width="100%"
                                height="100%"
                                style={{ border: 0, opacity: 0.8, position: 'relative', zIndex: 1 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Map"
                            ></iframe>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-100 shadow-2xl shadow-neutral-200/50">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>

                        {status === 'success' ? (
                            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h4 className="text-green-900 font-bold text-lg mb-2">Message envoyé !</h4>
                                <p className="text-gray-600">Merci de nous avoir contactés. Nous vous répondrons très prochainement.</p>
                                <button onClick={() => setStatus('idle')} className="text-primary hover:text-gray-900 mt-4 text-sm font-medium transition-colors">Envoyer un autre message</button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup
                                        label="Nom"
                                        name="nom"
                                        placeholder="Votre nom"
                                        required
                                        value={formData.nom}
                                        onChange={handleChange}
                                    />
                                    <InputGroup
                                        label="Prénom"
                                        name="prenom"
                                        placeholder="Votre prénom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                    />
                                </div>
                                <InputGroup
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="votre@email.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <InputGroup
                                    label="Téléphone"
                                    name="telephone"
                                    type="tel"
                                    placeholder="+225..."
                                    value={formData.telephone}
                                    onChange={handleChange}
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message <span className="text-primary">*</span></label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-neutral-400 focus:ring-1 focus:ring-primary shadow-sm"
                                        placeholder="Comment pouvons-nous vous aider ?"
                                    ></textarea>
                                </div>


                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-500 text-sm">
                                        <AlertCircle size={16} /> {errorMessage || 'Veuillez remplir tous les champs obligatoires.'}
                                    </div>
                                )}


                                <Button
                                    variant="primary"
                                    className="w-full justify-center py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                                    {status !== 'submitting' && <Send size={18} className="ml-2" />}
                                </Button>
                            </form>
                        )}
                    </div>

                </div>
                </div>
            </div>
        </div>
    );
}

function InputGroup({ label, name, type = "text", placeholder, required, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-primary">*</span>}
            </label>
            <input
                type={type}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400 focus:ring-1 focus:ring-primary shadow-sm"
                placeholder={placeholder}
            />
        </div>
    );
}

InputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string
};

