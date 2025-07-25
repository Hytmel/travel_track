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
import TripPackageItineraryTab from './TripPackageItineraryTab';

function TripPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDestination } = useSelectedDestination();
  const { tripInfo, setTripInfo } = useSelectedDestination();
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

  // Destinations editing state and handlers - update context immediately
  const [editingIdx, setEditingIdx] = useState(null);
  
  function handleDestinationChange(index, value) {
    const newDestinations = [...(tripInfo.destinations || [])];
    newDestinations[index] = value;
    setTripInfo(prev => ({
      ...prev,
      destinations: newDestinations,
    }));
  }
  function handleDestinationKeyDown(e, index) {
    if (e.key === "Enter") {
      const currentDestinations = tripInfo.destinations || [];
      if (currentDestinations[index].trim() && index === currentDestinations.length - 1) {
        setTripInfo(prev => ({
          ...prev,
          destinations: [...currentDestinations, ""],
        }));
      }
      setEditingIdx(null);
    }
  }
  function handleDestinationBlur(index) {
    const currentDestinations = tripInfo.destinations || [];
    if (currentDestinations[index].trim() && index === currentDestinations.length - 1) {
      setTripInfo(prev => ({
        ...prev,
        destinations: [...currentDestinations, ""],
      }));
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
    setTripInfo(prev => ({
      ...prev,
      days: [...(prev.days || []), newDay],
    }));
    setExpandedDays((prev) => [...prev, newDay.id]);
  };
  const addActivity = (dayId) => {
    if (!newActivity.name || !newActivity.time) return;
    setTripInfo(prev => ({
      ...prev,
      days: (prev.days || []).map(day => {
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
      }),
    }));
    setNewActivity({ name: '', time: '', type: 'attraction', location: '', notes: '' });
    setShowAddActivity({ show: false, dayId: null });
  };
  const removeActivity = (dayId, activityId) => {
    setTripInfo(prev => ({
      ...prev,
      days: (prev.days || []).map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.filter(activity => activity.id !== activityId),
          };
        }
        return day;
      }),
    }));
  };
  const removeDay = (dayId) => {
    if ((tripInfo.days || []).length > 1) {
      setTripInfo(prev => ({
        ...prev,
        days: (prev.days || []).filter(day => day.id !== dayId),
      }));
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
    setTripInfo(prev => ({
      ...prev,
      days: (prev.days || []).map(day => {
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
      }),
    }));
    cancelEditActivity();
  };

  // Build trip button handler - saves all changes to context
  const handleBuildTrip = () => {
    setTripInfo(prev => ({
      ...prev,
      travelMates: invitedFriends,
      // Keep other existing data
      tripName: prev.tripName,
      startDate: prev.startDate,
      endDate: prev.endDate,
      destinationTitle: prev.destinationTitle,
      tripType: prev.tripType,
      destinationImage: prev.destinationImage,
      destinationDescription: prev.destinationDescription,
    }));
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
            handleDestinationChange={handleDestinationChange}
            handleDestinationKeyDown={handleDestinationKeyDown}
            handleDestinationBlur={handleDestinationBlur}
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
           editingIdx={editingIdx}
           setEditingIdx={setEditingIdx}
           handleDestinationChange={handleDestinationChange}
           handleDestinationKeyDown={handleDestinationKeyDown}
           handleDestinationBlur={handleDestinationBlur}
         />
       )}

             {/* Itinerary tab content */}
               {activeTab === 'itinerary' && (
          <TripPackageItineraryTab
            editingIdx={editingIdx}
            setEditingIdx={setEditingIdx}
            handleDestinationChange={handleDestinationChange}
            handleDestinationKeyDown={handleDestinationKeyDown}
            handleDestinationBlur={handleDestinationBlur}
            weather={weather}
          />
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

       {/* Build trip button - appears for all tabs */}
       <div className="flex justify-end mt-8 font-poppins">
         <button 
           className="bg-[#72D1FF] text-white px-8 py-2 rounded-full font-medium text-[20px] hover:bg-[#3ABEFF] transition font-poppins" 
           onClick={handleBuildTrip}
         >
           Build trip
         </button>
       </div>
     </div>
   );
 }

export default TripPackage;