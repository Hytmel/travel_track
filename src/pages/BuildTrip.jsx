import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Plus } from 'lucide-react';
import TripActivities from '../components/TripActivities';
import piiic from '../assets/images/piiic.png';
import { ArrowBetweenDestinations, ArrowBetweenDestinationsB } from '../components/Icons';
import { Calendar, MapPin, Clock, Trash2, GripVertical } from 'lucide-react';
import { useSelectedDestination } from '../components/SelectedDestinationContext.jsx';

const BuildTrip = () => {
  const location = useLocation();
  const { selectedDestination, setTripInfo, tripInfo } = useSelectedDestination();
  const destinationId = selectedDestination?.id || location.state?.destinationId;
  const [tripName, setTripName] = useState("");
  const [invitedFriends, setInvitedFriends] = useState([]);
  const [destinations, setDestinations] = useState([""]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  // Trip Activities state and handlers
  const [days, setDays] = useState([]);
  const [showAddActivity, setShowAddActivity] = useState({ show: false, dayId: null });
  const [newActivity, setNewActivity] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  const [editingActivity, setEditingActivity] = useState({ dayId: null, activityId: null });
  const [editActivityData, setEditActivityData] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  const [expandedDays, setExpandedDays] = useState([]);

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
    setTripInfo({
      ...tripInfo,
      days: (tripInfo.days || []).filter(day => day.id !== dayId),
    });
    setDays(prevDays => prevDays.filter(day => day.id !== dayId));
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

  function handleAddFriend(friend) {
    if (friend && !invitedFriends.includes(friend)) {
      setInvitedFriends([...invitedFriends, friend]);
    }
  }

  function handleRemoveFriend(friend) {
    setInvitedFriends(invitedFriends.filter(f => f !== friend));
  }

  function handleDestinationChange(index, value) {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
  }

  function handleDestinationKeyDown(e, index) {
    if (e.key === "Enter") {
      if (destinations[index].trim() && index === destinations.length - 1) {
        setDestinations([...destinations, ""]);
      }
      setEditingIdx(null);
    }
  }

  function handleDestinationBlur(index) {
    if (destinations[index].trim() && index === destinations.length - 1) {
      setDestinations([...destinations, ""]);
    }
    setEditingIdx(null);
  }

  // Validation for required fields
  const isDetailsComplete = tripName.trim() && startDate && endDate && (selectedDestination?.name || "") && (selectedDestination?.category || "");
  const [showError, setShowError] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow border border-gray-200 mt-24 mb-10 font-poppins">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to={destinationId ? `/destination/${destinationId}` : "/my-trips"} className="flex items-center">
            <ArrowLeft className="h-6 w-6 text-black" />
          </Link>
          <h1 className="text-2xl font-bold text-black">Build your trip</h1>
        </div>
        <button className="bg-[#E6F4FB] text-[#3ABEFF] px-6 py-2 rounded-full font-normal text-base hover:bg-[#d0eafd] transition flex items-center gap-2 border border-[#3ABEFF]">
          Share trip
        </button>
      </div>
      <div className="mb-8">
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
          <img src={piiic} alt="Search for destination" className="w-full h-full object-cover blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              to="/explore"
              className="text-white text-2xl font-semibold drop-shadow-lg hover:underline focus:underline outline-none"
              tabIndex={0}
            >
              Search for destination &rarr;
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-xl pt-6 pb-6 pr-6">
          <div className="text-[24px] font-semibold mb-6" style={{ color: '#197CAC' }}>Details</div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label className="block font-medium text-[16px] text-black mb-2">Trip name</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="Name ..."
                value={tripName}
                onChange={e => setTripName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-[16px] text-black mb-2">Destination</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none text-gray-600"
                placeholder="Destination ..."
                value={selectedDestination?.name || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block font-medium text-[16px] text-black mb-2">Type</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none text-gray-600"
                placeholder="Type ..."
                value={selectedDestination?.category || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block font-medium text-[16px] text-gray-600 mb-2">Start date</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="-- -- ----"
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-[16px] text-gray-500 mb-2">End date</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="-- -- ----"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="text-[24px] font-semibold mb-6" style={{ color: '#197CAC' }}>Destinations</div>
        <div className="flex items-center gap-4 mb-4">
          {destinations.map((dest, idx) => (
            <React.Fragment key={idx}>
              {idx < destinations.length - 1 ? (
                <span
                  className="font-poppins"
                  style={{
                    color: '#667085',
                    fontSize: 16,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  {dest}
                </span>
              ) : editingIdx === idx ? (
                <input
                  className="bg-transparent border-none outline-none font-poppins min-w-[120px] px-0 py-0"
                  style={{
                    boxShadow: 'none',
                    fontSize: 16,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#667085',
                    fontWeight: 300,
                  }}
                  autoFocus
                  value={dest}
                  onChange={e => handleDestinationChange(idx, e.target.value)}
                  onKeyDown={e => handleDestinationKeyDown(e, idx)}
                  onBlur={() => handleDestinationBlur(idx)}
                  placeholder={"Add destination.."}
                />
              ) : (
                <span
                  className="font-poppins cursor-pointer min-w-[120px]"
                  onClick={() => setEditingIdx(idx)}
                  style={{
                    color: '#667085',
                    fontSize: 16,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  {dest.trim() ? dest : "Add destination.."}
                </span>
              )}
              {idx < destinations.length - 1 && (
                idx % 2 === 0 ? <ArrowBetweenDestinations /> : <ArrowBetweenDestinationsB />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mb-12 flex">
        <div className="flex-1">
          <div className="text-[24px] font-semibold mb-6" style={{ color: '#197CAC' }}>Travel Mates</div>
          <InviteFriendInput onAdd={handleAddFriend} />
          <div className="flex flex-wrap gap-2 mt-2">
            {invitedFriends.map(friend => (
              <div key={friend} className="flex items-center bg-[#F3F3F3] rounded-full px-3 py-1 text-gray-700">
                <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 22 22">
                    <circle cx="11" cy="7" r="4" fill="#C4C4C4" />
                    <ellipse cx="11" cy="16.5" rx="7" ry="4.5" fill="#C4C4C4" />
                  </svg>
                </span>
                <span className="mr-1">{friend}</span>
                <button onClick={() => handleRemoveFriend(friend)} className="ml-1 text-gray-400 hover:text-red-500 focus:outline-none">&times;</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TripActivities
        collaborators={invitedFriends}
        days={days}
        setDays={setDays}
        expandedDays={expandedDays}
        setExpandedDays={setExpandedDays}
        showAddActivity={showAddActivity}
        setShowAddActivity={setShowAddActivity}
        newActivity={newActivity}
        setNewActivity={setNewActivity}
        editingActivity={editingActivity}
        setEditingActivity={setEditingActivity}
        editActivityData={editActivityData}
        setEditActivityData={setEditActivityData}
        addDay={addDay}
        addActivity={addActivity}
        removeActivity={removeActivity}
        removeDay={removeDay}
        startEditActivity={startEditActivity}
        cancelEditActivity={cancelEditActivity}
        saveEditActivity={saveEditActivity}
        toggleDay={toggleDay}
      />
      <div className="flex flex-col items-end mt-12">
        <button
          className={`bg-[#72D1FF] text-white px-8 py-2 rounded-full font-medium text-[20px] transition ${!isDetailsComplete ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3ABEFF]'}`}
          disabled={!isDetailsComplete}
          onClick={() => {
            if (!isDetailsComplete) {
              setShowError(true);
              setTimeout(() => setShowError(false), 2000);
              return;
            }
            // Set all trip info in context before navigating
            setTripInfo({
              tripName,
              destinations,
              travelMates: invitedFriends,
              days,
              startDate,
              endDate,
              destinationTitle: selectedDestination?.name || '',
              tripType: selectedDestination?.category || '',
              destinationImage: selectedDestination?.image || '',
              destinationDescription: selectedDestination?.description || '',
              // add more fields as needed
            });
            navigate('/trip-package', {
              state: {
                tripName,
                destinations,
                invitedFriends,
                days,
                startDate,
                endDate,
              }
            });
          }}
        >
          Build trip
        </button>
        {showError && (
          <div className="text-red-500 text-sm mt-2">Please fill in all details before continuing.</div>
        )}
      </div>
    </div>
  );
};

function InviteFriendInput({ onAdd }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  function handleBlur() {
    setEditing(false);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter" && value.trim()) {
      onAdd(value.trim());
      setValue("");
      setEditing(false);
    }
  }

  return editing ? (
    <div className="flex items-center gap-2 mb-2">
      <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
          <circle cx="11" cy="7" r="4" fill="#C4C4C4" />
          <ellipse cx="11" cy="16.5" rx="7" ry="4.5" fill="#C4C4C4" />
        </svg>
      </span>
      <input
        ref={inputRef}
        className="border border-gray-200 rounded-lg px-3 py-1 text-gray-700 bg-white focus:outline-none"
        placeholder="Type a name or email..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  ) : (
    <button
      className="flex items-center gap-2 mb-2 focus:outline-none"
      onClick={() => setEditing(true)}
    >
      <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
          <circle cx="11" cy="7" r="4" fill="#C4C4C4" />
          <ellipse cx="11" cy="16.5" rx="7" ry="4.5" fill="#C4C4C4" />
        </svg>
      </span>
      <span className="text-gray-400 font-normal">Invite new friend ...</span>
    </button>
  );
}

export default BuildTrip; 