import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AttractionCard from '../components/AttractionCard.jsx';

const dishes = [
  {
    id: 1,
    name: 'Risotto alla Milanese',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    duration: 'Lunch/Dinner',
    description: 'Creamy saffron-infused risotto, a classic from Milan.',
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    duration: 'Lunch/Dinner',
    description: 'Traditional Neapolitan pizza with tomato, mozzarella, and basil.',
  },
  {
    id: 3,
    name: 'Tiramisu',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    duration: 'Dessert',
    description: 'Coffee-flavored Italian dessert with mascarpone and cocoa.',
  },
  {
    id: 4,
    name: 'Lasagna',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    duration: 'Lunch/Dinner',
    description: 'Classic baked pasta with layers of rich meat sauce, cheese, and béchamel.',
  },
];

const Dishes = () => {
  const destination = 'Italy';

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow border border-gray-200 mt-24 mb-10 font-poppins">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/destination/1" className="flex items-center">
            <ArrowLeft className="h-6 w-6 text-black" />
          </Link>
          <h1 className="text-2xl font-bold text-black">Dishes & food in {destination}</h1>
        </div>
        <button className="bg-[#3ABEFF] text-white px-6 py-2 rounded-full font-normal text-base hover:bg-[#259fdc] transition flex items-center gap-2">
          + Add to trip
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map(dish => (
          <div key={dish.id} className="max-w-xs mx-auto w-full">
            <AttractionCard attraction={dish} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes; 