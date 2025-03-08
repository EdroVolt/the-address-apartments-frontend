// Define types for our application

export interface Apartment {
  id: number;
  name: string;
  address: string;
  description: string;
  numberOfRooms: number;
  price: string;
  isAvailable: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApartmentFormData {
  name: string;
  address: string;
  description: string;
  numberOfRooms: number;
  price: number;
  image: File | null;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}