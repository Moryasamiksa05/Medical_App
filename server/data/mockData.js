// Mock data for demo purposes
export const users = [
  {
    id: '1',
    name: 'Dr. KD Sharma',
    email: 'kd@gmail.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password123
    role: 'doctor',
    specialization: 'Cardiology',
    phone: '+910123456789',
    experience: 15,
    rating: 4.9,
    location: 'Delhi, India',
    fee: 200,
    about: 'Experienced cardiologist with expertise in preventive care and cardiac interventions.',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Dr. Dixit Saxena',
    email: 'dixit@gmail.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password123
    role: 'doctor',
    specialization: 'Dermatology',
    phone: '+910987654321',
    experience: 12,
    rating: 4.8,
    location: 'Mumbai, India',
    fee: 150,
    about: 'Board-certified dermatologist specializing in skin cancer prevention and cosmetic procedures.',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    name: 'Dr. Kajal Chaudhary',
    email: 'kajal@gmail.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password123
    role: 'doctor',
    specialization: 'Ophthalmology',
    phone: '+910123456789',
    experience: 8,
    rating: 4.9,
    location: 'Lucknow, India',
    fee: 120,
    about: 'Ophthalmologist specializing in pediatric eye care and vision development.',
    createdAt: new Date('2023-01-01'),
  },
];

export const appointments = [
  {
    id: '1',
    patientId: 'patient1',
    doctorId: '1',
    date: new Date('2024-01-15'),
    time: '10:00 AM',
    status: 'scheduled',
    reason: 'Annual checkup',
    createdAt: new Date(),
  },
  {
    id: '2',
    patientId: 'patient2',
    doctorId: '2',
    date: new Date('2024-01-20'),
    time: '2:30 PM',
    status: 'pending',
    reason: 'Skin consultation',
    createdAt: new Date(),
  },
];