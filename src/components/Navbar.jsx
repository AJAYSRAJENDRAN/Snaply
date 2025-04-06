import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, User, MessageCircle, PlusSquare } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { icon: <Home />, text: 'Home', to: '/' },
    { icon: <MessageCircle />, text: 'Messages', to: '/messages' },
    { icon: <PlusSquare />, text: 'Create', to: '/create' },
    { icon: <User />, text: 'Profile', to: '/profile' }
  ];

  return (
    <nav className="bg-gray-900 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-400">Snaply</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md flex items-center space-x-2"
              >
                {React.cloneElement(item.icon, { className: "text-gray-300" })}
                <span>{item.text}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-gray-900 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  {React.cloneElement(item.icon, { className: "text-gray-300" })}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;