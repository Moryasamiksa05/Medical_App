import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password, role) =>
    api.post('/auth/login', { email, password, role }),
  
  register: (userData) =>
    api.post('/auth/register', userData),
};

// Appointments API
export const appointmentsAPI = {
  getAppointments: () => api.get('/appointments'),
  
  createAppointment: (appointmentData) =>
    api.post('/appointments', appointmentData),
  
  updateAppointmentStatus: (id, status) =>
    api.patch(`/appointments/${id}/status`, { status }),
};

// Doctors API
export const doctorsAPI = {
  getDoctors: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/doctors${queryString ? `?${queryString}` : ''}`);
  },
  
  getDoctorById: (id) => api.get(`/doctors/${id}`),
};

export default api;