import React, { useState } from 'react';
import { Menu, X, User, Calendar, Stethoscope, LogOut, Home, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' } | null>(null);
  const { user, isAuthenticated, logout } = useAuth();

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">EternityCare</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => scrollToSection('dashboard')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{user?.name}</span>
                    <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => scrollToSection('home')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('doctors')}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Doctors
                  </button>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthClick('signup')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 mt-4 pt-4">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => scrollToSection('dashboard')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 w-full p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection('home')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('doctors')}
                    className="w-full text-left text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Doctors
                  </button>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="w-full text-left text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Contact</span>
                  </button>
                  <div className="border-t border-gray-200 pt-3 space-y-2">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="w-full text-gray-600 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthClick('signup')}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal
          isOpen={authModal.isOpen}
          mode={authModal.mode}
          onClose={() => setAuthModal(null)}
        />
      )}
    </>
  );
};

export default Header;