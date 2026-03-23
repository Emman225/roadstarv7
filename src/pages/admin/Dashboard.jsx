import { useNavigate } from 'react-router-dom';
import { Car, MessageSquare, AlertCircle, TrendingUp, Users, CheckCircle, Clock, Plus, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Button from '../../components/ui/Button';

export default function Dashboard() {
    const navigate = useNavigate();
    const { stats, messages, vehicles } = useData();

    // Enhanced Stats
    const availableVehicles = vehicles.filter(v => v.available).length;
    const unavailableVehicles = vehicles.length - availableVehicles;
    const availabilityRate = vehicles.length > 0 ? Math.round((availableVehicles / vehicles.length) * 100) : 0;

    // Recent Messages (Last 5)
    // Create a safe copy of messages before sorting to avoid mutating state directly if useData returns a reference
    const recentMessages = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
                    <p className="text-gray-500 mt-1">Bienvenue sur votre espace d'administration.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => navigate('/admin/vehicles')} variant="outline" className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50">
                        Gérer le parc
                    </Button>
                    <Button onClick={() => navigate('/admin/vehicles')} variant="primary" className="text-sm shadow-md shadow-primary/20">
                        <Plus size={16} className="mr-2" /> Ajouter un véhicule
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Car}
                    label="Total Véhicules"
                    value={stats.totalVehicles}
                    subvalue="+2 ce mois"
                    color="bg-blue-500"
                    textColor="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Véhicules Disponibles"
                    value={availableVehicles}
                    subvalue={`${availabilityRate}% du parc`}
                    color="bg-green-500"
                    textColor="text-green-600"
                    bgColor="bg-green-50"
                />
                <StatCard
                    icon={MessageSquare}
                    label="Total Messages"
                    value={stats.totalMessages}
                    subvalue="Historique complet"
                    color="bg-purple-500"
                    textColor="text-purple-600"
                    bgColor="bg-purple-50"
                />
                <StatCard
                    icon={AlertCircle}
                    label="Nouveaux Messages"
                    value={stats.unreadMessages}
                    subvalue="Non lus"
                    color="bg-primary"
                    textColor="text-primary"
                    bgColor="bg-orange-50"
                    onClick={() => navigate('/admin/messages')}
                    cursor
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Messages Area */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <MessageSquare size={18} className="text-gray-400" /> Derniers Messages
                        </h2>
                        <Button onClick={() => navigate('/admin/messages')} variant="ghost" className="text-xs text-primary hover:bg-primary/5 h-8">
                            Voir tout <ArrowRight size={14} className="ml-1" />
                        </Button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentMessages.length > 0 ? (
                            recentMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    onClick={() => navigate(`/admin/messages/${msg.id}`)}
                                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${msg.status === 'unread' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                            {msg.nom.charAt(0)}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${msg.status === 'unread' ? 'text-gray-900' : 'text-gray-600'}`}>{msg.nom}</p>
                                            <p className="text-xs text-gray-400">{msg.sujet}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mb-1">{msg.date}</p>
                                        {msg.status === 'unread' && <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500 text-sm">Aucun message récent.</div>
                        )}
                    </div>
                </div>

                {/* Right Column: Fleet Status & Quick Actions */}
                <div className="space-y-8">
                    {/* Fleet Status */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <TrendingUp size={18} className="text-gray-400" /> État du Parc
                        </h2>

                        <div className="space-y-6">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-xs font-semibold uppercase text-green-600">Disponibles</div>
                                    <div className="text-xs font-bold text-green-600">{availableVehicles}</div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                                    <div style={{ width: `${availabilityRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"></div>
                                </div>
                            </div>

                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-xs font-semibold uppercase text-red-500">Indisponibles / Loués</div>
                                    <div className="text-xs font-bold text-red-500">{unavailableVehicles}</div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100">
                                    <div style={{ width: `${100 - availabilityRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-500"></div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-sm text-gray-500 text-center">
                                    Le parc est actuellement actif à <span className="font-bold text-gray-900">{availabilityRate}%</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Info Box */}
                    <div className="bg-primary/5 rounded-xl border border-primary/10 p-6">
                        <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                            <Clock size={18} /> Rappas
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            N'oubliez pas de mettre à jour la disponibilité des véhicules après chaque retour de location.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, subvalue, color, textColor, bgColor, onClick, cursor }) {
    return (
        <div
            onClick={onClick}
            className={`bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${cursor ? 'cursor-pointer' : ''}`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <span className="text-gray-500 text-sm font-medium">{label}</span>
                    <h3 className="text-3xl font-bold mt-2 text-gray-900">{value}</h3>
                    <p className={`text-xs mt-1 ${textColor} font-medium`}>{subvalue}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} ${textColor}`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
}
