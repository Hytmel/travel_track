import React, { createContext, useContext, useState } from 'react';

const SelectedDestinationContext = createContext();

export function SelectedDestinationProvider({ children }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  // New: full trip info state
  const [tripInfo, setTripInfo] = useState({
    destinations: [],
    travelMates: [],
    days: [],
    tripName: '',
    startDate: '',
    endDate: '',
    tripType: '',
    destinationImage: '',
    destinationDescription: '',
    destinationTitle: '', // Added destination title
    packageList: [], // Added package list for global management
    budgetSections: [], // Added budget sections
    diarySections: [], // Added diary sections
    totalBudget: 0, // Added total budget
    // add more fields as needed
  });

  // User trips state to store all trips created by the user
  const [userTrips, setUserTrips] = useState([
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
      description: 'Experience the magic of the Sahara with camel rides, starry nights, and Berber hospitality. Adventure and culture await in the world\'s largest desert.'
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
  ]);
  return (
    <SelectedDestinationContext.Provider value={{ selectedDestination, setSelectedDestination, tripInfo, setTripInfo }}>
      {children}
    </SelectedDestinationContext.Provider>
  );
}

export function useSelectedDestination() {
  return useContext(SelectedDestinationContext);
} 