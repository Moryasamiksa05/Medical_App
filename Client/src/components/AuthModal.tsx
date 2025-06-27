import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (mode === 'signin') {
        success = await login(formData.email, formData.password, selectedRole);
      } else {
        success = await register({
          ...formData,
          role: selectedRole,
        });
      }

      if (success) {
        onClose();
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {mode === 'signin' ? 'Welcome Back' : 'Join EternityCare'}
          </h2>
          <p className="text-gray-600 text-center mt-2">
            {mode === 'signin' ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        <div className="p-6">
          {/* Role Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              I am a...
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Patient Option */}
              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === 'patient'
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedRole === 'patient' ? 'bg-blue-600' : 'bg-gray-400'
                  }`}>
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">Patient</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Book appointments and manage your health
                    </p>
                  </div>
                </div>
              </button>

              {/* Doctor Option */}
              <button
                type="button"
                onClick={() => setSelectedRole('doctor')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === 'doctor'
                    ? 'border-teal-500 bg-teal-50 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedRole === 'doctor' ? 'bg-teal-600' : 'bg-gray-400'
                  }`}>
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">Doctor</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage appointments and patient care
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div className={mode === 'signin' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className={mode === 'signin' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {selectedRole === 'doctor' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization
                      </label>
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select your specialization</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Gastroenterology">Gastroenterology</option>
                        <option value="General Practice">General Practice</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Psychiatry">Psychiatry</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-colors ${
                selectedRole === 'patient'
                  ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
                  : 'bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400'
              }`}
            >
              {loading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() => window.location.reload()} // Simple way to switch modes
                  className={`ml-1 font-medium ${
                    selectedRole === 'patient' ? 'text-blue-600 hover:text-blue-700' : 'text-teal-600 hover:text-teal-700'
                  }`}
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;