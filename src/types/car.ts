export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'CNG';
  engineSize: string;
  bodyType: string;
  color: string;
  features: string[];
  images: string[];
  location: string;
  isVerified: boolean;
  description?: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Needs Work';
  ownerType: 'First Owner' | 'Second Owner' | 'Third Owner' | 'Fourth+ Owner';
  registrationCity: string;
  assemblyType: 'Local' | 'Imported';
  accidentHistory: boolean;
  serviceHistory: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SearchFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
  transmission?: string;
  fuelType?: string;
  bodyType?: string;
  location?: string;
  condition?: string;
  ownerType?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Inquiry {
  id: string;
  car_id: string;
  name: string;
  email?: string;
  phone: string;
  message?: string;
  status: 'new' | 'contacted' | 'interested' | 'closed';
  created_at: string;
  car?: Car;
}</parameter>