import React, { useState } from 'react';
import { Plus, MapPin, Clock, GripVertical } from 'lucide-react';
import { DeleteIcon, EditIcon, DateIcon, ChevronUpIcon, ChevronDownIcon } from './Icons';
import { useAuth } from '../components/AuthContext';
import CommentSection from './CommentSection';

const activityTypes = [
  { id: 'attraction', name: 'Attraction', color: 'bg-blue-100 text-blue-800' },
  { id: 'restaurant', name: 'Restaurant', color: 'bg-green-100 text-green-800' },
  { id: 'hotel', name: 'Hotel', color: 'bg-purple-100 text-purple-800' },
  { id: 'transport', name: 'Transport', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'shopping', name: 'Shopping', color: 'bg-pink-100 text-pink-800' },
  { id: 'entertainment', name: 'Entertainment', color: 'bg-orange-100 text-orange-800' },
];

function TripActivities({
  collaborators = [],
  days,
  setDays,
  expandedDays,
  setExpandedDays,
  showAddActivity,
  setShowAddActivity,
  newActivity,
  setNewActivity,
  editingActivity,
  setEditingActivity,
  editActivityData,
  setEditActivityData,
  addDay,
  addActivity,
  removeActivity,
  removeDay,
  startEditActivity,
  cancelEditActivity,
  saveEditActivity,
  toggleDay,
  setTripInfo,
  tripInfo,
}) {
  const { user } = useAuth();
  const [openCommentsDayId, setOpenCommentsDayId] = useState(null);
  const [sending, setSending] = useState(false);

  const getActivityTypeStyle = (type) => {
    const activityType = activityTypes.find(t => t.id === type);
    return activityType ? activityType.color : 'bg-gray-100 text-gray-800';
  };

  // Color palette for days (cycle through these)
  const dayColors = [
    { border: '#197CAC', label: '#197CAC' }, // blue
    { border: '#FFD600', label: '#FFD600' }, // yellow
    { border: '#7B61FF', label: '#7B61FF' }, // purple
    { border: '#3ABEFF', label: '#3ABEFF' }, // cyan
    { border: '#FF7A00', label: '#FF7A00' }, // orange
    { border: '#00C48C', label: '#00C48C' }, // green
  ];

  function handleAddComment(dayId, commentText, resetInput) {
    if (!commentText.trim()) return;
    setSending(true);
    if (setTripInfo) {
      setTripInfo(prev => ({
        ...prev,
        days: (prev.days || []).map(day =>
          day.id === dayId
            ? {
                ...day,
                comments: [
                  ...(day.comments || []),
                  {
                    id: Date.now(),
                    user: { name: user?.name || 'Anonymous', avatar: user?.avatar },
                    message: commentText,
                  },
                ],
              }
            : day
        ),
      }));
    } else if (setDays) {
      const updatedDays = days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            comments: [
              ...(day.comments || []),
              {
                id: Date.now(),
                user: { name: user?.name || 'Anonymous', avatar: user?.avatar },
                message: commentText,
              },
            ],
          };
        }
        return day;
      });
      setDays(updatedDays);
    }
    if (resetInput) resetInput('');
    setSending(false);
  }

  function handleDeleteComment(dayId, commentId) {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          comments: (day.comments || []).filter(c => c.id !== commentId),
        };
      }
      return day;
    });
    if (setTripInfo && tripInfo) {
      setTripInfo({ ...tripInfo, days: updatedDays });
    } else if (setDays) {
      setDays(updatedDays);
    }
  }

  // Helper function to convert hex to rgba
  function hexToRgba(hex, alpha) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    return `rgba(${+r},${+g},${+b},${alpha})`;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[24px] font-semibold mb-6 font-poppins" style={{ color: '#197CAC' }}>Trip Activities</div>
        <button
          className="flex items-center gap-2 border border-[#197CAC] text-[#197CAC] px-4 py-1 rounded-full font-normal text-sm bg-white hover:bg-[#f3f8fc] transition"
          onClick={addDay}
        >
          <Plus className="w-4 h-4" />
          Add New Day
        </button>
      </div>
      {days.length === 0 && (
        <div
          className="flex items-center bg-[#F6F8FB] rounded-lg p-4 mt-2"
          style={{ borderLeft: '6px solid #7B61FF', minHeight: 56 }}
        >
          <span className="text-[#7B61FF] font-poppins font-semibold text-[20px]">You do not have activities yet !</span>
        </div>
      )}
      <div className="space-y-6 mt-4">
        {days.map((day) => {
          console.log('TripActivities render: day', day);
          // Extract the day number from the label (e.g., 'Day 3' -> 3)
          const match = day.label && day.label.match(/Day (\d+)/);
          const dayNum = match ? parseInt(match[1], 10) : 1;
          const color = dayColors[(dayNum - 1) % dayColors.length];
          const expanded = expandedDays.includes(day.id);
          const isCommentsOpen = openCommentsDayId === day.id;
          return (
            <div
              key={day.id}
              className="rounded-2xl bg-white shadow overflow-hidden flex flex-col"
              style={{ borderLeft: `6px solid ${color.border}` }}
            >
              {/* Day Header */}
              {!isCommentsOpen && (
                <div
                  className={`flex items-center justify-between px-6 py-3 cursor-pointer ${!expanded ? 'bg-[#F2F2F2]' : ''}`}
                  onClick={() => toggleDay(day.id)}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className="font-semibold font-poppins text-base"
                      style={{ color: color.label }}
                    >
                      {day.label}
                    </span>
                    <span className="text-gray-400 text-base flex items-center">
                      <DateIcon className="h-4 w-4 mr-1" />
                      <span className="font-normal text-gray-500 text-base">21 jan 2025</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {expanded ? (
                      <ChevronUpIcon color={color.label} className="h-6 w-6" />
                    ) : (
                      <ChevronDownIcon color={color.label} className="h-6 w-6" />
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); setShowAddActivity({ show: true, dayId: day.id }); }}
                      className="px-3 py-1 bg-transparent hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors border border-gray-200"
                    >
                      Add Activity
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); removeDay(day.id); }}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <DeleteIcon className="h-5 w-5" />
                    </button>
                    {/* Add Comment Button */}
                    <button
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Add comment"
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={e => { e.stopPropagation(); setOpenCommentsDayId(day.id); }}
                    >
                      <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 1.25C12.7802 1.25 16.25 4.71979 16.25 9C16.25 13.2802 12.7802 16.75 8.5 16.75H0.75V9C0.75 4.71979 4.21979 1.25 8.5 1.25Z" stroke={color.label} strokeWidth="1.5"/>
                        <path d="M8.5 6V12M5.5 9H11.5" stroke={color.label} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {/* Comments Panel */}
              {isCommentsOpen && (
                <CommentSection
                  comments={day.comments || []}
                  user={user}
                  color={color}
                  dayId={day.id}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                  onClose={() => setOpenCommentsDayId(null)}
                  sending={sending}
                />
              )}
              {/* Activities (only show if expanded) */}
              {!isCommentsOpen && expanded && (
                <div className="p-6">
                  {day.activities.length === 0 ? (
                    showAddActivity.show && showAddActivity.dayId === day.id ? null : null
                  ) : (
                    <div className="space-y-4">
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex-shrink-0 pt-1">
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            {editingActivity.dayId === day.id && editingActivity.activityId === activity.id ? (
                              <>
                                {/* Edit Form */}
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                                      {activity.user && activity.user.name ? activity.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
                                    </span>
                                    <span className="text-gray-700 text-sm font-semibold">{activity.user && activity.user.name}</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityTypeStyle(editActivityData.type)}`}>{activityTypes.find(t => t.id === editActivityData.type)?.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={saveEditActivity}
                                      className="px-3 py-1 bg-[#197CAC] text-white rounded-lg text-xs font-medium hover:bg-[#145a8a]"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={cancelEditActivity}
                                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-1 mb-2">
                                  <input
                                    type="text"
                                    value={editActivityData.name}
                                    onChange={e => setEditActivityData({ ...editActivityData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-gray-900 text-base"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                                    <input
                                      type="time"
                                      value={editActivityData.time}
                                      onChange={e => setEditActivityData({ ...editActivityData, time: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                                    <select
                                      value={editActivityData.type}
                                      onChange={e => setEditActivityData({ ...editActivityData, type: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    >
                                      {activityTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                                    <input
                                      type="text"
                                      value={editActivityData.location}
                                      onChange={e => setEditActivityData({ ...editActivityData, location: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                                    <textarea
                                      value={editActivityData.notes}
                                      onChange={e => setEditActivityData({ ...editActivityData, notes: e.target.value })}
                                      rows={2}
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {/* Top row: Avatar, User Name, Type Badge, Edit/Delete */}
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                                      {activity.user && activity.user.name ? activity.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
                                    </span>
                                    <span className="text-gray-700 text-sm font-semibold">{activity.user && activity.user.name}</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityTypeStyle(activity.type)}`}>{activityTypes.find(t => t.id === activity.type)?.name}</span>
                                  </div>
                                  {/* Edit and Delete icons for the activity */}
                                  <div className="flex items-center space-x-1">
                                    <button
                                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                      onClick={() => startEditActivity(day.id, activity)}
                                    >
                                      <EditIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                      onClick={() => removeActivity(day.id, activity.id)}
                                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                      <DeleteIcon className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>
                                {/* Activity Name */}
                                <div className="mt-1 mb-2">
                                  <h4 className="font-medium text-gray-900 text-base">{activity.name}</h4>
                                </div>
                                {/* Time and Location */}
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
                                {/* Notes/Description */}
                                {activity.notes && (
                                  <p className="text-sm text-gray-600">{activity.notes}</p>
                                )}
                              </>
                            )}
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
                          className="px-4 py-2 text-white font-medium rounded-lg transition-colors"
                          style={{ backgroundColor: color.border }}
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TripActivities; 