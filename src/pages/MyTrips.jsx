import React, { useState } from 'react';
import { Calendar, MapPin, Users, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyTrips = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'European Adventure',
      destination: 'Paris, Rome, Barcelona',
      startDate: '2024-06-15',
      endDate: '2024-06-25',
      days: 10,
      collaborators: 3,
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
      status: 'planning',
      activities: 24,
    },
    {
      id: 2,
      name: 'Tropical Getaway',
      destination: 'Bali, Indonesia',
      startDate: '2024-08-10',
      endDate: '2024-08-18',
      days: 8,
      collaborators: 1,
      image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
      status: 'booked',
      activities: 18,
    },
    {
      id: 3,
      name: 'Mountain Retreat',
      destination: 'Swiss Alps, Switzerland',
      startDate: '2024-12-20',
      endDate: '2024-12-28',
      days: 8,
      collaborators: 4,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      status: 'completed',
      activities: 15,
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'booked':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteTrip = (tripId) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Trips
            </h1>
            <p className="text-xl text-gray-600">
              Manage and view all your planned adventures.
            </p>
          </div>
          <Link
            to="/itinerary"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Trip</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-sky-600 mb-2">{trips.length}</div>
            <div className="text-gray-600">Total Trips</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {trips.filter(trip => trip.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {trips.reduce((acc, trip) => acc + trip.days, 0)}
            </div>
            <div className="text-gray-600">Total Days</div>
          </div>
        </div>

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="mb-6">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-6">Start planning your first adventure!</p>
            <Link
              to="/itinerary"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Trip</span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(trip.status)}`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                  <div className="absolutef top-3 right-3 flex space-x-1">
                    <button className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{trip.name}</h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{trip.destination}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{trip.collaborators} collaborator{trip.collaborators !== 1 ? 's' : ''}</span>
                    </div>
                    <span>{trip.activities} activities</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/itinerary?trip=${trip.id}`}
                      className="flex-1 py-2 bg-sky-500 text-white text-center font-medium rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips; 