import React, { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/90 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-white/10">
      {/* Top bar */}
      <div className="bg-orange-500/90 backdrop-blur-sm text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>+92-321-1234567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Mon-Sat: 9:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-orange-500 text-white p-2 rounded-lg mr-3 shadow-lg">
              <span className="font-bold text-xl">BM</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Balach Motors</h1>
              <p className="text-sm text-orange-400">Premium Used Cars</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-orange-500 font-medium transition-all duration-300 transform hover:scale-105">Home</a>
            <a href="#inventory" className="text-gray-300 hover:text-orange-500 font-medium transition-all duration-300 transform hover:scale-105">Inventory</a>
            <a href="#services" className="text-gray-300 hover:text-orange-500 font-medium transition-all duration-300 transform hover:scale-105">Services</a>
            <a href="#about" className="text-gray-300 hover:text-orange-500 font-medium transition-all duration-300 transform hover:scale-105">About</a>
            <a href="#contact" className="text-gray-300 hover:text-orange-500 font-medium transition-all duration-300 transform hover:scale-105">Contact</a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <div className="flex flex-col space-y-2">
              <a href="#home" className="py-2 text-gray-300 hover:text-orange-500 font-medium transition-colors">Home</a>
              <a href="#inventory" className="py-2 text-gray-300 hover:text-orange-500 font-medium transition-colors">Inventory</a>
              <a href="#services" className="py-2 text-gray-300 hover:text-orange-500 font-medium transition-colors">Services</a>
              <a href="#about" className="py-2 text-gray-300 hover:text-orange-500 font-medium transition-colors">About</a>
              <a href="#contact" className="py-2 text-gray-300 hover:text-orange-500 font-medium transition-colors">Contact</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;