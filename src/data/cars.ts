import { Car } from '../types/car';

export const allCars: Car[] = [
  // Toyota Cars
  {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla GLi',
    year: 2019,
    price: 3200000,
    mileage: 45000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.3L',
    bodyType: 'Sedan',
    color: 'White',
    features: ['Air Conditioning', 'Power Steering', 'Central Locking', 'Airbags'],
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 2,
    brand: 'Toyota',
    model: 'Vitz F',
    year: 2017,
    price: 2800000,
    mileage: 62000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.0L',
    bodyType: 'Hatchback',
    color: 'White',
    features: ['Smart Key', 'Push Start', 'Automatic AC', 'Multimedia System'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },
  {
    id: 3,
    brand: 'Toyota',
    model: 'Prius',
    year: 2020,
    price: 4500000,
    mileage: 35000,
    transmission: 'CVT',
    fuelType: 'Hybrid',
    engineSize: '1.8L',
    bodyType: 'Sedan',
    color: 'Silver',
    features: ['Hybrid Engine', 'Navigation', 'Backup Camera', 'Bluetooth'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 4,
    brand: 'Toyota',
    model: 'Camry',
    year: 2018,
    price: 5200000,
    mileage: 48000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.5L',
    bodyType: 'Sedan',
    color: 'Black',
    features: ['Leather Seats', 'Sunroof', 'Premium Audio', 'Cruise Control'],
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 5,
    brand: 'Toyota',
    model: 'Land Cruiser',
    year: 2016,
    price: 12000000,
    mileage: 85000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '4.5L',
    bodyType: 'SUV',
    color: 'White',
    features: ['4WD', 'Leather Interior', '7 Seats', 'Off-road Package'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },

  // Honda Cars
  {
    id: 6,
    brand: 'Honda',
    model: 'City VTi',
    year: 2020,
    price: 3800000,
    mileage: 32000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.5L',
    bodyType: 'Sedan',
    color: 'Silver',
    features: ['Automatic Climate Control', 'Touchscreen Display', 'Reverse Camera', 'Cruise Control'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 7,
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    price: 4200000,
    mileage: 38000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.8L',
    bodyType: 'Sedan',
    color: 'Red',
    features: ['Turbo Engine', 'LED Headlights', 'Alloy Wheels', 'Keyless Entry'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 8,
    brand: 'Honda',
    model: 'Accord',
    year: 2017,
    price: 4800000,
    mileage: 55000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '2.4L',
    bodyType: 'Sedan',
    color: 'Black',
    features: ['Premium Interior', 'Navigation System', 'Heated Seats', 'Dual Zone AC'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 9,
    brand: 'Honda',
    model: 'BR-V',
    year: 2018,
    price: 3500000,
    mileage: 42000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.5L',
    bodyType: 'SUV',
    color: 'White',
    features: ['7 Seater', 'Touchscreen', 'Reverse Camera', 'Roof Rails'],
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 10,
    brand: 'Honda',
    model: 'Vezel',
    year: 2021,
    price: 5500000,
    mileage: 25000,
    transmission: 'CVT',
    fuelType: 'Hybrid',
    engineSize: '1.5L',
    bodyType: 'SUV',
    color: 'Blue',
    features: ['Hybrid System', 'AWD', 'Premium Audio', 'Lane Assist'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },

  // Suzuki Cars
  {
    id: 11,
    brand: 'Suzuki',
    model: 'Swift VXR',
    year: 2018,
    price: 2500000,
    mileage: 55000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.2L',
    bodyType: 'Hatchback',
    color: 'Red',
    features: ['Power Windows', 'USB Port', 'Bluetooth', 'Keyless Entry'],
    images: [
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 12,
    brand: 'Suzuki',
    model: 'Cultus VXR',
    year: 2019,
    price: 2200000,
    mileage: 48000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.0L',
    bodyType: 'Hatchback',
    color: 'White',
    features: ['Central Locking', 'Power Steering', 'Front Airbags', 'ABS'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },
  {
    id: 13,
    brand: 'Suzuki',
    model: 'Wagon R VXL',
    year: 2020,
    price: 2400000,
    mileage: 35000,
    transmission: 'Manual',
    fuelType: 'CNG',
    engineSize: '1.0L',
    bodyType: 'Hatchback',
    color: 'Silver',
    features: ['CNG Kit', 'Power Windows', 'Central Locking', 'Immobilizer'],
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 14,
    brand: 'Suzuki',
    model: 'Vitara',
    year: 2017,
    price: 3800000,
    mileage: 65000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '1.6L',
    bodyType: 'SUV',
    color: 'Black',
    features: ['AWD', 'Touchscreen', 'Reverse Camera', 'Alloy Wheels'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 15,
    brand: 'Suzuki',
    model: 'Alto VXR',
    year: 2021,
    price: 1800000,
    mileage: 28000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '0.8L',
    bodyType: 'Hatchback',
    color: 'Blue',
    features: ['Fuel Efficient', 'Power Steering', 'Central Locking', 'Front Airbags'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },

  // Hyundai Cars
  {
    id: 16,
    brand: 'Hyundai',
    model: 'Tucson GLS',
    year: 2021,
    price: 7200000,
    mileage: 25000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L',
    bodyType: 'SUV',
    color: 'Black',
    features: ['Leather Seats', 'Sunroof', 'Navigation System', '4WD', 'Premium Sound System'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 17,
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2019,
    price: 4500000,
    mileage: 42000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L',
    bodyType: 'Sedan',
    color: 'White',
    features: ['Automatic Climate Control', 'Touchscreen', 'Reverse Camera', 'Alloy Wheels'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 18,
    brand: 'Hyundai',
    model: 'Sonata',
    year: 2018,
    price: 5200000,
    mileage: 52000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.4L',
    bodyType: 'Sedan',
    color: 'Silver',
    features: ['Premium Interior', 'Heated Seats', 'Navigation', 'Dual Zone AC'],
    images: [
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 19,
    brand: 'Hyundai',
    model: 'Santa Fe',
    year: 2017,
    price: 6800000,
    mileage: 68000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '3.3L',
    bodyType: 'SUV',
    color: 'Red',
    features: ['7 Seater', 'AWD', 'Leather Seats', 'Premium Audio'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 20,
    brand: 'Hyundai',
    model: 'i10',
    year: 2020,
    price: 2800000,
    mileage: 32000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.1L',
    bodyType: 'Hatchback',
    color: 'Blue',
    features: ['Compact Size', 'Fuel Efficient', 'Power Steering', 'Central Locking'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },

  // KIA Cars
  {
    id: 21,
    brand: 'KIA',
    model: 'Picanto MT',
    year: 2019,
    price: 2200000,
    mileage: 38000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.0L',
    bodyType: 'Hatchback',
    color: 'Blue',
    features: ['ABS', 'Power Steering', 'Central Locking', 'Dual Airbags'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 22,
    brand: 'KIA',
    model: 'Sportage',
    year: 2018,
    price: 5800000,
    mileage: 45000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L',
    bodyType: 'SUV',
    color: 'White',
    features: ['AWD', 'Panoramic Sunroof', 'Navigation', 'Premium Audio'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 23,
    brand: 'KIA',
    model: 'Cerato',
    year: 2020,
    price: 4200000,
    mileage: 35000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.6L',
    bodyType: 'Sedan',
    color: 'Black',
    features: ['Touchscreen Display', 'Reverse Camera', 'Alloy Wheels', 'Keyless Entry'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 24,
    brand: 'KIA',
    model: 'Sorento',
    year: 2017,
    price: 6500000,
    mileage: 72000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '3.3L',
    bodyType: 'SUV',
    color: 'Silver',
    features: ['7 Seater', 'Leather Interior', 'AWD', 'Premium Features'],
    images: [
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 25,
    brand: 'KIA',
    model: 'Rio',
    year: 2019,
    price: 2900000,
    mileage: 41000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.4L',
    bodyType: 'Hatchback',
    color: 'Red',
    features: ['Fuel Efficient', 'Modern Design', 'Safety Features', 'Comfortable Interior'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },

  // Nissan Cars
  {
    id: 26,
    brand: 'Nissan',
    model: 'Note',
    year: 2018,
    price: 2600000,
    mileage: 52000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.2L',
    bodyType: 'Hatchback',
    color: 'White',
    features: ['CVT Transmission', 'Spacious Interior', 'Fuel Efficient', 'Modern Features'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 27,
    brand: 'Nissan',
    model: 'X-Trail',
    year: 2019,
    price: 6200000,
    mileage: 38000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '2.5L',
    bodyType: 'SUV',
    color: 'Black',
    features: ['7 Seater', 'AWD', 'Panoramic Sunroof', 'Advanced Safety'],
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 28,
    brand: 'Nissan',
    model: 'Sunny',
    year: 2020,
    price: 3200000,
    mileage: 32000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.5L',
    bodyType: 'Sedan',
    color: 'Silver',
    features: ['Spacious Cabin', 'Fuel Economy', 'Modern Design', 'Safety Features'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 29,
    brand: 'Nissan',
    model: 'Altima',
    year: 2017,
    price: 4800000,
    mileage: 65000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '2.5L',
    bodyType: 'Sedan',
    color: 'Blue',
    features: ['Premium Interior', 'Advanced Technology', 'Comfortable Ride', 'Safety Suite'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },
  {
    id: 30,
    brand: 'Nissan',
    model: 'Patrol',
    year: 2016,
    price: 11500000,
    mileage: 88000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '5.6L',
    bodyType: 'SUV',
    color: 'White',
    features: ['V8 Engine', '4WD', 'Luxury Interior', '8 Seater'],
    images: [
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },

  // Mitsubishi Cars
  {
    id: 31,
    brand: 'Mitsubishi',
    model: 'Lancer',
    year: 2018,
    price: 3800000,
    mileage: 48000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.8L',
    bodyType: 'Sedan',
    color: 'Red',
    features: ['Sporty Design', 'CVT Transmission', 'Modern Features', 'Reliable Engine'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 32,
    brand: 'Mitsubishi',
    model: 'Outlander',
    year: 2019,
    price: 5800000,
    mileage: 42000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '2.4L',
    bodyType: 'SUV',
    color: 'Black',
    features: ['7 Seater', 'AWD', 'Premium Interior', 'Advanced Safety'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 33,
    brand: 'Mitsubishi',
    model: 'Pajero',
    year: 2017,
    price: 8500000,
    mileage: 72000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '3.2L',
    bodyType: 'SUV',
    color: 'White',
    features: ['4WD', 'Diesel Engine', 'Off-road Capable', '7 Seater'],
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 34,
    brand: 'Mitsubishi',
    model: 'Mirage',
    year: 2020,
    price: 2400000,
    mileage: 35000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.2L',
    bodyType: 'Hatchback',
    color: 'Blue',
    features: ['Fuel Efficient', 'Compact Design', 'Modern Features', 'Affordable'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },
  {
    id: 35,
    brand: 'Mitsubishi',
    model: 'ASX',
    year: 2018,
    price: 4200000,
    mileage: 55000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '2.0L',
    bodyType: 'SUV',
    color: 'Silver',
    features: ['Compact SUV', 'AWD', 'Modern Interior', 'Good Ground Clearance'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },

  // Daihatsu Cars
  {
    id: 36,
    brand: 'Daihatsu',
    model: 'Mira',
    year: 2019,
    price: 1600000,
    mileage: 42000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '0.66L',
    bodyType: 'Hatchback',
    color: 'White',
    features: ['Compact Size', 'Fuel Efficient', 'Easy Parking', 'Low Maintenance'],
    images: [
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 37,
    brand: 'Daihatsu',
    model: 'Move',
    year: 2018,
    price: 1800000,
    mileage: 48000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '0.66L',
    bodyType: 'Hatchback',
    color: 'Red',
    features: ['Spacious Interior', 'Fuel Economy', 'Reliable', 'Affordable'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 38,
    brand: 'Daihatsu',
    model: 'Hijet',
    year: 2017,
    price: 1400000,
    mileage: 65000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '0.66L',
    bodyType: 'Van',
    color: 'White',
    features: ['Commercial Use', 'Cargo Space', 'Fuel Efficient', 'Durable'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },
  {
    id: 39,
    brand: 'Daihatsu',
    model: 'Tanto',
    year: 2020,
    price: 2200000,
    mileage: 32000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '0.66L',
    bodyType: 'Hatchback',
    color: 'Blue',
    features: ['Sliding Doors', 'Spacious Cabin', 'Family Friendly', 'Modern Features'],
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 40,
    brand: 'Daihatsu',
    model: 'Cast',
    year: 2019,
    price: 2000000,
    mileage: 38000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '0.66L',
    bodyType: 'Hatchback',
    color: 'Silver',
    features: ['Stylish Design', 'Fuel Efficient', 'Compact', 'Modern Interior'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },

  // Additional cars to reach 100+
  {
    id: 41,
    brand: 'Toyota',
    model: 'Hilux',
    year: 2019,
    price: 6500000,
    mileage: 45000,
    transmission: 'Manual',
    fuelType: 'Diesel',
    engineSize: '2.8L',
    bodyType: 'Pickup',
    color: 'White',
    features: ['4WD', 'Diesel Engine', 'Cargo Bed', 'Durable'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 42,
    brand: 'Honda',
    model: 'Freed',
    year: 2018,
    price: 3200000,
    mileage: 52000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.5L',
    bodyType: 'MPV',
    color: 'Black',
    features: ['7 Seater', 'Sliding Doors', 'Family Car', 'Spacious'],
    images: [
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 43,
    brand: 'Suzuki',
    model: 'Jimny',
    year: 2020,
    price: 4200000,
    mileage: 28000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.5L',
    bodyType: 'SUV',
    color: 'Green',
    features: ['4WD', 'Off-road', 'Compact SUV', 'Manual Transmission'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 44,
    brand: 'Hyundai',
    model: 'Creta',
    year: 2021,
    price: 5800000,
    mileage: 22000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '1.6L',
    bodyType: 'SUV',
    color: 'Orange',
    features: ['Touchscreen', 'Reverse Camera', 'Alloy Wheels', 'Modern Design'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 45,
    brand: 'KIA',
    model: 'Stonic',
    year: 2020,
    price: 4800000,
    mileage: 32000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '1.4L',
    bodyType: 'SUV',
    color: 'Yellow',
    features: ['Compact SUV', 'Modern Features', 'Fuel Efficient', 'Stylish'],
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },
  // Continue adding more cars to reach 100+...
  // Adding more variety with different years, prices, and specifications
  {
    id: 46,
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2018,
    price: 8500000,
    mileage: 58000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '2.8L',
    bodyType: 'SUV',
    color: 'Pearl White',
    features: ['4WD', '7 Seater', 'Leather Interior', 'Premium Audio'],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  },
  {
    id: 47,
    brand: 'Honda',
    model: 'Jazz',
    year: 2017,
    price: 2800000,
    mileage: 68000,
    transmission: 'CVT',
    fuelType: 'Petrol',
    engineSize: '1.3L',
    bodyType: 'Hatchback',
    color: 'Metallic Blue',
    features: ['Spacious Interior', 'Fuel Efficient', 'Reliable', 'Comfortable'],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Islamabad',
    isVerified: true
  },
  {
    id: 48,
    brand: 'Suzuki',
    model: 'Baleno',
    year: 2019,
    price: 2600000,
    mileage: 42000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineSize: '1.4L',
    bodyType: 'Hatchback',
    color: 'Maroon',
    features: ['Premium Interior', 'Touchscreen', 'Alloy Wheels', 'ABS'],
    images: [
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Karachi',
    isVerified: true
  },
  {
    id: 49,
    brand: 'Hyundai',
    model: 'Verna',
    year: 2020,
    price: 4200000,
    mileage: 35000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '1.6L',
    bodyType: 'Sedan',
    color: 'Phantom Black',
    features: ['Sunroof', 'Wireless Charging', 'LED Headlights', 'Premium Audio'],
    images: [
      'https://images.pexels.com/photos/2079167/pexels-photo-2079167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Faisalabad',
    isVerified: true
  },
  {
    id: 50,
    brand: 'KIA',
    model: 'Grand Carnival',
    year: 2019,
    price: 7200000,
    mileage: 48000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '3.3L',
    bodyType: 'MPV',
    color: 'Gravity Gray',
    features: ['8 Seater', 'Premium Interior', 'Sliding Doors', 'Entertainment System'],
    images: [
      'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Lahore',
    isVerified: true
  }
  // Continue this pattern to reach 100+ cars with various brands, models, years, and specifications
];

// Extract first 6 cars for featured section
export const featuredCars = allCars.slice(0, 6);

export const carBrands = ['Toyota', 'Honda', 'Suzuki', 'Hyundai', 'KIA', 'Nissan', 'Mitsubishi', 'Daihatsu'];
export const transmissionTypes = ['Manual', 'Automatic', 'CVT'];
export const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'CNG'];
export const bodyTypes = ['Sedan', 'Hatchback', 'SUV', 'MPV', 'Pickup', 'Van'];
export const locations = ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan'];