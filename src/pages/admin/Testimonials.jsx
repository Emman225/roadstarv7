import { useState } from 'react';
import { Plus, Edit, Trash, X, Save, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Button from '../../components/ui/Button';
import Swal from 'sweetalert2';
import DataTable from '../../components/ui/DataTable';

export default function AdminTestimonials() {
    const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, loadingTestimonials } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const initialFormState = {
        name: '',
        role: '',
        content: '',
        rating: 5,
        is_active: true
    };

    const [formData, setFormData] = useState(initialFormState);

    const openModal = (testimonial = null) => {
        if (testimonial) {
            setEditingTestimonial(testimonial);
            setFormData({
                name: testimonial.name || '',
                role: testimonial.role || '',
                content: testimonial.content || '',
                rating: testimonial.rating || 5,
                is_active: testimonial.is_active !== undefined ? Boolean(testimonial.is_active) : true
            });
        } else {
            setEditingTestimonial(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const submitData = {
            name: formData.name,
            role: formData.role,
            content: formData.content,
            rating: parseInt(formData.rating),
            is_active: formData.is_active ? 1 : 0
        };

        try {
            if (editingTestimonial) {
                await updateTestimonial(editingTestimonial.id, submitData);
                Swal.fire({
                    title: "Modifié!",
                    text: "Le témoignage a bien été modifié.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
            } else {
                await addTestimonial(submitData);
                Swal.fire({
                    title: "Ajouté!",
                    text: "Le nouveau témoignage a été ajouté avec succès.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving testimonial:', error);

            let errorMessage = "Une erreur est survenue lors de l'enregistrement.";

            if (error.response?.status === 422 && error.response.data.errors) {
                const errors = error.response.data.errors;
                errorMessage = Object.values(errors).flat().join('\n');
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                title: "Erreur!",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#ef4444"
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#374151",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler"
        });

        if (result.isConfirmed) {
            try {
                await deleteTestimonial(id);
                Swal.fire({
                    title: "Supprimé!",
                    text: "Le témoignage a été supprimé.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                Swal.fire({
                    title: "Erreur!",
                    text: error.response?.data?.message || "Impossible de supprimer le témoignage.",
                    icon: "error",
                    confirmButtonColor: "#ef4444"
                });
            }
        }
    };

    const columns = [
        {
            header: "Client",
            accessor: "name",
            sortable: true,
            render: (t) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm border border-primary/20 flex-shrink-0">
                        {t.name?.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-gray-900 truncate">{t.name}</span>
                        <span className="text-xs text-gray-500 truncate">{t.role}</span>
                    </div>
                </div>
            )
        },
        {
            header: "Témoignage",
            accessor: "content",
            sortable: false,
            render: (t) => (
                <p className="text-gray-600 text-sm truncate max-w-xs" title={t.content}>
                    {t.content?.length > 80 ? t.content.substring(0, 80) + '...' : t.content}
                </p>
            )
        },
        {
            header: "Note",
            accessor: "rating",
            sortable: true,
            headerClassName: "justify-center",
            className: "text-center",
            render: (t) => (
                <div className="flex items-center justify-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? 'text-primary fill-primary' : 'text-gray-300'} />
                    ))}
                </div>
            )
        },
        {
            header: "Statut",
            accessor: "is_active",
            sortable: true,
            headerClassName: "justify-center",
            className: "text-center",
            render: (t) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.is_active ? 'Actif' : 'Inactif'}
                </span>
            )
        },
        {
            header: "Actions",
            headerClassName: "justify-end",
            className: "text-right",
            render: (t) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => openModal(t)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Modifier"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(t.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Témoignages</h1>
                <Button onClick={() => openModal()} variant="primary" className="py-2 px-4 text-sm flex items-center gap-2">
                    <Plus size={16} /> Ajouter un témoignage
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={testimonials}
                title="Liste des Témoignages"
                exportFileName="temoignages_roadstar"
                searchPlaceholder="Rechercher par nom, rôle, contenu..."
            />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">{editingTestimonial ? 'Modifier le témoignage' : 'Ajouter un témoignage'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Nom du client" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="ex: Jean-Marc Kouassi" />
                                <InputGroup label="Rôle / Fonction" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="ex: Directeur Commercial" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Témoignage</label>
                                <textarea
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    rows={4}
                                    required
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-gray-400"
                                    placeholder="Le témoignage du client..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Note</label>
                                    <div className="flex items-center gap-1 py-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="p-1 hover:scale-110 transition-transform"
                                            >
                                                <Star
                                                    size={24}
                                                    className={star <= formData.rating ? 'text-primary fill-primary' : 'text-gray-300'}
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-2 text-sm text-gray-500">{formData.rating}/5</span>
                                    </div>
                                </div>

                                <div className="space-y-2 flex items-end pb-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_active}
                                            onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                            className="rounded text-primary focus:ring-primary border-gray-300 w-4 h-4"
                                        />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Afficher sur le site</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                                <Button type="button" onClick={() => setIsModalOpen(false)} variant="ghost" className="bg-gray-100 text-gray-700 hover:bg-gray-200" disabled={submitting}>Annuler</Button>
                                <Button type="submit" variant="primary" className="flex items-center gap-2 shadow-lg shadow-primary/20" disabled={submitting}>
                                    <Save size={18} /> {submitting ? 'Enregistrement...' : 'Enregistrer'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function InputGroup({ label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-gray-400"
                required
            />
        </div>
    );
}
