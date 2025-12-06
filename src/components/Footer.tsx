import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-orange-500 text-white p-2 rounded-lg mr-3">
                <span className="font-bold text-lg">BM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Balach Motors</h3>
                <p className="text-sm text-orange-400">Premium Used Cars</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Pakistan's most trusted used car dealership. Quality vehicles, 
              competitive prices, and exceptional service since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:bg-white/10 rounded-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:bg-white/10 rounded-lg">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:bg-white/10 rounded-lg">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#inventory" className="text-gray-400 hover:text-orange-500 transition-colors">Inventory</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-orange-500 transition-colors">Services</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Car Financing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Pre-Purchase Inspection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Trade-in Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Extended Warranty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-orange-500 mt-0.5" />
                <div>
                  <div className="text-sm">+92-321-1234567</div>
                  <div className="text-sm text-gray-400">Main Office</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-orange-500 mt-0.5" />
                <div>
                  <div className="text-sm">info@balachmotors.pk</div>
                  <div className="text-sm text-gray-400">Email Us</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-orange-500 mt-0.5" />
                <div>
                  <div className="text-sm">Multiple Locations</div>
                  <div className="text-sm text-gray-400">Karachi | Lahore | Islamabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Balach Motors. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;