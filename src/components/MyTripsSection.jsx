import React from 'react';
import { useAuth } from './AuthContext.jsx';
import { Link } from 'react-router-dom';
import TripCard from './TripCard.jsx';

const trips = [
  {
    id: 1,
    name: 'European Adventure',
    destination: 'Paris, Rome, Barcelona',
    startDate: '2024-06-15',
    endDate: '2024-06-25',
    days: 10,
    collaborators: 3,
    collaboratorAvatars: [
      'https://randomuser.me/api/portraits/women/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/men/2.jpg',
    ],
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
    status: 'planning',
    activities: 24,
    description: 'A whirlwind tour of Europe\'s most iconic cities, filled with art, food, and adventure. Experience the romance of Paris, the history of Rome, and the vibrant culture of Barcelona. Enjoy world-class cuisine, breathtaking architecture, and unforgettable memories as you travel through these amazing destinations with friends or family From the Eiffel Tower to the Colosseum, every day brings a new adventure. Capture stunning photos, meet new people, and immerse yourself in the local culture.This trip is perfect for explorers, foodies, and anyone looking to make lifelong memories.'
  },
  {
    id: 2,
    name: 'Tropical Getaway',
    destination: 'Bali, Indonesia',
    startDate: '2024-08-10',
    endDate: '2024-08-18',
    days: 8,
    collaborators: 1,
    collaboratorAvatars: [
      'https://randomuser.me/api/portraits/men/3.jpg',
    ],
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
    status: 'booked',
    activities: 18,
    description: 'Relax on the beaches of Bali and explore lush jungles and vibrant culture.'
  },
  {
    id: 3,
    name: 'Mountain Retreat',
    destination: 'Swiss Alps, Switzerland',
    startDate: '2024-12-20',
    endDate: '2024-12-28',
    days: 8,
    collaborators: 4,
    collaboratorAvatars: [
      'https://randomuser.me/api/portraits/men/4.jpg',
      'https://randomuser.me/api/portraits/men/5.jpg',
      'https://randomuser.me/api/portraits/men/6.jpg',
      'https://randomuser.me/api/portraits/men/7.jpg',
    ],
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    status: 'completed',
    activities: 15,
    description: 'A cozy winter escape in the heart of the Alps, perfect for skiing and relaxation.'
  },
  {
    id: 4,
    name: 'Desert Safari',
    destination: 'Sahara, Morocco',
    startDate: '2024-09-05',
    endDate: '2024-09-12',
    days: 7,
    collaborators: 2,
    collaboratorAvatars: [
      'https://randomuser.me/api/portraits/men/8.jpg',
      'https://randomuser.me/api/portraits/men/9.jpg',
    ],
    image: 'https://images.pexels.com/photos/248771/pexels-photo-248771.jpeg',
    status: 'planning',
    activities: 10,
    description: 'Experience the magic of the Sahara with camel rides, starry nights, and Berber hospitality. Adventure and culture await in the world’s largest desert.'
  },
  {
    id: 5,
    name: 'City Lights',
    destination: 'New York, USA',
    startDate: '2024-11-01',
    endDate: '2024-11-07',
    days: 6,
    collaborators: 3,
    collaboratorAvatars: [
      'https://randomuser.me/api/portraits/women/3.jpg',
      'https://randomuser.me/api/portraits/men/10.jpg',
      'https://randomuser.me/api/portraits/men/11.jpg',
    ],
    image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
    status: 'booked',
    activities: 12,
    description: 'Explore the city that never sleeps! From Broadway shows to Central Park, enjoy the best of New York with friends and family.'
  },
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const MyTripsSection = () => {
  const { user } = useAuth();
  if (!user) return null;

  const activeTrip = trips.find(t => t.status === 'planning' || t.status === 'booked') || trips[0];
  const otherTrips = trips.filter(t => t.id !== activeTrip.id);
  const showTrips = otherTrips.slice(0, 3);
  const hasMoreTrips = otherTrips.length > 3;

  return (
    <section className="max-w-7xl mx-auto mt-16 mb-20 px-4">
      <h2 className="text-center text-sky-500 font-poppins font-semibold text-lg mb-2">My Trips</h2>
      <h1 className="text-center text-black font-poppins font-bold text-3xl mb-14">My Travel Plans</h1>
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-black">Active trip</h3>
          <Link to="/my-trips" className="text-sm text-black font-medium hover:underline flex items-center gap-1">See all <span className="text-black">&rarr;</span></Link>
        </div>
        <div className="flex flex-col md:flex-row gap-16 mb-24">
          <img src={activeTrip.image} alt={activeTrip.name} className="w-full md:w-[400px] h-60 rounded-xl object-cover" />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-2xl mb-4" style={{ color: '#197CAC' }}>{activeTrip.destination}</h4>
              <div className="flex flex-col items-center">
                <div className="text-[14px] font-poppins font-medium mb-1 text-center" style={{ color: '#197CAC' }}>{formatDate(activeTrip.startDate)} - {formatDate(activeTrip.endDate)}</div>
                <div className="text-[14px] font-poppins font-medium mb-6 text-center" style={{ color: '#197CAC' }}>{activeTrip.activities} activities</div>
              </div>
              <p className="text-gray-600 text-base mb-2 line-clamp-3">{activeTrip.description}</p>
            </div>
            <Link to={`/itinerary?trip=${activeTrip.id}`} className="text-sm font-medium hover:underline flex items-center gap-1 mt-2" style={{ color: '#197CAC' }}>more details <span style={{ color: '#197CAC' }}>&rarr;</span></Link>
          </div>
        </div>
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold text-black text-center flex-1">Other Trips</h3>
          {hasMoreTrips && (
            <Link to="/my-trips" className="text-sm font-medium text-black hover:underline flex items-center gap-1 ml-4 whitespace-nowrap">See all <span className="text-black">&rarr;</span></Link>
          )}
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {showTrips.map(trip => (
            <div key={trip.id} className="flex justify-center">
              <TripCard trip={trip} linkColor="black" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyTripsSection; 