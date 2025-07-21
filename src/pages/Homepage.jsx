import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Calendar, ArrowRight } from 'lucide-react';
import { SearchIcon, ItineraryIcon, MapIcon, BudgetIcon, CollaborateIcon } from '../components/Icons.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import MyTripsSection from '../components/MyTripsSection.jsx';
import { useAuth } from '../components/AuthContext.jsx';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

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
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 bg-white rounded-full shadow-lg focus:outline-none transition-all font-montserrat font-medium text-[18px] placeholder:text-black/25"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-[#3ABEFF] text-white rounded-full hover:bg-[#3ABEFF]/90 transition-colors font-normal text-base font-montserrat"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/itinerary"
                className="w-[224px] h-[40px] flex items-center justify-center bg-[#000000]/13 border border-black/13 backdrop-blur-sm text-white font-normal text-[18px] font-poppins rounded-[34px] hover:bg-[#FFFFFF]/30 transition-all duration-500 shadow-lg"
              >
                Explore Destinations
              </Link>
              <Link
                to="/explore"
                className="w-[224px] h-[40px] flex items-center justify-center bg-[#000000]/13 border border-black/13 backdrop-blur-sm text-white font-normal text-[18px] font-poppins rounded-[34px] hover:bg-[#3ABEFF]/40 transition-all duration-500 shadow-lg"
              >
                Start planning your trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Trips Section (only for logged-in users) */}
      <MyTripsSection />

      {user ? (
        <>
          {/* Popular Destinations first (max 3 cards) */}
          <section className="pt-10 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="text-sky-500 font-poppins font-semibold text-lg mb-2 text-center">Top destinations</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Discover Your Destination
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {featuredDestinations.slice(0, 3).map((destination) => (
                  <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group w-[340px] h-[450px]">
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
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center w-[230px] h-[50px] px-4 py-2.5 rounded-[8px] border font-semibold text-[#197CAC] bg-white shadow-md hover:bg-[#E6F6FB] hover:border-[#197CAC] transition-colors"
                  style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#fff' }}
                >
                  <span className="w-[166px] h-[20px] font-poppins font-semibold text-[14px] text-[#197CAC] flex items-center justify-center whitespace-nowrap">Explore All Destinations</span>
                </Link>
              </div>
            </div>
          </section>
          {/* Features after */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-[16px] font-bold text-[#3ABEFF] mb-4 font-poppins w-[366px] h-[29px] leading-[180%] mx-auto">
                  Our Features
                </h2>
                <h3 className="text-[27px] font-bold text-black mb-4 font-poppins w-[366px] h-[32px] leading-[120%] mx-auto">
                  Why choose TravelTrack?
                </h3>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                <FeatureCard
                  icon={<ItineraryIcon />}
                  title="Itinerary Builder"
                  description="Plan day-by-day trips effortlessly"
                />
                <FeatureCard
                  icon={<MapIcon />}
                  title="Map View"
                  description="See your whole journey on an interactive map"
                />
                <FeatureCard
                  icon={<BudgetIcon />}
                  title="Budget Tracker"
                  description="Stay within budget with smart planning"
                />
                <FeatureCard
                  icon={<CollaborateIcon />}
                  title="Collaborate"
                  description="Invite friends and plan together"
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Features first */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-[16px] font-bold text-[#3ABEFF] mb-4 font-poppins w-[366px] h-[29px] leading-[180%] mx-auto">
                  Our Features
                </h2>
                <h3 className="text-[27px] font-bold text-black mb-4 font-poppins w-[366px] h-[32px] leading-[120%] mx-auto">
                  Why choose TravelTrack?
                </h3>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                <FeatureCard
                  icon={<ItineraryIcon />}
                  title="Itinerary Builder"
                  description="Plan day-by-day trips effortlessly"
                />
                <FeatureCard
                  icon={<MapIcon />}
                  title="Map View"
                  description="See your whole journey on an interactive map"
                />
                <FeatureCard
                  icon={<BudgetIcon />}
                  title="Budget Tracker"
                  description="Stay within budget with smart planning"
                />
                <FeatureCard
                  icon={<CollaborateIcon />}
                  title="Collaborate"
                  description="Invite friends and plan together"
                />
              </div>
            </div>
          </section>
          {/* Popular Destinations after */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="text-sky-500 font-poppins font-semibold text-lg mb-2 text-center">Top destinations</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Discover your destination
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {featuredDestinations.map((destination) => (
                  <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group w-[340px] h-[450px]">
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
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center w-[230px] h-[50px] px-4 py-2.5 rounded-[8px] border font-semibold text-[#197CAC] bg-white shadow-md hover:bg-[#E6F6FB] hover:border-[#197CAC] transition-colors"
                  style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#fff' }}
                >
                  <span className="w-[166px] h-[20px] font-poppins font-semibold text-[14px] text-[#197CAC] flex items-center justify-center whitespace-nowrap">Explore All Destinations</span>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="relative py-20 text-white">
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
            to="/itinerary"
            className="inline-flex items-center justify-center w-[280px] h-[48px] bg-white text-[#197CAC] font-semibold rounded-full hover:bg-gray-50 transition duration-300 hover:scale-105 transform"
          >
            <span className="text-[#197CAC]">Start Planning Your Trip</span>
            <ArrowRight className="h-5 w-5 text-[#197CAC]" />
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage; 