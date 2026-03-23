import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Vehicles from './pages/public/Vehicles';
import Testimonials from './pages/public/Testimonials';
import Contact from './pages/public/Contact';
import MentionsLegales from './pages/public/MentionsLegales';
import Confidentialite from './pages/public/Confidentialite';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminVehicles from './pages/admin/Vehicles';
import Messages from './pages/admin/Messages';
import MessageDetails from './pages/admin/messages/MessageDetails';
import AdminTestimonials from './pages/admin/Testimonials';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="a-propos" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="vehicules" element={<Vehicles />} />
            <Route path="temoignages" element={<Testimonials />} />
            <Route path="contact" element={<Contact />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="confidentialite" element={<Confidentialite />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<MessageDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
