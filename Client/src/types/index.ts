export interface Appointment {
  _id: string;
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

export interface User {
  _id: string;
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
