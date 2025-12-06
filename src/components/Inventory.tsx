import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import CarCard from './CarCard';
import InquiryModal from './InquiryModal';
import { supabase } from '../lib/supabase';
import { Car, SearchFilters } from '../types/car';

const Inventory: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  const carBrands = ['Toyota', 'Honda', 'Suzuki', 'Hyundai', 'KIA', 'Nissan', 'Mitsubishi', 'Daihatsu'];
  const transmissionTypes = ['Manual', 'Automatic', 'CVT'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'CNG'];
  const bodyTypes = ['Sedan', 'Hatchback', 'SUV', 'MPV', 'Pickup', 'Van'];
  const locations = ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan'];

  const [filters, setFilters] = useState<SearchFilters & {
    bodyType?: string;
    location?: string;
    minMileage?: number;
    maxMileage?: number;
  }>({
    brand: '',
    minPrice: undefined,
    maxPrice: undefined,
    year: undefined,
    transmission: '',
    fuelType: '',
    bodyType: '',
    location: '',
    minMileage: undefined,
    maxMileage: undefined
  });

  React.useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('isVerified', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = searchQuery === '' || 
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand = !filters.brand || car.brand === filters.brand;
      const matchesMinPrice = !filters.minPrice || car.price >= filters.minPrice;
      const matchesMaxPrice = !filters.maxPrice || car.price <= filters.maxPrice;
      const matchesYear = !filters.year || car.year >= filters.year;
      const matchesTransmission = !filters.transmission || car.transmission === filters.transmission;
      const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType;
      const matchesBodyType = !filters.bodyType || car.bodyType === filters.bodyType;
      const matchesLocation = !filters.location || car.location === filters.location;
      const matchesMinMileage = !filters.minMileage || car.mileage >= filters.minMileage;
      const matchesMaxMileage = !filters.maxMileage || car.mileage <= filters.maxMileage;

      return matchesSearch && matchesBrand && matchesMinPrice && matchesMaxPrice && 
             matchesYear && matchesTransmission && matchesFuelType && matchesBodyType && 
             matchesLocation && matchesMinMileage && matchesMaxMileage;
    });
  }, [searchQuery, filters, cars]);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = filteredCars.slice(startIndex, startIndex + carsPerPage);

  const handleInquire = (car: Car) => {
    setSelectedCar(car);
    setShowInquiryModal(true);
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: undefined,
      maxPrice: undefined,
      year: undefined,
      transmission: '',
      fuelType: '',
      bodyType: '',
      location: '',
      minMileage: undefined,
      maxMileage: undefined
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== undefined) || searchQuery !== '';

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-white text-xl">Loading inventory...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Our <span className="text-orange-500">Inventory</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse through our extensive collection of premium used cars. 
            Find your perfect match from over {cars.length} quality vehicles.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by brand, model, color, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/20"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({...filters, brand: e.target.value})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">All Brands</option>
                    {carBrands.map(brand => (
                      <option key={brand} value={brand} className="bg-gray-800">{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Body Type</label>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => setFilters({...filters, bodyType: e.target.value})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">All Types</option>
                    {bodyTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-800">{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Transmission</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => setFilters({...filters, transmission: e.target.value})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">All Transmissions</option>
                    {transmissionTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-800">{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">All Fuel Types</option>
                    {fuelTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-800">{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Price (PKR)</label>
                  <input
                    type="number"
                    placeholder="1,000,000"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value ? parseInt(e.target.value) : undefined})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Price (PKR)</label>
                  <input
                    type="number"
                    placeholder="10,000,000"
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value ? parseInt(e.target.value) : undefined})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Year</label>
                  <select
                    value={filters.year || ''}
                    onChange={(e) => setFilters({...filters, year: e.target.value ? parseInt(e.target.value) : undefined})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Any Year</option>
                    {Array.from({length: 15}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year} className="bg-gray-800">{year}+</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location} className="bg-gray-800">{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-300">
            Showing <span className="text-orange-500 font-semibold">{currentCars.length}</span> of{' '}
            <span className="text-orange-500 font-semibold">{filteredCars.length}</span> cars
          </div>
          
          {filteredCars.length > carsPerPage && (
            <div className="text-gray-300">
              Page <span className="text-orange-500 font-semibold">{currentPage}</span> of{' '}
              <span className="text-orange-500 font-semibold">{totalPages}</span>
            </div>
          )}
        </div>

        {/* Cars Grid */}
        {currentCars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {currentCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onInquire={handleInquire}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">No cars found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search criteria or clearing the filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === pageNum
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <InquiryModal
        car={selectedCar}
        isOpen={showInquiryModal}
        onClose={() => {
          setShowInquiryModal(false);
          setSelectedCar(null);
        }}
      />
    </div>
  );
};

export default Inventory;