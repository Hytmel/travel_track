import React, { useState, useEffect } from 'react';
import TripActivities from '../components/TripActivities';
import DestinationsSection from '../components/DestinationsSection';
import { useSelectedDestination } from '../components/SelectedDestinationContext';
import { ArrowBetweenDestinations, ArrowBetweenDestinationsB } from '../components/Icons';

function TripPackageActivitiesTab({
  destinationName,
  destinationCountry,
  // ...other props for TripActivities if needed
}) {
  const { tripInfo, setTripInfo } = useSelectedDestination();

  // Local state for destinations and days, initialized from context
  const [destinationsState, setDestinationsState] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  // Remove local days state, use tripInfo.days
  const [expandedDays, setExpandedDays] = useState([]);
  const [showAddActivity, setShowAddActivity] = useState({ show: false, dayId: null });
  const [newActivity, setNewActivity] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  const [editingActivity, setEditingActivity] = useState({ dayId: null, activityId: null });
  const [editActivityData, setEditActivityData] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });

  // Initialize local state from context on mount
  useEffect(() => {
    setDestinationsState(tripInfo.destinations || []);
  }, [tripInfo]);

  // Patch: Ensure every day has a comments array (run only when tripInfo.days changes)
  useEffect(() => {
    if (tripInfo.days && tripInfo.days.some(day => !Array.isArray(day.comments))) {
      setTripInfo({
        ...tripInfo,
        days: tripInfo.days.map(day => ({
          ...day,
          comments: Array.isArray(day.comments) ? day.comments : [],
        })),
      });
    }
  }, [tripInfo.days]);

  // Destinations handlers
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

  // Build trip button handler
  function handleBuildTrip() {
    setTripInfo({
      ...tripInfo,
      destinations: destinationsState,
      days: tripInfo.days, // Keep tripInfo.days as the source of truth
      // add other fields as needed
    });
  }

  // Add Day
  function addDay() {
    setTripInfo(prev => {
      const nextNum = (prev.days?.length || 0) + 1;
      const newDay = {
        id: Date.now(),
        label: `Day ${nextNum}`,
        date: '',
        activities: [],
        comments: [],
      };
      return {
        ...prev,
        days: [...(prev.days || []), newDay],
      };
    });
    setExpandedDays((prev) => [...prev, Date.now()]); // Use Date.now() to match newDay.id
  }
  // Add Activity
  function addActivity(dayId) {
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
  }
  // Remove Activity
  function removeActivity(dayId, activityId) {
    const updatedDays = (tripInfo.days || []).map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter(activity => activity.id !== activityId),
        };
      }
      return day;
    });
    setTripInfo({ ...tripInfo, days: updatedDays });
  }
  // Remove Day
  function removeDay(dayId) {
    setTripInfo({
      ...tripInfo,
      days: (tripInfo.days || []).filter(day => day.id !== dayId),
    });
    setExpandedDays(prev => prev.filter(id => id !== dayId));
  }
  // Edit Activity
  function startEditActivity(dayId, activity) {
    setEditingActivity({ dayId, activityId: activity.id });
    setEditActivityData({
      name: activity.name,
      time: activity.time,
      type: activity.type,
      location: activity.location,
      notes: activity.notes || '',
    });
  }
  function cancelEditActivity() {
    setEditingActivity({ dayId: null, activityId: null });
    setEditActivityData({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  }
  function saveEditActivity() {
    const updatedDays = (tripInfo.days || []).map(day => {
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
    });
    setTripInfo({ ...tripInfo, days: updatedDays });
    cancelEditActivity();
  }
  function toggleDay(dayId) {
    setExpandedDays((prev) =>
      prev.includes(dayId) ? prev.filter((id) => id !== dayId) : [...prev, dayId]
    );
  }

  console.log('TripPackageActivitiesTab: tripInfo.days', tripInfo.days);

  return (
    <>
      <DestinationsSection
        destinations={destinationsState}
        editingIdx={editingIdx}
        setEditingIdx={setEditingIdx}
        handleDestinationChange={handleDestinationChange}
        handleDestinationKeyDown={handleDestinationKeyDown}
        handleDestinationBlur={handleDestinationBlur}
        ArrowBetweenDestinations={ArrowBetweenDestinations}
        ArrowBetweenDestinationsB={ArrowBetweenDestinationsB}
      />
      {/* TripActivities section below DestinationsSection */}
      <TripActivities
        days={tripInfo.days || []}
        setTripInfo={setTripInfo}
        tripInfo={tripInfo}
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
      <div className="flex justify-end mt-8 font-poppins">
        <button className="bg-[#72D1FF] text-white px-8 py-2 rounded-full font-medium text-[20px] hover:bg-[#3ABEFF] transition font-poppins" onClick={handleBuildTrip}>
          Build trip
        </button>
      </div>
    </>
  );
}

export default TripPackageActivitiesTab; 