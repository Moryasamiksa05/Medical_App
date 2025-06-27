import express from 'express';
import { appointments, users } from '../data/mockData.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get appointments for user
router.get('/', authenticateToken, (req, res) => {
  try {
    const { userId, role } = req.user;
    
    let userAppointments;
    if (role === 'patient') {
      userAppointments = appointments.filter(apt => apt.patientId === userId);
    } else {
      userAppointments = appointments.filter(apt => apt.doctorId === userId);
    }

    // Populate with user data
    const populatedAppointments = userAppointments.map(apt => {
      const patient = users.find(u => u.id === apt.patientId);
      const doctor = users.find(u => u.id === apt.doctorId);
      return {
        ...apt,
        patient: patient ? { ...patient, password: undefined } : null,
        doctor: doctor ? { ...doctor, password: undefined } : null,
      };
    });

    res.json(populatedAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create appointment
router.post('/', authenticateToken, (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const { userId } = req.user;

    const newAppointment = {
      id: Date.now().toString(),
      patientId: userId,
      doctorId,
      date: new Date(date),
      time,
      status: 'pending',
      reason,
      createdAt: new Date(),
    };

    appointments.push(newAppointment);

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update appointment status
router.patch('/:id/status', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { userId, role } = req.user;

    const appointment = appointments.find(apt => apt.id === id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Only doctors can approve/reject appointments
    if (role !== 'doctor' || appointment.doctorId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    appointment.status = status;
    appointment.updatedAt = new Date();

    res.json({
      message: 'Appointment status updated',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;