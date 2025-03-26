import React, { useState } from 'react';
import { Menu, X, Home, User, Settings, Mail } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { icon: <Home />, text: 'Home', href: '/' },
    { icon: <User />, text: 'Profile', href: '/profile' },
    { icon: <Settings />, text: 'Settings', href: '/settings' },
    { icon: <Mail />, text: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Snaply</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md flex items-center space-x-2"
              >
                {item.icon}
                <span>{item.text}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;