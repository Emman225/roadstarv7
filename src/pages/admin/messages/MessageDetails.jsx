import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash, Mail, User, Calendar, Clock, Phone } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import Button from '../../../components/ui/Button';
import Swal from 'sweetalert2';

export default function MessageDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { messages, deleteMessage } = useData();

    const message = messages.find(m => m.id === parseInt(id));

    if (!message) {
        return <div className="text-gray-900">Message introuvable</div>;
    }

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Ce message sera définitivement supprimé.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#374151",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler"
        });

        if (result.isConfirmed) {
            try {
                await deleteMessage(message.id);
                await Swal.fire({
                    title: "Supprimé!",
                    text: "Le message a été supprimé.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
                navigate('/admin/messages');
            } catch (error) {
                console.error('Error deleting message:', error);
                Swal.fire({
                    title: "Erreur!",
                    text: error.response?.data?.message || "Impossible de supprimer le message.",
                    icon: "error",
                    confirmButtonColor: "#ef4444"
                });
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/admin/messages')} className="p-2 bg-white rounded-full hover:bg-gray-100 border border-gray-200 text-gray-700 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Détails du message</h1>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                            {message.nom.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{message.sujet}</h2>
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                                <span className="flex items-center gap-2"><User size={14} /> {message.nom}</span>
                                <span className="flex items-center gap-2"><Mail size={14} /> {message.email}</span>
                                {message.telephone && (
                                    <a href={`tel:${message.telephone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                                        <Phone size={14} /> {message.telephone}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-sm text-gray-400">
                        <span className="flex items-center gap-2"><Calendar size={14} /> {message.date}</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">ID: #{message.id}</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 min-h-[300px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                    <Button onClick={handleDelete} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
                        <Trash size={18} className="mr-2" /> Supprimer
                    </Button>
                    <Button href={`mailto:${message.email}`} variant="primary">
                        <Mail size={18} className="mr-2" /> Répondre
                    </Button>
                </div>
            </div>
        </div>
    );
}
