import React, { useState } from 'react';
import CarCard from './CarCard';
import InquiryModal from './InquiryModal';
import { supabase } from '../lib/supabase';
import { Car } from '../types/car';

const FeaturedCars: React.FC = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  React.useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('isVerified', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setFeaturedCars(data || []);
    } catch (error) {
      console.error('Error fetching featured cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInquire = (car: Car) => {
    setSelectedCar(car);
    setShowInquiryModal(true);
  };

  const handleViewAllCars = () => {
    // Navigate to inventory page
    window.location.href = '#inventory';
    // Scroll to inventory section
    setTimeout(() => {
      const inventorySection = document.getElementById('inventory');
      if (inventorySection) {
        inventorySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (loading) {
    return (
      <section id="featured" className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white">Loading featured cars...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured <span className="text-orange-500">Used Cars</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our handpicked selection of premium used cars. Each vehicle is thoroughly inspected 
            and verified to ensure quality and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onInquire={handleInquire}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllCars}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
          >
            View All Cars
          </button>
        </div>
      </div>

      <InquiryModal
        car={selectedCar}
        isOpen={showInquiryModal}
        onClose={() => {
          setShowInquiryModal(false);
          setSelectedCar(null);
        }}
      />
    </section>
  );
};

export default FeaturedCars;