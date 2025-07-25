import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AttractionCard from '../components/AttractionCard.jsx';

const hotels = [
  {
    id: 1,
    name: 'Lake Como',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    rating: 4.2,
    duration: '1-2 days',
    description: 'Famous villa with gardens; seen in James Bond & Star Wars',
  },
  {
    id: 2,
    name: 'Lake Como',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg',
    rating: 4.2,
    duration: '1-2 days',
    description: 'Famous villa with gardens; seen in James Bond & Star Wars',
  },
  {
    id: 3,
    name: 'Lake Como',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg',
    rating: 4.2,
    duration: '1-2 days',
    description: 'Famous villa with gardens; seen in James Bond & Star Wars',
  },
];

const Hotels = () => {
  // In a real app, get destination/country from params or context
  const destination = 'Italy';

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow border border-gray-200 mt-24 mb-10 font-poppins">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/destination/1" className="flex items-center">
            <ArrowLeft className="h-6 w-6 text-black" />
          </Link>
          <h1 className="text-2xl font-bold text-black">Hotels in {destination}</h1>
        </div>
        <button className="bg-[#3ABEFF] text-white px-6 py-2 rounded-full font-normal text-base hover:bg-[#259fdc] transition flex items-center gap-2">
          + Add to trip
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map(hotel => (
          <div key={hotel.id} className="max-w-xs mx-auto w-full">
            <AttractionCard attraction={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels; 