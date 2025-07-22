import React, { useState, useEffect } from 'react';
import { Filter, Star, MapPin, Clock, DollarSign } from 'lucide-react';
import ExploreCard from '../components/ExploreCard.jsx';
import { SearchIcon } from '../components/Icons.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [ratingOrder, setRatingOrder] = useState(null); // null, 'desc', 'asc'
  const [reviewsActive, setReviewsActive] = useState(false);
  const [originalDestinations, setOriginalDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const totalPages = Math.ceil(filteredDestinations.length / pageSize);

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
      reviews: 1456,
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
    {
      id: 9,
      name: 'Petra',
      country: 'Jordan',
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
      rating: 4.8,
      reviews: 4321,
      category: 'adventure',
      budget: 'moderate',
      duration: '2-4 days',
      description: 'Ancient city carved into rose-red cliffs, a wonder of the world.',
      price: '$$',
    },
    {
      id: 10,
      name: 'Great Barrier Reef',
      country: 'Australia',
      image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg',
      rating: 4.9,
      reviews: 7890,
      category: 'adventure',
      budget: 'expensive',
      duration: '5-7 days',
      description: 'World’s largest coral reef system, perfect for diving and snorkeling.',
      price: '$$$',
    },
    {
      id: 11,
      name: 'Marrakech',
      country: 'Morocco',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      rating: 4.6,
      reviews: 3450,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'Bustling souks, stunning palaces, and vibrant culture.',
      price: '$$',
    },
    {
      id: 12,
      name: 'Queenstown',
      country: 'New Zealand',
      image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg',
      rating: 4.8,
      reviews: 5120,
      category: 'adventure',
      budget: 'expensive',
      duration: '4-8 days',
      description: 'Adventure capital with bungee jumping, skiing, and breathtaking scenery.',
      price: '$$$',
    },
    {
      id: 13,
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg',
      rating: 4.9,
      reviews: 6543,
      category: 'romance',
      budget: 'expensive',
      duration: '3-6 days',
      description: 'Iconic whitewashed villages and stunning sunsets over the Aegean Sea.',
      price: '$$$',
    },
    {
      id: 14,
      name: 'Cape Town',
      country: 'South Africa',
      image: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg',
      rating: 4.7,
      reviews: 3890,
      category: 'cities',
      budget: 'moderate',
      duration: '5-7 days',
      description: 'Dramatic landscapes, Table Mountain, and vibrant city life.',
      price: '$$',
    },
    {
      id: 15,
      name: 'Banff National Park',
      country: 'Canada',
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
      rating: 4.8,
      reviews: 4780,
      category: 'mountains',
      budget: 'moderate',
      duration: '4-7 days',
      description: 'Turquoise lakes, snow-capped peaks, and pristine wilderness.',
      price: '$$',
    },
    {
      id: 16,
      name: 'Dubai',
      country: 'UAE',
      image: 'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg',
      rating: 4.7,
      reviews: 8000,
      category: 'cities',
      budget: 'expensive',
      duration: '3-6 days',
      description: 'Futuristic skyline, luxury shopping, and desert adventures.',
      price: '$$$',
    },
    {
      id: 17,
      name: 'Cusco',
      country: 'Peru',
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
      rating: 4.8,
      reviews: 4100,
      category: 'adventure',
      budget: 'moderate',
      duration: '4-7 days',
      description: 'Gateway to Machu Picchu and the Sacred Valley.',
      price: '$$',
    },
    {
      id: 18,
      name: 'Prague',
      country: 'Czech Republic',
      image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
      rating: 4.7,
      reviews: 5200,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'Fairytale architecture and vibrant nightlife.',
      price: '$$',
    },
    {
      id: 19,
      name: 'Phuket',
      country: 'Thailand',
      image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
      rating: 4.6,
      reviews: 6000,
      category: 'beaches',
      budget: 'moderate',
      duration: '5-8 days',
      description: 'Tropical beaches, lively markets, and vibrant nightlife.',
      price: '$$',
    },
    {
      id: 20,
      name: 'Seoul',
      country: 'South Korea',
      image: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg',
      rating: 4.8,
      reviews: 7100,
      category: 'cities',
      budget: 'moderate',
      duration: '4-7 days',
      description: 'Dynamic city blending tradition and technology.',
      price: '$$',
    },
    {
      id: 21,
      name: 'Venice',
      country: 'Italy',
      image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg',
      rating: 4.9,
      reviews: 9000,
      category: 'romance',
      budget: 'expensive',
      duration: '3-5 days',
      description: 'Romantic canals and historic architecture.',
      price: '$$$',
    },
    {
      id: 22,
      name: 'Rio de Janeiro',
      country: 'Brazil',
      image: 'https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg?auto=compress&w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 7800,
      category: 'adventure',
      budget: 'moderate',
      duration: '4-7 days',
      description: 'Famous beaches, Carnival, and Christ the Redeemer.',
      price: '$$',
    },
    {
      id: 23,
      name: 'Budapest',
      country: 'Hungary',
      image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
      rating: 4.6,
      reviews: 4300,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'Thermal baths, grand architecture, and vibrant nightlife.',
      price: '$$',
    },
    {
      id: 24,
      name: 'Bora Bora',
      country: 'French Polynesia',
      image: 'https://images.pexels.com/photos/753619/pexels-photo-753619.jpeg',
      rating: 4.9,
      reviews: 6500,
      category: 'romance',
      budget: 'luxury',
      duration: '5-8 days',
      description: 'Overwater bungalows and turquoise lagoons.',
      price: '$$$$',
    },
    {
      id: 25,
      name: 'Edinburgh',
      country: 'Scotland',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
      rating: 4.7,
      reviews: 3900,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'Historic castles and lively festivals.',
      price: '$$',
    },
    {
      id: 26,
      name: 'Havana',
      country: 'Cuba',
      image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
      rating: 4.6,
      reviews: 3200,
      category: 'cities',
      budget: 'budget',
      duration: '4-7 days',
      description: 'Colorful streets, classic cars, and vibrant music.',
      price: '$',
    },
    {
      id: 27,
      name: 'Maui',
      country: 'USA',
      image: 'https://images.pexels.com/photos/753619/pexels-photo-753619.jpeg',
      rating: 4.8,
      reviews: 5400,
      category: 'beaches',
      budget: 'expensive',
      duration: '5-8 days',
      description: 'Lush rainforests, volcanic landscapes, and stunning beaches.',
      price: '$$$',
    },
    {
      id: 28,
      name: 'Petropolis',
      country: 'Brazil',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&w=600&h=400&fit=crop',
      rating: 4.5,
      reviews: 2100,
      category: 'mountains',
      budget: 'budget',
      duration: '3-5 days',
      description: 'Imperial city in the mountains near Rio.',
      price: '$',
    },
    {
      id: 29,
      name: 'Dubrovnik',
      country: 'Croatia',
      image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg',
      rating: 4.8,
      reviews: 4700,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'Walled old town and Adriatic Sea views.',
      price: '$$',
    },
    {
      id: 30,
      name: 'Seychelles',
      country: 'Seychelles',
      image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
      rating: 4.9,
      reviews: 6100,
      category: 'beaches',
      budget: 'luxury',
      duration: '5-8 days',
      description: 'Pristine beaches and unique wildlife.',
      price: '$$$$',
    },
    {
      id: 31,
      name: 'Tallinn',
      country: 'Estonia',
      image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
      rating: 4.6,
      reviews: 2500,
      category: 'cities',
      budget: 'budget',
      duration: '3-5 days',
      description: 'Medieval old town and digital innovation.',
      price: '$',
    },
    {
      id: 32,
      name: 'Kotor',
      country: 'Montenegro',
      image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg',
      rating: 4.7,
      reviews: 2100,
      category: 'mountains',
      budget: 'budget',
      duration: '3-5 days',
      description: 'Bay of Kotor and medieval fortifications.',
      price: '$',
    },
    {
      id: 33,
      name: 'Valencia',
      country: 'Spain',
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
      rating: 4.7,
      reviews: 3300,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'City of Arts and Sciences and Mediterranean beaches.',
      price: '$$',
    },
    {
      id: 34,
      name: 'Lofoten Islands',
      country: 'Norway',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      rating: 4.8,
      reviews: 2900,
      category: 'adventure',
      budget: 'expensive',
      duration: '5-8 days',
      description: 'Dramatic peaks and fishing villages above the Arctic Circle.',
      price: '$$$',
    },
    {
      id: 35,
      name: 'Granada',
      country: 'Spain',
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
      rating: 4.7,
      reviews: 3100,
      category: 'cities',
      budget: 'moderate',
      duration: '3-5 days',
      description: 'Alhambra palace and Moorish history.',
      price: '$$',
    },
    {
      id: 36,
      name: 'Hoi An',
      country: 'Vietnam',
      image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
      rating: 4.8,
      reviews: 2700,
      category: 'food',
      budget: 'budget',
      duration: '3-5 days',
      description: 'Ancient town with lantern-lit streets and delicious cuisine.',
      price: '$',
    },
  ];

  useEffect(() => {
    // Store the original order on first render
    if (originalDestinations.length === 0) {
      setOriginalDestinations(allDestinations);
    }
    let filtered = reviewsActive ? [...allDestinations] : [...originalDestinations];

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
    if (ratingOrder === 'desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (ratingOrder === 'asc') {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (reviewsActive) {
      filtered.sort((a, b) => b.reviews - a.reviews);
    } else {
      // Keep the original order (no sort)
    }

    setFilteredDestinations(filtered);
  }, [searchQuery, selectedCategory, sortBy, ratingOrder, reviewsActive, originalDestinations]);

  return (
    <div className="min-h-screen bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-8 pt-20 ">
        {/* Header */}
        <div className="text-center mb-12">
         
        </div>

        <div className="text-[#3ABEFF] font-poppins font-semibold text-lg mb-2">Top destinations</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-poppins">Discover your destination</h2>

        {/* Search and Filters */}
        <div className="pt-6 mb-8">
          <div className="flex w-full gap-4 mb-8">
            {/* Search Bar */}
            <form className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-4 py-2" onSubmit={e => { e.preventDefault(); }}>
              <SearchIcon className="text-sky-400 h-5 w-5 mr-2" />
              <input
                type="text"
                placeholder="Search for destinations ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base font-poppins placeholder:text-gray-400"
              />
              <button type="submit" className="ml-2 px-5 py-1.5 bg-sky-400 text-white rounded-full font-poppins text-base font-normal hover:bg-sky-500 transition">Search</button>
            </form>
            {/* Right Icons */}
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${ratingOrder ? 'bg-[#197CAC]' : 'bg-sky-400'} hover:bg-sky-500`}
              onClick={() => {
                if (ratingOrder === null) setRatingOrder('desc');
                else if (ratingOrder === 'desc') setRatingOrder('asc');
                else setRatingOrder(null);
              }}
              title="Sort by rating"
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5833 1.66675V16.3334M14.5833 16.3334L10.9167 12.6667M14.5833 16.3334L18.25 12.6667M5.41667 16.3334V1.66675M5.41667 1.66675L1.75 5.33341M5.41667 1.66675L9.08333 5.33341" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${reviewsActive ? 'bg-[#197CAC]' : 'bg-sky-400'} hover:bg-sky-500`}
              onClick={() => setReviewsActive((prev) => !prev)}
              title="Sort by reviews"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 7H15.5M1.75 1.5H18.25M7.25 12.5H12.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
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
            {/* Result Count (in place of select) */}
            <span className="text-gray-600 font-poppins ml-4">Result: {filteredDestinations.length}</span>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredDestinations.slice((page - 1) * pageSize, page * pageSize).map((destination) => (
            <ExploreCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center py-8">
            <nav className="flex space-x-2">
              <button
                className="w-10 h-10 rounded-md border border-gray-300 text-gray-400 flex items-center justify-center"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`w-10 h-10 rounded-md border flex items-center justify-center font-poppins transition-colors ${
                    p === page
                      ? 'border-sky-400 text-sky-400 bg-white'
                      : 'border-gray-300 text-gray-400 hover:border-sky-200'
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="w-10 h-10 rounded-md border border-gray-300 text-gray-400 flex items-center justify-center"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </nav>
          </div>
        )}

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <SearchIcon className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-poppins">No destinations found</h3>
            <p className="text-gray-600 font-poppins">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

      
      </div>
        {/* Footer Section (copied from Homepage) */}
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

export default Explore; 