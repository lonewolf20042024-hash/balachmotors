import React from 'react';
import { MapPin, Calendar, Gauge, Fuel, Settings, CheckCircle } from 'lucide-react';
import { Car } from '../types/car';
import ImageCarousel from './ImageCarousel';

interface CarCardProps {
  car: Car;
  onInquire: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onInquire }) => {
  const formatPrice = (price: number) => {
    return (price / 100000).toFixed(1) + ' Lakh';
  };

  const formatMileage = (mileage: number) => {
    return (mileage / 1000).toFixed(0) + 'k km';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 group">
      <div className="relative">
        <ImageCarousel
          images={car.images}
          alt={`${car.brand} ${car.model}`}
        />
        {car.isVerified && (
          <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center shadow-lg">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </div>
        )}
        <div className="absolute top-3 right-3 bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold shadow-lg">
          PKR {formatPrice(car.price)}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">{car.brand} {car.model}</h3>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {car.location}
            </div>
          </div>
          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-sm font-semibold border border-orange-500/30">
            {car.year}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Calendar className="h-4 w-4 mr-2 text-orange-500" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Gauge className="h-4 w-4 mr-2 text-orange-500" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Settings className="h-4 w-4 mr-2 text-orange-500" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Fuel className="h-4 w-4 mr-2 text-orange-500" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Key Features:</div>
          <div className="flex flex-wrap gap-1">
            {car.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-white/10 text-gray-300 px-2 py-1 rounded-lg text-xs border border-white/20">
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-lg text-xs border border-white/20">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onInquire(car)}
          className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;