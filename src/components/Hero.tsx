import React, { useState } from 'react';
import { Search, Car, Shield, Award } from 'lucide-react';
import { carBrands } from '../data/cars';

const Hero: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    year: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search filters:', searchForm);
    // Navigate to inventory with filters
    const inventorySection = document.getElementById('inventory');
    if (inventorySection) {
      inventorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="text-orange-500 block animate-pulse">Used Car</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Pakistan's most trusted used car dealership. Quality vehicles, competitive prices, 
              and exceptional service since 2015.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Car className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="font-semibold">500+</div>
                <div className="text-sm text-gray-400">Cars Sold</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="font-semibold">100%</div>
                <div className="text-sm text-gray-400">Verified</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="font-semibold">8+</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Find Your Dream Car</h3>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                <select
                  value={searchForm.brand}
                  onChange={(e) => setSearchForm({...searchForm, brand: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">All Brands</option>
                  {carBrands.map(brand => (
                    <option key={brand} value={brand} className="bg-gray-800">{brand}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Price (PKR)</label>
                  <input
                    type="number"
                    placeholder="1,000,000"
                    value={searchForm.minPrice}
                    onChange={(e) => setSearchForm({...searchForm, minPrice: e.target.value})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Price (PKR)</label>
                  <input
                    type="number"
                    placeholder="10,000,000"
                    value={searchForm.maxPrice}
                    onChange={(e) => setSearchForm({...searchForm, maxPrice: e.target.value})}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <select
                  value={searchForm.year}
                  onChange={(e) => setSearchForm({...searchForm, year: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Any Year</option>
                  {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year} className="bg-gray-800">{year}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;