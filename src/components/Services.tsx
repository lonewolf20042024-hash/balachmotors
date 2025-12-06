import React from 'react';
import { CreditCard, Shield, Wrench, FileCheck, Award, Headphones } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: CreditCard,
      title: 'Car Financing',
      description: 'Easy car loans with competitive rates through our banking partners. Get pre-approved in minutes.',
      features: ['Up to 5 years financing', 'Low interest rates', 'Flexible down payment']
    },
    {
      icon: FileCheck,
      title: 'Documentation',
      description: 'Complete paperwork assistance including registration, insurance, and ownership transfer.',
      features: ['Transfer assistance', 'Insurance guidance', 'Legal documentation']
    },
    {
      icon: Wrench,
      title: 'Pre-Purchase Inspection',
      description: 'Comprehensive vehicle inspection by certified mechanics to ensure quality and safety.',
      features: ['120-point inspection', 'Detailed report', 'Expert recommendations']
    },
    {
      icon: Shield,
      title: 'Warranty Coverage',
      description: 'Extended warranty options available on all vehicles for your peace of mind.',
      features: ['Engine warranty', 'Parts coverage', 'Labor protection']
    },
    {
      icon: Award,
      title: 'Trade-In Service',
      description: 'Get the best value for your current vehicle with our fair trade-in evaluation.',
      features: ['Fair market value', 'Quick evaluation', 'Hassle-free process']
    },
    {
      icon: Headphones,
      title: 'After-Sales Support',
      description: '24/7 customer support and maintenance services for all our customers.',
      features: ['24/7 support', 'Service reminders', 'Maintenance tips']
    }
  ];

  return (
    <section id="services" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Beyond selling cars, we provide comprehensive services to ensure your complete satisfaction 
            and peace of mind throughout your car buying journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 group">
                <div className="bg-orange-500 text-white p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our expert team is here to guide you through every step of your car buying journey. 
              Contact us for personalized assistance.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
              Get Expert Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;