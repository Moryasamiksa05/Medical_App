import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['patient', 'doctor'] },
  phone: String,
  specialization: {
    type: String,
    required: function () {
      return this.role === 'doctor'; // only required if doctor
    }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
