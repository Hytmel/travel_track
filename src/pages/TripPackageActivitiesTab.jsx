import React, { useState, useEffect } from 'react';
import TripActivities from '../components/TripActivities';
import DestinationsSection from '../components/DestinationsSection';
import { useSelectedDestination } from '../components/SelectedDestinationContext';
import { ArrowBetweenDestinations, ArrowBetweenDestinationsB } from '../components/Icons';
import PackageList from '../components/PackageList';

function TripPackageActivitiesTab({
  destinationName,
  destinationCountry,
  editingIdx,
  setEditingIdx,
  handleDestinationChange,
  handleDestinationKeyDown,
  handleDestinationBlur,
  // ...other props for TripActivities if needed
}) {
  const { tripInfo, setTripInfo } = useSelectedDestination();

  // Local state for days and activities
  const [expandedDays, setExpandedDays] = useState([]);
  const [showAddActivity, setShowAddActivity] = useState({ show: false, dayId: null });
  const [newActivity, setNewActivity] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });
  const [editingActivity, setEditingActivity] = useState({ dayId: null, activityId: null });
  const [editActivityData, setEditActivityData] = useState({ name: '', time: '', type: 'attraction', location: '', notes: '' });

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





  // Add Day
  function addDay() {
    const newDayId = Date.now();
    setTripInfo(prev => {
      const nextNum = (prev.days?.length || 0) + 1;
      const newDay = {
        id: newDayId,
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
    setExpandedDays((prev) => [...prev, newDayId]);
    
    // Automatically show add activity form for the new day
    setShowAddActivity({ show: true, dayId: newDayId });
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
        destinations={tripInfo.destinations || []}
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
      <PackageList />
    </>
  );
}

export default TripPackageActivitiesTab; 