import React from 'react';
import Header from './Header';
import Hero from './Hero';
import FeaturedCars from './FeaturedCars';
import Inventory from './Inventory';
import Services from './Services';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import ChatWidget from './chat/ChatWidget';

const PublicSite: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <FeaturedCars />
      <div id="inventory">
        <Inventory />
      </div>
      <Services />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default PublicSite;</parameter>