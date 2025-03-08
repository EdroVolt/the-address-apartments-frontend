import axios from 'axios';
import { ApartmentFormData, LoginFormData, RegisterFormData } from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  // Check if we're in the browser and if we have a token
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Apartments API
export const apartmentsApi = {
  // Get all apartments
  getAll: async () => {
    const response = await api.get('/apartments');
    return response.data;
  },
  
  // Get apartment by ID
  getById: async (id: number) => {
    const response = await api.get(`/apartments/${id}`);
    return response.data;
  },
  
  // Create new apartment (admin only)
  create: async (apartmentData: ApartmentFormData) => {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('name', apartmentData.name);
    formData.append('address', apartmentData.address);
    formData.append('description', apartmentData.description);
    formData.append('numberOfRooms', apartmentData.numberOfRooms.toString());
    formData.append('price', apartmentData.price.toString());
    
    if (apartmentData.image) {
      formData.append('image', apartmentData.image);
    }
    
    const response = await api.post('/apartments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  // Update apartment (admin only)
  update: async (id: number, apartmentData: ApartmentFormData) => {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('name', apartmentData.name);
    formData.append('address', apartmentData.address);
    formData.append('description', apartmentData.description);
    formData.append('numberOfRooms', apartmentData.numberOfRooms.toString());
    formData.append('price', apartmentData.price.toString());
    
    if (apartmentData.image) {
      formData.append('image', apartmentData.image);
    }
    
    const response = await api.patch(`/apartments/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  // Delete apartment (admin only)
  delete: async (id: number) => {
    const response = await api.delete(`/apartments/${id}`);
    return response.data;
  },
};

// Auth API
export const authApi = {
  // Register new user
  register: async (userData: RegisterFormData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  // Login user
  login: async (credentials: LoginFormData) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export default api;