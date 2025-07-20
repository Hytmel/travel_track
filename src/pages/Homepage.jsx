import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Users, Calendar, ArrowRight } from 'lucide-react';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDestinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
      rating: 4.8,
      reviews: 12453,
      type: 'City & Culture',
      description: 'The City of Light awaits with its iconic landmarks and romantic charm.',
    },
    {
      id: 2,
      name: 'Bali, Indonesia',
      image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
      rating: 4.9,
      reviews: 8721,
      type: 'Beach & Adventure',
      description: 'Tropical paradise with stunning beaches and rich cultural heritage.',
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      image: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg',
      rating: 4.7,
      reviews: 15632,
      type: 'City & Food',
      description: 'Modern metropolis blending tradition with cutting-edge innovation.',
    },
    {
      id: 4,
      name: 'Santorini, Greece',
      image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg',
      rating: 4.8,
      reviews: 9876,
      type: 'Beach & Romance',
      description: 'Stunning whitewashed villages overlooking the azure Aegean Sea.',
    },
    {
      id: 5,
      name: 'New York, USA',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
      rating: 4.6,
      reviews: 23451,
      type: 'City & Entertainment',
      description: 'The city that never sleeps, full of energy and endless possibilities.',
    },
    {
      id: 6,
      name: 'Machu Picchu, Peru',
      image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg',
      rating: 4.9,
      reviews: 7234,
      type: 'Adventure & History',
      description: 'Ancient Incan citadel nestled high in the Andes Mountains.',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to explore page with search query
    window.location.href = `/explore?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="h-screen">
      {/* Hero Section */}
      <section className="relative text-white h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/src/assets/images/homepage.svg)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-[84px] font-semibold mb-6 leading-tight">
              Plan your trip
            </h1>
            <p className="text-[20px] font-semibold mb-12 max-w-3xl mx-auto leading-relaxed text-white font-montserrat">
              Plan trips, build itineraries, and explore the world—your way.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/itinerary"
                className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
              >
                Start Planning
              </Link>
              <Link
                to="/explore"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all border border-white/30"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Stats Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join Thousands of Happy Travelers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our community has planned amazing adventures across the globe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl font-bold text-sky-500 mb-2 group-hover:scale-110 transition-transform">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Trips Planned</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform">
                180+
              </div>
              <div className="text-gray-600 font-medium">Countries Covered</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl font-bold text-green-500 mb-2 group-hover:scale-110 transition-transform">
                25K+
              </div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl sm:text-5xl font-bold text-purple-500 mb-2 group-hover:scale-110 transition-transform">
                4.9★
              </div>
              <div className="text-gray-600 font-medium">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
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
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
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
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real travelers who've used TravelPlanner for their adventures.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "TravelPlanner made organizing our European trip so much easier. The itinerary builder is intuitive and saved us hours of planning!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Traveled to 12 countries</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "The collaborative features are amazing! My friends and I planned our group trip together in real-time. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                  alt="Mike Chen"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Mike Chen</div>
                  <div className="text-sm text-gray-500">Adventure enthusiast</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Perfect for solo travelers like me. The destination recommendations helped me discover hidden gems I never would have found!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  alt="Emma Rodriguez"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Emma Rodriguez</div>
                  <div className="text-sm text-gray-500">Solo traveler</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers who trust TravelPlanner for their perfect trips.
          </p>
          <Link
            to="/itinerary"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-50 transition-colors hover:scale-105 transform"
          >
            <span>Start Planning Your Trip</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage; 