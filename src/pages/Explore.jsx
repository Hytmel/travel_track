import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Clock, DollarSign } from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'beaches', name: 'Beaches' },
    { id: 'mountains', name: 'Mountains' },
    { id: 'cities', name: 'Cities' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'food', name: 'Food & Culture' },
    { id: 'romance', name: 'Romance' },
  ];

  const allDestinations = [
    {
      id: 1,
      name: 'Maldives',
      country: 'Maldives',
      image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
      rating: 4.9,
      reviews: 5432,
      category: 'beaches',
      budget: 'luxury',
      duration: '7-10 days',
      description: 'Crystal clear waters and overwater bungalows in paradise.',
      price: '$$$',
    },
    {
      id: 2,
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      rating: 4.8,
      reviews: 3241,
      category: 'mountains',
      budget: 'expensive',
      duration: '5-7 days',
      description: 'Breathtaking mountain views and world-class skiing.',
      price: '$$$',
    },
    {
      id: 3,
      name: 'Kyoto',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
      rating: 4.7,
      reviews: 8765,
      category: 'food',
      budget: 'moderate',
      duration: '4-6 days',
      description: 'Ancient temples, traditional culture, and incredible cuisine.',
      price: '$$',
    },
    {
      id: 4,
      name: 'Iceland Ring Road',
      country: 'Iceland',
      image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg',
      rating: 4.8,
      reviews: 4567,
      category: 'adventure',
      budget: 'expensive',
      duration: '8-12 days',
      description: 'Dramatic landscapes, waterfalls, and the Northern Lights.',
      price: '$$$',
    },
    {
      id: 5,
      name: 'Barcelona',
      country: 'Spain',
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
      rating: 4.6,
      reviews: 12456,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'Vibrant culture, stunning architecture, and Mediterranean charm.',
      price: '$$',
    },
    {
      id: 6,
      name: 'Tuscany',
      country: 'Italy',
      image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg',
      rating: 4.7,
      reviews: 6789,
      category: 'romance',
      budget: 'moderate',
      duration: '5-8 days',
      description: 'Rolling hills, vineyards, and romantic countryside.',
      price: '$$',
    },
    {
      id: 7,
      name: 'Banff National Park',
      country: 'Canada',
      image: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg',
      rating: 4.8,
      reviews: 3456,
      category: 'mountains',
      budget: 'moderate',
      duration: '4-7 days',
      description: 'Pristine wilderness and stunning mountain lakes.',
      price: '$$',
    },
    {
      id: 8,
      name: 'Amalfi Coast',
      country: 'Italy',
      image: 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
      rating: 4.7,
      reviews: 5678,
      category: 'romance',
      budget: 'expensive',
      duration: '4-6 days',
      description: 'Dramatic cliffs, charming villages, and Mediterranean beauty.',
      price: '$$$',
    },
  ];

  useEffect(() => {
    let filtered = allDestinations;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dest => dest.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort destinations
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popularity
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredDestinations(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing places around the world and start planning your next adventure.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-sky-100 hover:text-sky-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                  {destination.price}
                </div>
                <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  <span>{destination.rating}</span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{destination.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {destination.country}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{destination.description}</p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {destination.duration}
                  </div>
                  <div>{destination.reviews.toLocaleString()} reviews</div>
                </div>
                
                <button className="w-full py-2 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors">
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <Search className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore; 