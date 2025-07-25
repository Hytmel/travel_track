import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DestinationsSection from '../components/DestinationsSection';
import TripActivities from '../components/TripActivities';
import { ArrowBetweenDestinations, ArrowBetweenDestinationsB } from '../components/Icons';
import { ArrowLeft } from 'lucide-react'; // Added missing import
import { useSelectedDestination } from '../components/SelectedDestinationContext.jsx';
import { useAuth } from '../components/AuthContext';
import TravelMatesSection from '../components/TravelMatesSection';
import WeatherCard from '../components/WeatherCard';
import TripPackageInformationTab from './TripPackageInformationTab';
import TripPackageActivitiesTab from './TripPackageActivitiesTab';

function TripPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDestination } = useSelectedDestination();
  const { tripInfo } = useSelectedDestination();
  const destinations = location.state?.destinations || [];
  const { user } = useAuth();
  // Travel mates state and handlers
  const [invitedFriends, setInvitedFriends] = useState(location.state?.invitedFriends || []);
  function handleAddFriend(friend) {
    if (friend && !invitedFriends.includes(friend)) {
      setInvitedFriends([...invitedFriends, friend]);
    }
  }
  function handleRemoveFriend(friend) {
    setInvitedFriends(invitedFriends.filter(f => f !== friend));
  }

  // Trip Activities state and handlers (copied from BuildTrip, but initialize days from navigation)
  // Remove local days state, use days from context
  const [showAddActivity, setShowAddActivity] = useState({ show: false, dayId: null });
  const [newActivity, setNewActivity] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  const [editingActivity, setEditingActivity] = useState({ dayId: null, activityId: null });
  const [editActivityData, setEditActivityData] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  const [expandedDays, setExpandedDays] = useState((tripInfo.days || []).map(day => day.id)); // expand all by default

  // Use tripInfo for all trip data
  const tripName = tripInfo.tripName || 'My trip to dream place';
  const destinationName = tripInfo.destinationTitle || tripInfo.destinations?.[0] || 'Lake Como, Italy';
  const destinationCountry = tripInfo.destinationCountry || '';
  const startDate = tripInfo.startDate || '';
  const endDate = tripInfo.endDate || '';
  const tripType = tripInfo.tripType || 'Romantic';
  const destinationImage = tripInfo.destinationImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';
  const destinationDescription = tripInfo.destinationDescription || '';
  const destinationsList = tripInfo.destinations?.length > 0 ? tripInfo.destinations : [tripInfo.destinationTitle || 'Lake Como, Italy'];
  const travelMates = tripInfo.travelMates?.length > 0 ? tripInfo.travelMates : [];
  const days = tripInfo.days || [];
  // Weather mock data
  const weather = [
    { date: '21 Jan 2025', icon: '☀️', temp: 20, high: 21, low: 19, wind: 'Fast Wind' },
    { date: '22 Jan 2025', icon: '🌤️', temp: 21, high: 22, low: 20, wind: 'Fast Wind' },
    { date: '23 Jan 2025', icon: '⛅', temp: 19, high: 20, low: 18, wind: 'Fast Wind' },
    { date: '24 Jan 2025', icon: '☀️', temp: 22, high: 23, low: 21, wind: 'Fast Wind' },
    { date: '25 Jan 2025', icon: '🌤️', temp: 20, high: 21, low: 19, wind: 'Fast Wind' },
  ];

  // Tab state
  const tabList = [
    { key: 'information', label: 'Information' },
    { key: 'activities', label: 'Activities & Package' },
    { key: 'itinerary', label: 'Destinations & Itinerary' },
    { key: 'budget', label: 'Budget & Expenses' },
    { key: 'diary', label: 'Trip diary' },
  ];
  const [activeTab, setActiveTab] = useState(location.state?.defaultTab || 'information');

  // Add descExpanded state for view more/less toggle
  const [descExpanded, setDescExpanded] = useState(false);

  // Destinations editing state and handlers (copied from BuildTrip)
  const [editingIdx, setEditingIdx] = useState(null);
  const [destinationsState, setDestinationsState] = useState([...destinationsList]);
  function handleDestinationChange(index, value) {
    const newDestinations = [...destinationsState];
    newDestinations[index] = value;
    setDestinationsState(newDestinations);
  }
  function handleDestinationKeyDown(e, index) {
    if (e.key === "Enter") {
      if (destinationsState[index].trim() && index === destinationsState.length - 1) {
        setDestinationsState([...destinationsState, ""]);
      }
      setEditingIdx(null);
    }
  }
  function handleDestinationBlur(index) {
    if (destinationsState[index].trim() && index === destinationsState.length - 1) {
      setDestinationsState([...destinationsState, ""]);
    }
    setEditingIdx(null);
  }

  const toggleDay = (dayId) => {
    setExpandedDays((prev) =>
      prev.includes(dayId) ? prev.filter((id) => id !== dayId) : [...prev, dayId]
    );
  };
  const getNextDayNumber = () => {
    const numbers = days.map(day => {
      const match = day.label && day.label.match(/Day (\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
    let n = 1;
    while (numbers.includes(n)) n++;
    return n;
  };
  const addDay = () => {
    const nextNum = getNextDayNumber();
    const newDay = {
      id: Date.now(),
      label: `Day ${nextNum}`,
      date: '',
      activities: [],
    };
    setDays([...days, newDay]);
    setExpandedDays((prev) => [...prev, newDay.id]);
  };
  const addActivity = (dayId) => {
    if (!newActivity.name || !newActivity.time) return;
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [
            ...day.activities,
            { id: Date.now(), ...newActivity, user: { name: 'Current User' } },
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
      setDays(prevDays => prevDays.filter(day => day.id !== dayId));
    }
  };
  const startEditActivity = (dayId, activity) => {
    setEditingActivity({ dayId, activityId: activity.id });
    setEditActivityData({
      name: activity.name,
      time: activity.time,
      type: activity.type,
      location: activity.location,
      notes: activity.notes || '',
    });
  };
  const cancelEditActivity = () => {
    setEditingActivity({ dayId: null, activityId: null });
    setEditActivityData({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  };
  const saveEditActivity = () => {
    setDays(days => days.map(day => {
      if (day.id === editingActivity.dayId) {
        return {
          ...day,
          activities: day.activities.map(activity =>
            activity.id === editingActivity.activityId
              ? { ...activity, ...editActivityData }
              : activity
          ),
        };
      }
      return day;
    }));
    cancelEditActivity();
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow border border-gray-200 mt-24 mb-10 font-poppins">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 font-poppins">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="flex items-center">
            <ArrowLeft className="h-6 w-6 text-black" />
          </button>
          <h1 className="text-2xl font-bold text-black">Build your trip</h1>
        </div>
        <button className="bg-[#E6F4FB] text-[#3ABEFF] px-6 py-2 rounded-full font-normal text-base hover:bg-[#d0eafd] transition flex items-center gap-2 border border-[#3ABEFF]">
          Share trip
        </button>
      </div>
      {/* Tabs */}
      <div className="flex items-center gap-12 mb-8 font-poppins">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-[20px] font-medium transition-colors focus:outline-none pb-2 ${activeTab === tab.key ? 'text-[#197CAC] border-b-2 border-[#197CAC]' : 'text-[#A4A1A1] border-b-2 border-[#A4A1A1]'}`}
            style={{ minWidth: 0 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* All Information tab content below uses font-poppins */}
      {activeTab === 'information' && (
        <TripPackageInformationTab
          destinationImage={destinationImage}
          destinationName={destinationName}
          destinationCountry={destinationCountry}
          startDate={startDate}
          endDate={endDate}
          tripName={tripName}
          tripType={tripType}
          destinationDescription={destinationDescription}
          descExpanded={descExpanded}
          setDescExpanded={setDescExpanded}
          days={days}
          editingIdx={editingIdx}
          setEditingIdx={setEditingIdx}
          destinationsState={destinationsState}
          handleDestinationChange={handleDestinationChange}
          handleDestinationKeyDown={handleDestinationKeyDown}
          handleDestinationBlur={handleDestinationBlur}
          invitedFriends={travelMates}
          handleAddFriend={handleAddFriend}
          handleRemoveFriend={handleRemoveFriend}
          user={user}
          weather={weather}
        />
      )}

      {/* Activities & Package tab content */}
      {activeTab === 'activities' && (
        <TripPackageActivitiesTab
          days={days}
          showAddActivity={showAddActivity}
          setShowAddActivity={setShowAddActivity}
          newActivity={newActivity}
          setNewActivity={setNewActivity}
          editingActivity={editingActivity}
          setEditingActivity={setEditingActivity}
          editActivityData={editActivityData}
          setEditActivityData={setEditActivityData}
          startEditActivity={startEditActivity}
          cancelEditActivity={cancelEditActivity}
          saveEditActivity={saveEditActivity}
          addActivity={addActivity}
          removeActivity={removeActivity}
          removeDay={removeDay}
          addDay={addDay}
          toggleDay={toggleDay}
          expandedDays={expandedDays}
          destinationName={destinationName}
          destinationCountry={destinationCountry}
        />
      )}

      {/* Itinerary tab content */}
      {activeTab === 'itinerary' && (
        <div className="font-poppins">
          <h2 className="text-[20px] font-semibold mb-4" style={{ color: '#197CAC' }}>Itinerary</h2>
          {days.map(day => (
            <div key={day.id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold" style={{ color: '#197CAC' }}>{day.label}</h3>
                <button onClick={() => toggleDay(day.id)} className="text-gray-500 hover:text-gray-700">
                  {expandedDays.includes(day.id) ? '▲' : '▼'}
                </button>
              </div>
              {expandedDays.includes(day.id) && (
                <>
                  <p className="text-sm text-gray-600 mb-2">Date: {day.date}</p>
                  <div className="grid gap-3">
                    {day.activities.map(activity => (
                      <div key={activity.id} className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-lg font-semibold" style={{ color: '#197CAC' }}>{activity.name}</p>
                        <p className="text-sm text-gray-600">Time: {activity.time}</p>
                        <p className="text-sm text-gray-600">Type: {activity.type}</p>
                        <p className="text-sm text-gray-600">Location: {activity.location}</p>
                        <p className="text-sm text-gray-600">Notes: {activity.notes}</p>
                        <p className="text-sm text-gray-600">User: {activity.user.name}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <button onClick={() => startEditActivity(day.id, activity)} className="text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/><path d="M2 22l7.5-4.5 1.5-1.5-1.5-1.5L2 22z"/></svg>
                          </button>
                          <button onClick={() => removeActivity(day.id, activity.id)} className="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addActivity(day.id)} className="mt-4 text-sm text-blue-500 hover:underline">
                    Add Activity
                  </button>
                </>
              )}
            </div>
          ))}
          <button onClick={addDay} className="mt-4 text-sm text-blue-500 hover:underline">
            Add Day
          </button>
        </div>
      )}

      {/* Budget & Expenses tab content */}
      {activeTab === 'budget' && (
        <div className="font-poppins">
          <h2 className="text-[20px] font-semibold mb-4" style={{ color: '#197CAC' }}>Budget & Expenses</h2>
          <p>This section is under construction. Please check back later.</p>
        </div>
      )}

      {/* Trip diary tab content */}
      {activeTab === 'diary' && (
        <div className="font-poppins">
          <h2 className="text-[20px] font-semibold mb-4" style={{ color: '#197CAC' }}>Trip diary</h2>
          <p>This section is under construction. Please check back later.</p>
        </div>
      )}
    </div>
  );
}

export default TripPackage;