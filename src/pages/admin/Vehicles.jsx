import { useState } from 'react';
import { Plus, Edit, Trash, X, Save, Upload, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Button from '../../components/ui/Button';
import Swal from 'sweetalert2';
import DataTable from '../../components/ui/DataTable';

export default function AdminVehicles() {
    const { vehicles, addVehicle, updateVehicle, deleteVehicle, loadingVehicles } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const initialFormState = {
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        license_plate: '',
        color: '',
        mileage: 0,
        fuel_type: 'Essence',
        transmission: 'Automatique',
        seats: 5,
        daily_rate: '',
        status: 'available',
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
        description: '',
        category: 'Berlines',
        features: []
    };

    const [newFeature, setNewFeature] = useState('');

    const [formData, setFormData] = useState(initialFormState);

    const openModal = (vehicle = null) => {
        setNewFeature('');
        setImageFile(null);
        setImagePreview(null);

        if (vehicle) {
            setEditingVehicle(vehicle);
            setImageMode('url');

            // Proactively clean the vehicle object to remove appends/calculated fields
            const cleanVehicle = { ...vehicle };
            const appends = ['name', 'price', 'passengers', 'fuel', 'featured', 'available', 'type'];
            appends.forEach(prop => delete cleanVehicle[prop]);

            setFormData({
                ...cleanVehicle,
                daily_rate: vehicle.daily_rate?.toString().split('.')[0] || '',
                mileage: vehicle.mileage !== undefined && vehicle.mileage !== null ? parseInt(vehicle.mileage) : 0,
                color: vehicle.color || '',
                seats: parseInt(vehicle.seats) || 5,
                year: parseInt(vehicle.year) || new Date().getFullYear(),
                brand: vehicle.brand || '',
                model: vehicle.model || '',
                category: vehicle.category || 'Berlines',
                features: Array.isArray(vehicle.features) ? vehicle.features : []
            });
        } else {
            setEditingVehicle(null);
            setImageMode('url');
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setImageMode('upload');
        }
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature('');
        }
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Prepare FormData - Only send raw database fields
        const submitData = new FormData();

        // Add method spoofing for Laravel (MUST be POST for multipart/form-data to work with PUT)
        if (editingVehicle) {
            submitData.append('_method', 'PUT');
        }

        // Only these fields will be sent to the backend
        const dbFields = [
            'brand', 'model', 'year', 'license_plate', 'color', 'mileage',
            'fuel_type', 'transmission', 'seats', 'daily_rate', 'status',
            'is_featured', 'description', 'category'
        ];

        dbFields.forEach(key => {
            let value = formData[key];
            if (value !== undefined && value !== null) {
                if (key === 'is_featured') {
                    submitData.append('is_featured', formData.is_featured ? '1' : '0');
                } else if (['year', 'mileage', 'seats', 'daily_rate'].includes(key)) {
                    // Critical: Remove any spaces or formatting that could break 'numeric' validation
                    const cleanValue = value.toString().replace(/[^0-9.]/g, '');
                    submitData.append(key, cleanValue);
                } else {
                    submitData.append(key, value);
                }
            }
        });

        // Features array
        if (Array.isArray(formData.features)) {
            formData.features.forEach(f => {
                if (f.trim()) submitData.append('features[]', f.trim());
            });
        }

        // Image Handling
        if (imageMode === 'upload' && imageFile) {
            submitData.append('image', imageFile);
        } else if (formData.image) {
            submitData.append('image', formData.image);
        }

        // Debug: See exactly what is being sent
        console.log('Sending Vehicle Data:');
        for (let pair of submitData.entries()) {
            console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File (${pair[1].name})` : pair[1]));
        }

        try {
            if (editingVehicle) {
                await updateVehicle(editingVehicle.id, submitData);
                Swal.fire({
                    title: "Modifié!",
                    text: "Le véhicule a bien été modifié.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
            } else {
                await addVehicle(submitData);
                Swal.fire({
                    title: "Ajouté!",
                    text: "Le nouveau véhicule a été ajouté avec succès.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving vehicle:', error);

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
                await deleteVehicle(id);
                Swal.fire({
                    title: "Supprimé!",
                    text: "Le véhicule a été supprimé.",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
            } catch (error) {
                console.error('Error deleting vehicle:', error);
                Swal.fire({
                    title: "Erreur!",
                    text: error.response?.data?.message || "Impossible de supprimer le véhicule.",
                    icon: "error",
                    confirmButtonColor: "#ef4444"
                });
            }
        }
    };

    // Define columns for DataTable
    const columns = [
        {
            header: "Véhicule",
            accessor: "brand", // Used for search/sort
            sortable: true,
            render: (vehicle) => (
                <div className="flex items-center gap-4">
                    <div className="w-16 h-10 rounded bg-gray-200 overflow-hidden relative flex-shrink-0">
                        <img src={vehicle.image} alt={vehicle.brand} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-gray-900 truncate">{vehicle.brand} {vehicle.model}</span>
                        <span className="text-xs text-gray-500 truncate">{vehicle.category} • {vehicle.year} • {vehicle.fuel_type}</span>
                        {vehicle.is_featured && <span className="text-xs text-primary font-medium flex items-center gap-1">★ Mis en avant</span>}
                    </div>
                </div>
            )
        },
        {
            header: "Immatriculation",
            accessor: "license_plate",
            sortable: true,
            className: "hidden md:table-cell",
            render: (vehicle) => (
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{vehicle.license_plate}</span>
            )
        },
        {
            header: "Prix / Jour",
            accessor: "daily_rate",
            sortable: true,
            render: (vehicle) => (
                <span className="text-gray-900 font-bold">{vehicle.price}</span>
            )
        },
        {
            header: "Statut",
            accessor: "status",
            sortable: true,
            headerClassName: "justify-center",
            className: "text-center",
            render: (vehicle) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${vehicle.status === 'available' ? 'bg-green-100 text-green-700' :
                    vehicle.status === 'rented' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {vehicle.status === 'available' ? 'Disponible' :
                        vehicle.status === 'rented' ? 'Loué' :
                            vehicle.status === 'maintenance' ? 'Maintenance' : 'Réservé'}
                </span>
            )
        },
        {
            header: "Actions",
            headerClassName: "justify-end",
            className: "text-right",
            render: (vehicle) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => openModal(vehicle)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Modifier"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(vehicle.id)}
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
                <h1 className="text-3xl font-bold text-gray-900">Gestion de la Flotte</h1>
                <Button onClick={() => openModal()} variant="primary" className="py-2 px-4 text-sm flex items-center gap-2">
                    <Plus size={16} /> Ajouter un véhicule
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={vehicles}
                title="Liste des Véhicules"
                exportFileName="flotte_roadstar"
                searchPlaceholder="Rechercher par marque, modèle, immatriculation..."
            />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">{editingVehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputGroup label="Marque" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} placeholder="ex: Mercedes" />
                                <InputGroup label="Modèle" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} placeholder="ex: Classe S" />
                                <InputGroup label="Année" type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputGroup label="Immatriculation" value={formData.license_plate} onChange={e => setFormData({ ...formData, license_plate: e.target.value })} placeholder="ex: 1234 AB 01" />
                                <InputGroup label="Couleur" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} placeholder="ex: Noir" />
                                <InputGroup label="Kilométrage" type="number" value={formData.mileage} onChange={e => setFormData({ ...formData, mileage: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Carburant</label>
                                    <select
                                        value={formData.fuel_type}
                                        onChange={e => setFormData({ ...formData, fuel_type: e.target.value })}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    >
                                        <option value="Essence">Essence</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybride">Hybride</option>
                                        <option value="Electrique">Électrique</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Transmission</label>
                                    <select
                                        value={formData.transmission}
                                        onChange={e => setFormData({ ...formData, transmission: e.target.value })}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    >
                                        <option value="Automatique">Automatique</option>
                                        <option value="Manuelle">Manuelle</option>
                                    </select>
                                </div>
                                <InputGroup label="Places" type="number" value={formData.seats} onChange={e => setFormData({ ...formData, seats: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Prix / Jour (FCFA)" type="number" value={formData.daily_rate} onChange={e => setFormData({ ...formData, daily_rate: e.target.value })} />
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Statut</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    >
                                        <option value="available">Disponible</option>
                                        <option value="rented">Loué</option>
                                        <option value="maintenance">Maintenance</option>
                                        <option value="reserved">Réservé</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    >
                                        <option value="Berlines">Berlines</option>
                                        <option value="4x4">4x4</option>
                                        <option value="S.U.V">S.U.V</option>
                                        <option value="PickUp">PickUp</option>
                                        <option value="Mini Van / Car">Mini Van / Car</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} className="rounded text-primary focus:ring-primary border-gray-300 w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Mettre ce véhicule en vedette (Hero Slider & Featured Section)</span>
                                </label>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <label className="block text-sm font-bold text-gray-900">Image du véhicule</label>

                                <div className="flex p-1 bg-gray-100 rounded-lg w-fit mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setImageMode('url')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${imageMode === 'url' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Lien URL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageMode('upload')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${imageMode === 'upload' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Téléverser
                                    </button>
                                </div>

                                {imageMode === 'url' ? (
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <InputGroup
                                                label="URL de l'image"
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>
                                        {formData.image && (
                                            <div className="w-24 h-24 mt-6 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-8 px-4 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all group">
                                                <Upload className="text-gray-400 group-hover:text-primary mb-2" size={32} />
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-primary">Cliquez pour choisir une image</span>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </label>

                                            {(imagePreview || formData.image) && (
                                                <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-100 relative group">
                                                    <img src={imagePreview || formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <span className="text-[10px] text-white font-bold">Aperçu</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {imageFile && <p className="text-xs text-green-600 flex items-center gap-1 font-medium"><Check size={14} /> Fichier prêt : {imageFile.name}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <label className="block text-sm font-bold text-gray-900">Équipements & Options</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newFeature}
                                        onChange={e => setNewFeature(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                        placeholder="ex: GPS, Caméra de recul..."
                                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                                    />
                                    <Button type="button" onClick={addFeature} variant="outline" className="py-2 px-4 shadow-none border-gray-300">
                                        Ajouter
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.features.map((feature, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                                            {feature}
                                            <button type="button" onClick={() => removeFeature(index)} className="hover:text-red-600 ml-1">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    {formData.features.length === 0 && (
                                        <p className="text-xs text-gray-400 italic">Aucun équipement ajouté.</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-gray-100">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="Détails supplémentaires sur le véhicule..."
                                ></textarea>
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
                required={type !== 'number'}
            />
        </div>
    );
}
