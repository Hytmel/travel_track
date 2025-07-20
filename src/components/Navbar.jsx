import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Logo,EnglishFlag } from './Icons.jsx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/my-trips', label: 'My Trips' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed top-4 z-50 left-4 right-4 rounded-[46px] border border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[60px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo />
            <span className="text-xl font-normal text-[#3ABEFF] font-poppins">TravelTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md transition-colors font-poppins text-base ${
                  isActive(link.path)
                    ? 'text-[#3ABEFF] bg-sky-50 font-bold'
                    : 'text-[#3ABEFF] hover:text-[#3ABEFF] hover:bg-gray-50 font-normal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <EnglishFlag className="w-6 h-6" />
              <span className="text-[#3ABEFF] font-normal text-base font-poppins">EN</span>
              <svg className="w-4 h-4 text-[#3ABEFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Log in Button */}
            <Link
              to="/login"
              className="px-4 py-2 text-[#3ABEFF] border border-[#3ABEFF] rounded-full hover:bg-[#3ABEFF] hover:text-white transition-colors duration-500 font-normal text-base font-poppins"
            >
              Log in
            </Link>
            
            {/* Sign up Button */}
            <Link
              to="/signup"
              className="px-4 py-2 bg-[#3ABEFF] text-white rounded-full hover:bg-[#3ABEFF]/90 transition-colors font-normal text-base font-poppins"
            >
              Sign up for free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md transition-colors font-poppins text-base ${
                    isActive(link.path)
                      ? 'text-[#3ABEFF] bg-sky-50 font-bold'
                      : 'text-[#3ABEFF] hover:text-[#3ABEFF] hover:bg-gray-50 font-normal'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-200">
                {/* Language Selector */}
                <div className="flex items-center space-x-2 px-3 py-2 cursor-pointer">
                  <EnglishFlag className="w-6 h-6" />
                  <span className="text-[#3ABEFF] font-normal text-base font-poppins">EN</span>
                  <svg className="w-4 h-4 text-[#3ABEFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <Link
                  to="/login"
                  className="block px-3 py-2 text-[#3ABEFF] border border-[#3ABEFF] rounded-full mx-3 mt-2 text-center font-normal text-base font-poppins hover:bg-[#3ABEFF] hover:text-white transition-colors duration-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block mx-3 mt-2 px-4 py-2 bg-[#3ABEFF] text-white text-center font-normal text-base font-poppins rounded-full hover:bg-[#3ABEFF]/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 