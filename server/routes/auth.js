import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    console.log(' Register endpoint hit');
    const { name, email, password, role, phone, specialization } = req.body;
    console.log('📩 Incoming Data:', req.body);

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn('⚠️ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('🔐 Password hashed');

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      specialization: role === 'doctor' ? specialization : undefined,
    });

    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is missing in environment!');
      return res.status(500).json({ message: 'Server misconfigured (JWT)' });
    }

    const token = jwt.sign(
      { userId: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = savedUser._doc;
    res.status(201).json({
      message: 'User created successfully',
      user: userData,
      token,
    });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('🔐 Login Attempt:', req.body);

    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is missing in environment!');
      return res.status(500).json({ message: 'Server misconfigured (JWT)' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user._doc;
    res.json({ message: 'Login successful', user: userData, token });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
