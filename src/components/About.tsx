import React from 'react';
import { Users, Trophy, Clock, MapPin } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, number: '1,500+', label: 'Happy Customers' },
    { icon: Trophy, number: '500+', label: 'Cars Sold' },
    { icon: Clock, number: '8+', label: 'Years Experience' },
    { icon: MapPin, number: '3', label: 'Locations' }
  ];

  return (
    <section id="about" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              About <span className="text-orange-500">Balach Motors</span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Since 2015, Balach Motors has been serving the Pakistani automotive market with 
                integrity, quality, and exceptional customer service. We specialize in premium 
                used cars, ensuring each vehicle meets our strict quality standards.
              </p>
              <p>
                Our team of automotive experts carefully inspects every vehicle, providing you 
                with detailed reports and honest assessments. We believe in transparency and 
                building long-term relationships with our customers.
              </p>
              <p>
                Located in major cities across Pakistan, we offer convenient access to our 
                extensive inventory of verified used cars. From compact city cars to luxury 
                SUVs, we have something for every need and budget.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose Balach Motors?</h3>
              <ul className="space-y-3">
                {[
                  'Every car thoroughly inspected by certified mechanics',
                  'Transparent pricing with no hidden fees',
                  'Comprehensive warranty options available',
                  'Expert financing assistance',
                  'Complete documentation support',
                  '24/7 customer service and support'
                ].map((point, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
              <img
                src="https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Balach Motors Showroom"
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h4 className="text-lg font-bold text-white mb-2">Our Modern Showroom</h4>
              <p className="text-gray-400 text-sm">
                Visit our state-of-the-art facilities to explore our extensive collection 
                of quality used cars in comfortable surroundings.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl text-center border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                    <div className="bg-orange-500/20 text-orange-500 p-3 rounded-xl w-fit mx-auto mb-3">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;