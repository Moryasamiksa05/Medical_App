import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

export default mongoose.model('Appointment', appointmentSchema);
