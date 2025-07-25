import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ExploreCard from '../components/ExploreCard.jsx';
import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { HotelsIcon, DishesIcon, FlightsIcon } from '../components/Icons.jsx';
import AttractionCard from '../components/AttractionCard.jsx';
import { useSelectedDestination } from '../components/SelectedDestinationContext.jsx';

// Copy the destinations array from Explore.jsx (in a real app, this would be shared or fetched)
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
      description: 'Crystal clear waters and overwater bungalows in paradise. Enjoy snorkeling, diving, and relaxing on pristine beaches. The Maldives is renowned for its vibrant marine life, luxurious resorts, and unforgettable sunsets. Whether you are seeking adventure or tranquility, this destination offers something for everyone. Experience the unique culture, delicious cuisine, and warm hospitality that make the Maldives a top travel destination year after year.',
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

const placeholderAttractions = [
  // For now, use 3 sample attractions (can be the same as the main destination or similar)
  // In the future, this can be replaced with real data per destination
  {
    id: 'a1',
    name: 'Lake Como, Italy',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 4.2,
    description: 'Famous villa with gardens seen in James Bond & Star Wars',
    duration: '1-2 hours',
  },
  {
    id: 'a2',
    name: 'Lake Como, Italy',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 4.2,
    description: 'Famous villa with gardens seen in James Bond & Star Wars',
    duration: '1-2 hours',
  },
  {
    id: 'a3',
    name: 'Lake Como, Italy',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 4.2,
    description: 'Famous villa with gardens seen in James Bond & Star Wars',
    duration: '1-2 hours',
  },
];

const DestinationDetails = () => {
  const { id } = useParams();
  const destination = allDestinations.find(dest => String(dest.id) === String(id));
  const navigate = useNavigate();
  const { setSelectedDestination } = useSelectedDestination();

  // Memoize attractions list to avoid recalculating on every render
  const attractionsList = useMemo(() => allDestinations.filter(dest => String(dest.id) !== String(id)), [id]);
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleAttractions = attractionsList.slice(0, visibleCount);
  const [descExpanded, setDescExpanded] = useState(false);

  if (!destination) {
    return <div className="text-center py-20">Destination not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 mt-24 mb-10 font-poppins">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/explore" className="flex items-center">
            <ArrowLeft className="h-6 w-6 text-black" />
          </Link>
          <h1 className="text-2xl font-bold text-black">{destination.name}, {destination.country}</h1>
        </div>
        <button
          className="bg-[#3ABEFF] text-white px-5 py-2 rounded-full font-normal text-base hover:bg-[#259fdc] transition flex items-center gap-2"
          onClick={() => {
            setSelectedDestination({
              id: destination.id,
              name: destination.name,
              country: destination.country,
              image: destination.image,
              category: destination.category,
              description: destination.description,
              // add more fields as needed
            });
            navigate('/build-trip');
          }}
        >
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0.75V11.25M0.75 6H11.25" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Create new trip
        </button>
      </div>
      {/* Main Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img src={destination.image} alt={destination.name} className="w-full md:w-96 h-64 object-cover rounded-xl" />
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-xl font-semibold" style={{ color: '#197CAC' }}>{destination.name}, {destination.country}</div>
          <div className="text-sm" style={{ color: '#197CAC' }}>3 Jan 2028 - 15 Jan 2028</div>
          <div className="text-sm" style={{ color: '#197CAC' }}>12 activities</div>
          <div className={`text-gray-600 mb-2 ${descExpanded ? '' : 'line-clamp-3'}`} style={{overflow: 'hidden'}}>
            {destination.description}
          </div>
          <button
            className="hover:underline text-sm w-fit text-left"
            style={{ color: '#197CAC' }}
            onClick={() => setDescExpanded(e => !e)}
          >
            {descExpanded ? 'View less' : 'View more '} {descExpanded ? '' : <span>&rarr;</span>}
          </button>
        </div>
      </div>
      {/* Top Attractions */}
      <div className="mb-6" id="attractions-section">
        <h2 className="text-lg font-bold mb-4">Top attractions</h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          <Link to="/hotels" className="flex items-center gap-2 border border-gray-200 rounded-xl bg-white text-[#197CAC] font-poppins font-medium text-base px-6 py-3 h-12 w-full shadow-sm">
            <span className="inline-block"><HotelsIcon /></span>
            Hotels in this area
          </Link>
          <Link to="/dishes" className="flex items-center gap-2 border border-gray-200 rounded-xl bg-white text-[#197CAC] font-poppins font-medium text-base px-6 py-3 h-12 w-full shadow-sm">
            <span className="inline-block"><DishesIcon /></span>
            Dishes & food
          </Link>
          <button className="flex items-center gap-2 border border-gray-200 rounded-xl bg-white text-[#197CAC] font-poppins font-medium text-base px-6 py-3 h-12 w-full shadow-sm">
            <span className="inline-block"><FlightsIcon /></span>
            Flights
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleAttractions.map(attraction => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
        {visibleCount < attractionsList.length && (
          <div className="flex justify-center mt-16">
            <button
              className="px-6 py-2 bg-sky-100 text-sky-600 rounded-full font-semibold hover:bg-sky-200 transition"
              onClick={() => setVisibleCount(attractionsList.length)}
            >
              Load more attractions
            </button>
          </div>
        )}
        {visibleCount >= attractionsList.length && attractionsList.length > 3 && (
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition"
              onClick={() => {
                setVisibleCount(3);
                const section = document.getElementById('attractions-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Show less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetails; 