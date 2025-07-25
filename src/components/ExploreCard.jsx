import React from 'react';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreCard = ({ destination }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group font-poppins flex flex-col h-full">
    <div className="relative h-48 overflow-hidden rounded-t-2xl">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full capitalize">
        {destination.category.replace(/_/g, ' ')}
      </div>
      <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
        <Star className="h-3 w-3 fill-current text-yellow-400" />
        <span>{destination.rating}</span>
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="mb-3">
        <h3 className="font-semibold text-lg mb-1 font-poppins" style={{ color: '#197CAC' }}>{destination.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-2 font-poppins">
          <MapPin className="h-3 w-3 mr-1" />
          {destination.country}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed font-poppins">{destination.description}</p>
      </div>
    </div>
    <div className="flex items-center justify-between text-xs text-gray-500 px-5 pb-4 pt-2 font-poppins mt-auto">
      <div className="font-poppins">{destination.reviews.toLocaleString()} reviews</div>
      <Link
        to={`/destination/${destination.id}`}
        className="flex items-center space-x-1 text-black hover:text-gray-700 font-medium transition-colors text-[17px]"
      >
        <span>Explore</span>
        <ArrowRight className="h-4 w-4 text-black" />
      </Link>
    </div>
  </div>
);

export default ExploreCard; 