import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <section className="relative py-20 text-white mt-8">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/src/assets/images/footer.svg)'
        }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-20">
            Start your next adventure today.
          </h2>
          <Link
            to="/build-trip"
            className="inline-flex items-center justify-center w-[280px] h-[48px] bg-white text-[#197CAC] font-semibold rounded-full hover:bg-gray-50 transition duration-300 hover:scale-105 transform"
          >
            <span className="text-[#197CAC]">Start Planning Your Trip</span>
            <ArrowRight className="h-5 w-5 text-[#197CAC]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
