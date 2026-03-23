import { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Car, MessageSquare, LayoutDashboard, LogOut, Bell, ChevronDown, User, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { authAPI } from '../services/api';
import logo from '../assets/images/New_logo-RoadStar_blanc.png';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUnreadCount, fetchMessages } = useData();
    const unreadCount = getUnreadCount();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            navigate('/admin');
        } else {
            // Charger les messages au montage de l'admin
            fetchMessages();
        }
        // Utilisation d'un tableau vide pour ne charger qu'une fois au montage
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('user');
            navigate('/admin');
        }
    };

    return (
        <div className="h-screen overflow-hidden bg-gray-50 text-gray-900 flex">
            {/* Sidebar - Dark Theme */}
            <aside className="w-64 bg-neutral-900 text-white border-r border-neutral-800 flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-neutral-800 flex items-center gap-2 flex-shrink-0">
                    <div className="cursor-pointer" onClick={() => navigate('/')}>
                        <img src={logo} alt="ROADSTAR" className="h-10 w-auto object-contain" />
                    </div>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded uppercase font-bold tracking-wider">Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Tableau de bord" active={location.pathname === '/admin/dashboard'} />
                    <NavItem to="/admin/vehicles" icon={Car} label="Véhicules" active={location.pathname.startsWith('/admin/vehicles')} />
                    <NavItem to="/admin/testimonials" icon={MessageCircle} label="Témoignages" active={location.pathname.startsWith('/admin/testimonials')} />
                    <NavItem
                        to="/admin/messages"
                        icon={MessageSquare}
                        label="Messages"
                        active={location.pathname.startsWith('/admin/messages')}
                        badge={unreadCount > 0 ? unreadCount : null}
                    />
                </nav>
                {/* Logout removed from here */}
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header mobile & desktop stats */}
                {/* Header mobile & desktop stats */}
                <header className="bg-primary shadow-md p-4 sticky top-0 z-30 flex justify-between items-center md:justify-end text-white">
                    <div className="md:hidden font-bold text-lg text-white">
                        ROAD<span className="text-white">STAR</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link to="/admin/messages" className="relative text-white/80 hover:text-white transition-colors">
                            <Bell size={24} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-primary">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>

                        {/* User Dropdown */}
                        <div className="relative pl-6 border-l border-white/20" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary font-bold">A</div>
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className="text-sm font-medium text-white">Admin</span>
                                </div>
                                <ChevronDown size={16} className={`text-white/80 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 text-gray-900">
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                        <p className="text-sm font-bold text-gray-900">Administrateur</p>
                                        <p className="text-xs text-gray-500">admin@roadstar225.com</p>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <LogOut size={16} /> Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function NavItem({ to, icon: Icon, label, active, badge }) {
    return (
        <Link to={to} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${active ? 'bg-primary/20 text-primary font-medium' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
            <div className="flex items-center gap-3">
                <Icon size={20} />
                <span className="font-medium">{label}</span>
            </div>
            {badge && (
                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>
            )}
        </Link>
    );
}
