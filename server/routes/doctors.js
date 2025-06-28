import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all doctors with optional filters
router.get('/', async (req, res) => {
  try {
    const { specialty, search } = req.query;

    let query = { role: 'doctor' };

    if (specialty) {
      query.specialization = { $regex: new RegExp(specialty, 'i') };
    }

    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, 'i') } },
        { specialization: { $regex: new RegExp(search, 'i') } }
      ];
    }

    const doctors = await User.find(query).select('-password');

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' }).select('-password');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
