import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group w-[340px] h-[450px]">
    <div className="relative h-64 overflow-hidden">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 rounded-full">
        {destination.type}
      </div>
    </div>
    <div className="p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="w-[232px] h-[32px] font-poppins font-semibold text-[22px] leading-[32px] text-[#197CAC] mx-auto"
        >
          {destination.name}
        </h3>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
        </div>
      </div>
      <p className="text-gray-600 mb-8 leading-relaxed">{destination.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{destination.reviews.toLocaleString()} reviews</span>
        <Link
          to={`/explore?destination=${destination.name}`}
          className="flex items-center space-x-1 text-sky-600 hover:text-sky-700 font-medium transition-colors"
        >
          <span>Explore</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
);

const PopularDestinations = ({ featuredDestinations }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Popular Destinations
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the world's most amazing places, handpicked by travel experts.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {featuredDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          to="/explore"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-600 transition-colors"
        >
          <span>View All Destinations</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  </section>
);

export default PopularDestinations; 