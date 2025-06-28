import axios from 'axios';

const API_BASE_URL = 'https://medical-app-7x4y.onrender.com';

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
  login: (email: string, password: string, role: 'doctor' | 'patient'): Promise<any> =>
    api.post('/api/auth/login', { email, password, role }),

  register: (userData: { name: string; email: string; password: string; role: 'doctor' | 'patient' }): Promise<any> =>
    api.post('/api/auth/register', userData),
};


// Appointments API
export const appointmentsAPI = {
  getAppointments: () => api.get('/api/appointments'),

 createAppointment: (appointmentData: any): Promise<any> =>
  api.post('/api/appointments', appointmentData),


updateAppointmentStatus: (id: string, status: string): Promise<any> =>
  api.patch(`/api/appointments/${id}/status`, { status }),

};

// Doctors API
export const doctorsAPI = {
  getDoctors: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/api/doctors${queryString ? `?${queryString}` : ''}`);
  },

getDoctorById: (id: string): Promise<any> =>
  api.get(`/api/doctors/${id}`),

};


export default api;