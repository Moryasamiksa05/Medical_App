export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor';
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  experience: number;
  rating: number;
  location: string;
  fee: number;
  availability: TimeSlot[];
  about: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergencyContact?: string;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  reason: string;
  notes?: string;
  patient: Patient;
  doctor: Doctor;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}