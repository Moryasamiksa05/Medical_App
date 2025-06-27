import express from 'express';
import { users } from '../data/mockData.js';

const router = express.Router();

// Get all doctors
router.get('/', (req, res) => {
  try {
    const { specialty, search } = req.query;
    
    let doctors = users.filter(user => user.role === 'doctor');
    
    if (specialty) {
      doctors = doctors.filter(doctor => 
        doctor.specialization?.toLowerCase() === specialty.toLowerCase()
      );
    }
    
    if (search) {
      doctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Remove passwords from response
    const doctorsResponse = doctors.map(({ password, ...doctor }) => doctor);
    
    res.json(doctorsResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const doctor = users.find(user => user.id === id && user.role === 'doctor');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const { password, ...doctorResponse } = doctor;
    res.json(doctorResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;