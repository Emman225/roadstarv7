import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { vehiclesAPI, vehiclesAdminAPI, messagesAdminAPI, testimonialsAPI, testimonialsAdminAPI } from '../services/api';
import { vehicles as localVehicles } from '../data/vehicles';

const DataContext = createContext();

export function DataProvider({ children }) {
    // Vehicles State - Récupéré depuis l'API
    const [vehicles, setVehicles] = useState([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);

    // Messages State - Récupéré depuis l'API (admin uniquement)
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);

    // Testimonials State
    const [testimonials, setTestimonials] = useState([]);
    const [loadingTestimonials, setLoadingTestimonials] = useState(true);

    // Stats State
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalMessages: 0,
        unreadMessages: 0,
        totalTestimonials: 0
    });

    // Helper functions stabilized with useCallback
    const updateVehicleStats = useCallback((vehiclesList) => {
        setStats(prev => ({
            ...prev,
            totalVehicles: vehiclesList.length
        }));
    }, []);

    const updateMessageStats = useCallback((messagesList) => {
        setStats(prev => ({
            ...prev,
            totalMessages: messagesList.length,
            unreadMessages: messagesList.filter(m => m.status === 'unread').length
        }));
    }, []);

    const fetchVehicles = useCallback(async () => {
        try {
            setLoadingVehicles(true);
            const response = await vehiclesAPI.getAll();
            const data = response.data;
            if (Array.isArray(data) && data.length > 0) {
                setVehicles(data);
                updateVehicleStats(data);
            } else {
                setVehicles(localVehicles);
                updateVehicleStats(localVehicles);
            }
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            setVehicles(localVehicles);
            updateVehicleStats(localVehicles);
        } finally {
            setLoadingVehicles(false);
        }
    }, [updateVehicleStats]);

    const updateTestimonialStats = useCallback((testimonialsList) => {
        setStats(prev => ({
            ...prev,
            totalTestimonials: testimonialsList.length
        }));
    }, []);

    const fetchTestimonials = useCallback(async () => {
        try {
            setLoadingTestimonials(true);
            const response = await testimonialsAPI.getAll();
            const data = Array.isArray(response.data) ? response.data : response.data.data || [];
            setTestimonials(data);
            updateTestimonialStats(data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setTestimonials([]);
        } finally {
            setLoadingTestimonials(false);
        }
    }, [updateTestimonialStats]);

    const fetchMessages = useCallback(async () => {
        try {
            setLoadingMessages(true);
            const response = await messagesAdminAPI.getAll();
            setMessages(response.data);
            updateMessageStats(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        } finally {
            setLoadingMessages(false);
        }
    }, [updateMessageStats]);

    // Fetch initial data
    useEffect(() => {
        fetchVehicles();
        fetchTestimonials();
    }, [fetchVehicles, fetchTestimonials]);

    // --- Vehicle Actions ---
    const addVehicle = useCallback(async (vehicle) => {
        try {
            const response = await vehiclesAdminAPI.create(vehicle);
            await fetchVehicles(); // Refresh list
            return response.data;
        } catch (error) {
            console.error('Error adding vehicle:', error);
            throw error;
        }
    }, [fetchVehicles]);

    const updateVehicle = useCallback(async (id, updatedVehicle) => {
        try {
            const response = await vehiclesAdminAPI.update(id, updatedVehicle);
            await fetchVehicles(); // Refresh list
            return response.data;
        } catch (error) {
            console.error('Error updating vehicle:', error);
            throw error;
        }
    }, [fetchVehicles]);

    const deleteVehicle = useCallback(async (id) => {
        try {
            await vehiclesAdminAPI.delete(id);
            await fetchVehicles(); // Refresh list
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            throw error;
        }
    }, [fetchVehicles]);

    // --- Testimonial Actions ---
    const addTestimonial = useCallback(async (testimonial) => {
        try {
            const response = await testimonialsAdminAPI.create(testimonial);
            await fetchTestimonials();
            return response.data;
        } catch (error) {
            console.error('Error adding testimonial:', error);
            throw error;
        }
    }, [fetchTestimonials]);

    const updateTestimonial = useCallback(async (id, updatedTestimonial) => {
        try {
            const response = await testimonialsAdminAPI.update(id, updatedTestimonial);
            await fetchTestimonials();
            return response.data;
        } catch (error) {
            console.error('Error updating testimonial:', error);
            throw error;
        }
    }, [fetchTestimonials]);

    const deleteTestimonial = useCallback(async (id) => {
        try {
            await testimonialsAdminAPI.delete(id);
            await fetchTestimonials();
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            throw error;
        }
    }, [fetchTestimonials]);

    // --- Message Actions ---
    const addMessage = useCallback(async (message) => {
        return message;
    }, []);

    const markAsRead = useCallback(async (id) => {
        try {
            await messagesAdminAPI.markAsRead(id);
            await fetchMessages(); // Refresh list
        } catch (error) {
            console.error('Error marking message as read:', error);
            throw error;
        }
    }, [fetchMessages]);

    const deleteMessage = useCallback(async (id) => {
        try {
            await messagesAdminAPI.delete(id);
            await fetchMessages(); // Refresh list
        } catch (error) {
            console.error('Error deleting message:', error);
            throw error;
        }
    }, [fetchMessages]);

    const getUnreadCount = useCallback(() => {
        return messages.filter(m => m.status === 'unread').length;
    }, [messages]);

    const value = useMemo(() => ({
        vehicles,
        messages,
        testimonials,
        stats,
        loadingVehicles,
        loadingMessages,
        loadingTestimonials,
        fetchVehicles,
        fetchMessages,
        fetchTestimonials,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addMessage,
        markAsRead,
        deleteMessage,
        getUnreadCount,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial
    }), [
        vehicles,
        messages,
        testimonials,
        stats,
        loadingVehicles,
        loadingMessages,
        loadingTestimonials,
        fetchVehicles,
        fetchMessages,
        fetchTestimonials,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addMessage,
        markAsRead,
        deleteMessage,
        getUnreadCount,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial
    ]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
