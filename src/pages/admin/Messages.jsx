import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Search, Trash, Eye, CheckCircle, MailOpen, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Messages() {
    const { messages, deleteMessage, markAsRead, loadingMessages } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, read

    const filteredMessages = messages.filter(m => {
        const matchesSearch = m.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.telephone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.sujet?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ? true : m.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();

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
                await deleteMessage(id);
                Swal.fire({
                    title: "Supprimé!",
                    text: "Le message a été supprimé.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
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
    }

    const handleMarkRead = async (id, e) => {
        e.stopPropagation();
        try {
            await markAsRead(id);
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Messages</h1>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full md:w-64 placeholder-gray-400"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                        <option value="all">Tous les messages</option>
                        <option value="unread">Non lus</option>
                        <option value="read">Lus</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {filteredMessages.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <MailOpen size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Aucun message trouvé.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredMessages.map((message) => (
                            <Link
                                to={`/admin/messages/${message.id}`}
                                key={message.id}
                                className={`block p-4 md:p-6 hover:bg-gray-50 transition-colors group ${message.status === 'unread' ? 'bg-primary/5' : ''}`}
                                onClick={() => markAsRead(message.id)}
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${message.status === 'unread' ? 'bg-primary' : 'bg-transparent'}`} />

                                        <div>
                                            <div className="flex items-baseline gap-3 mb-1">
                                                <h3 className={`text-base ${message.status === 'unread' ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                    {message.nom}
                                                </h3>
                                                <span className="text-xs text-gray-500">{message.email}</span>
                                                {message.telephone && <span className="text-xs text-gray-400 font-medium">• {message.telephone}</span>}
                                            </div>
                                            <p className={`text-sm mb-1 ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-500'}`}>{message.sujet}</p>
                                            <p className="text-xs text-gray-400 line-clamp-1">{message.message}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-4 md:w-48 flex-shrink-0">
                                        <span className="text-xs text-gray-400 whitespace-nowrap">{message.date}</span>

                                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            {message.status === 'unread' && (
                                                <button
                                                    onClick={(e) => handleMarkRead(message.id, e)}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                                                    title="Marquer comme lu"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => handleDelete(message.id, e)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
