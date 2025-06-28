import express from 'express';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

//  Get appointments for logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { userId, role } = req.user;

    const filter = role === 'patient'
      ? { patient: userId }
      : { doctor: userId };

    const appointments = await Appointment.find(filter)
      .populate('patient', '-password')
      .populate('doctor', '-password');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//  Create appointment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;
    const { userId } = req.user;

    if (!doctor || !date || !time || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const newAppointment = new Appointment({
      patient: userId,
      doctor,
      date: formattedDate,
      time,
      reason
    });

    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update appointment status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { userId, role } = req.user;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (role !== 'doctor' || appointment.doctor.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    appointment.status = status;
    appointment.updatedAt = new Date();
    await appointment.save();

    res.json({
      message: 'Appointment status updated',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
