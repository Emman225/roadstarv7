import axios from 'axios';

// Configuration de base
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expiré ou invalide
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/admin';
        }
        return Promise.reject(error);
    }
);

// === AUTH ===
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
    refresh: () => api.post('/auth/refresh'),
};

// === VEHICLES (Public) ===
export const vehiclesAPI = {
    getAll: () => api.get('/vehicles'),
    getAvailable: () => api.get('/vehicles/available'),
    getFeatured: () => api.get('/vehicles/featured'),
    getOne: (id) => api.get(`/vehicles/${id}`),
};

// === VEHICLES ADMIN ===
export const vehiclesAdminAPI = {
    create: (data) => api.post('/admin/vehicles', data),
    update: (id, data) => api.post(`/admin/vehicles/${id}`, data),
    delete: (id) => api.delete(`/admin/vehicles/${id}`),
    getStats: () => api.get('/admin/vehicles/stats'),
};

// === MESSAGES (Public) ===
export const messagesAPI = {
    sendContact: (data) => api.post('/messages/contact', data),
    sendReservation: (data) => api.post('/messages/reservation', data),
};

// === MESSAGES ADMIN ===
export const messagesAdminAPI = {
    getAll: () => api.get('/admin/messages'),
    getOne: (id) => api.get(`/admin/messages/${id}`),
    getByType: (type) => api.get(`/admin/messages/type/${type}`),
    getStats: () => api.get('/admin/messages/stats'),
    getUnreadCount: () => api.get('/admin/messages/unread-count'),
    markAsRead: (id) => api.put(`/admin/messages/${id}/read`),
    markAsUnread: (id) => api.put(`/admin/messages/${id}/unread`),
    delete: (id) => api.delete(`/admin/messages/${id}`),
};

// === TESTIMONIALS (Public) ===
export const testimonialsAPI = {
    getAll: () => api.get('/testimonials'),
};

// === TESTIMONIALS ADMIN ===
export const testimonialsAdminAPI = {
    getAll: () => api.get('/admin/testimonials'),
    create: (data) => api.post('/admin/testimonials', data),
    update: (id, data) => api.post(`/admin/testimonials/${id}`, { ...data, _method: 'PUT' }),
    delete: (id) => api.delete(`/admin/testimonials/${id}`),
};

export default api;
