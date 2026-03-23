import { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle } from 'lucide-react';
import Button from './Button';
import { messagesAPI } from '../../services/api';
import PropTypes from 'prop-types';

export default function ReservationModal({ isOpen, onClose, vehicleName }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: vehicleName ? `Je souhaite réserver le véhicule : ${vehicleName}` : ''
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        if (!formData.nom || !formData.email || !formData.message) {
            setStatus('error');
            setErrorMessage('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        try {
            await messagesAPI.sendReservation({
                ...formData,
                vehicle_name: vehicleName
            });
            setStatus('success');
        } catch (error) {
            console.error('Error sending reservation:', error);
            setStatus('error');
            setErrorMessage('Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
        }
    };

    const resetForm = () => {
        setFormData({ nom: '', prenom: '', email: '', telephone: '', message: '' });
        setStatus('idle');
        setErrorMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl border border-neutral-100 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-gray-900 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Réserver votre véhicule</h3>
                    {vehicleName && <p className="text-primary font-medium mb-6">Véhicule sélectionné : {vehicleName}</p>}

                    {status === 'success' ? (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center my-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h4 className="text-green-900 font-bold text-lg mb-2">Demande envoyée !</h4>
                            <p className="text-gray-600 mb-6">Merci de votre intérêt. Notre équipe vous recontactera très rapidement pour confirmer votre réservation.</p>
                            <Button onClick={resetForm} variant="outline" className="text-sm border-neutral-200">
                                Fermer
                            </Button>
                        </div>
                    ) : (
                        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message <span className="text-primary">*</span></label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-neutral-400 focus:ring-1 focus:ring-primary shadow-sm"
                                    placeholder="Précisez vos besoins (dates, lieu de prise en charge...)"
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
                                {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer la demande'}
                                {status !== 'submitting' && <Send size={18} className="ml-2" />}
                            </Button>
                        </form>
                    )}
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

ReservationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    vehicleName: PropTypes.string
};

InputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
