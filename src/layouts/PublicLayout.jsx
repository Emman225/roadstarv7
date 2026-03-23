import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-white">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
