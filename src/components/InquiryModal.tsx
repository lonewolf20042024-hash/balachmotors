import React, { useState } from 'react';
import { X, Car, Phone, Mail, User } from 'lucide-react';
import { Car as CarType } from '../types/car';

interface InquiryModalProps {
  car: CarType | null;
  isOpen: boolean;
  onClose: () => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ car, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          id: crypto.randomUUID(),
          car_id: car?.id,
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone,
          message: formData.message || null,
          status: 'new',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return (price / 100000).toFixed(1) + ' Lakh PKR';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 backdrop-blur-md rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Inquiry Form</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {car && (
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-6 border border-white/20">
              <div className="flex items-center mb-2">
                <Car className="h-5 w-5 text-orange-500 mr-2" />
                <span className="font-semibold text-white">
                  {car.brand} {car.model} ({car.year})
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-500 mb-1">
                PKR {formatPrice(car.price)}
              </div>
              <div className="text-sm text-gray-400">
                {car.transmission} • {car.fuelType} • {(car.mileage / 1000).toFixed(0)}k km
              </div>
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-500/20 text-green-400 p-6 rounded-xl border border-green-500/30">
                <h4 className="text-xl font-bold mb-2">Thank You!</h4>
                <p>Your inquiry has been submitted successfully. We'll contact you within 24 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="03XX-XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300"
                  placeholder="Any specific questions or requirements?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl hover:bg-orange-600 disabled:bg-orange-300 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;