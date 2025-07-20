import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Clock, Save, Trash2, GripVertical } from 'lucide-react';

const ItineraryBuilder = () => {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState([
    {
      id: 1,
      date: 'Day 1',
      activities: [
        {
          id: 1,
          name: 'Arrive at Airport',
          time: '10:00 AM',
          type: 'transport',
          location: 'International Airport',
          notes: 'Flight arrives at 10:00 AM',
        },
      ],
    },
  ]);

  const activityTypes = [
    { id: 'attraction', name: 'Attraction', color: 'bg-blue-100 text-blue-800' },
    { id: 'restaurant', name: 'Restaurant', color: 'bg-green-100 text-green-800' },
    { id: 'hotel', name: 'Hotel', color: 'bg-purple-100 text-purple-800' },
    { id: 'transport', name: 'Transport', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'shopping', name: 'Shopping', color: 'bg-pink-100 text-pink-800' },
    { id: 'entertainment', name: 'Entertainment', color: 'bg-orange-100 text-orange-800' },
  ];

  const [showAddActivity, setShowAddActivity] = useState({ show: false, dayId: null });
  const [newActivity, setNewActivity] = useState({
    name: '',
    time: '',
    type: 'attraction',
    location: '',
    notes: '',
  });

  const addDay = () => {
    const newDay = {
      id: days.length + 1,
      date: `Day ${days.length + 1}`,
      activities: [],
    };
    setDays([...days, newDay]);
  };

  const addActivity = (dayId) => {
    if (!newActivity.name || !newActivity.time) return;

    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [
            ...day.activities,
            {
              id: Date.now(),
              ...newActivity,
            },
          ],
        };
      }
      return day;
    });

    setDays(updatedDays);
    setNewActivity({ name: '', time: '', type: 'attraction', location: '', notes: '' });
    setShowAddActivity({ show: false, dayId: null });
  };

  const removeActivity = (dayId, activityId) => {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter(activity => activity.id !== activityId),
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const removeDay = (dayId) => {
    if (days.length > 1) {
      setDays(days.filter(day => day.id !== dayId));
    }
  };

  const getActivityTypeStyle = (type) => {
    const activityType = activityTypes.find(t => t.id === type);
    return activityType ? activityType.color : 'bg-gray-100 text-gray-800';
  };

  const saveItinerary = () => {
    // Save itinerary logic here
    alert('Itinerary saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Itinerary
          </h1>
          <p className="text-xl text-gray-600">
            Create a detailed day-by-day plan for your perfect trip.
          </p>
        </div>

        {/* Trip Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Name
              </label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="My Amazing Trip"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Paris, France"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Itinerary Days */}
        <div className="space-y-6 mb-8">
          {days.map((day) => (
            <div key={day.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Day Header */}
              <div className="bg-sky-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">{day.date}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAddActivity({ show: true, dayId: day.id })}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    Add Activity
                  </button>
                  {days.length > 1 && (
                    <button
                      onClick={() => removeDay(day.id)}
                      className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Activities */}
              <div className="p-6">
                {day.activities.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No activities planned for this day.</p>
                    <button
                      onClick={() => setShowAddActivity({ show: true, dayId: day.id })}
                      className="mt-3 text-sky-600 hover:text-sky-700 font-medium"
                    >
                      Add your first activity
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium text-gray-900">{activity.name}</h4>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityTypeStyle(activity.type)}`}>
                                  {activityTypes.find(t => t.id === activity.type)?.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{activity.time}</span>
                                </div>
                                {activity.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{activity.location}</span>
                                  </div>
                                )}
                              </div>
                              {activity.notes && (
                                <p className="text-sm text-gray-600">{activity.notes}</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeActivity(day.id, activity.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Activity Form */}
                {showAddActivity.show && showAddActivity.dayId === day.id && (
                  <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Add New Activity</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Activity Name *
                        </label>
                        <input
                          type="text"
                          value={newActivity.name}
                          onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                          placeholder="Visit Eiffel Tower"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time *
                        </label>
                        <input
                          type="time"
                          value={newActivity.time}
                          onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={newActivity.type}
                          onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                          {activityTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={newActivity.location}
                          onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                          placeholder="Champ de Mars, Paris"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={newActivity.notes}
                        onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                        placeholder="Any additional notes..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => addActivity(day.id)}
                        className="px-4 py-2 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors"
                      >
                        Add Activity
                      </button>
                      <button
                        onClick={() => setShowAddActivity({ show: false, dayId: null })}
                        className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Add Day Button */}
          <button
            onClick={addDay}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:text-sky-600 hover:border-sky-300 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Another Day</span>
          </button>
        </div>

        {/* Save Button */}
        <div className="text-center pb-8">
          <button
            onClick={saveItinerary}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors hover:scale-105 transform"
          >
            <Save className="h-5 w-5" />
            <span>Save Itinerary</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder; 