import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Camera,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Globe,
  Heart,
  Users,
  Settings,
  Bell,
  Star,
  LogOut,
} from "lucide-react";
import { useAuth } from "../components/AuthContext.jsx";
import Footer from "../components/Footer.jsx";

const UserProfile = () => {
  const {
    user,
    updateProfile,
    updatePreferences,
    updateNotificationSettings,
    logout,
  } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState("profile");
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      // Convert to base64 and update immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;
        // Update user context immediately
        updateProfile({ avatar: newAvatar });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-poppins">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
          <Link
            to="/login"
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card (Dashboard) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user.avatar}
                    alt={`${user.firstName || user.name || ""} ${
                      user.lastName || ""
                    }`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 cursor-pointer transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex flex-row items-center gap-2 justify-center mt-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.firstName || user.name || "-"}
                  </h2>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.lastName || ""}
                  </h2>
                </div>
                {user.bio && (
                  <p className="text-gray-600 text-center mt-2">{user.bio}</p>
                )}
                <p className="text-gray-500 flex items-center gap-2 justify-center mt-2">
                  <Mail className="h-4 w-4" /> {user.email}
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-600">
                    {user.stats?.totalTrips ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Trips</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {user.stats?.completedTrips ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {user.stats?.totalDays ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="space-y-2 mb-6">
                {[
                  {
                    id: "profile",
                    label: "Profile",
                    icon: <Edit className="h-4 w-4" />,
                  },
                  {
                    id: "preferences",
                    label: "Preferences",
                    icon: <Settings className="h-4 w-4" />,
                  },
                  {
                    id: "notifications",
                    label: "Notifications",
                    icon: <Bell className="h-4 w-4" />,
                  },
                  {
                    id: "stats",
                    label: "Travel Stats",
                    icon: <Globe className="h-4 w-4" />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Logout Button at Bottom */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-200 hover:border-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {activeTab === "profile" && "Profile Information"}
                {activeTab === "preferences" && "Travel Preferences"}
                {activeTab === "notifications" && "Notification Settings"}
                {activeTab === "stats" && "Travel Statistics"}
              </h3>
              
              {activeTab === "profile" && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gradient-to-r from-sky-100 to-sky-50 rounded-2xl shadow p-6 mb-8 flex flex-col items-center relative">
                    <div className="absolute top-4 right-4">
                      {!isEditing && (
                        <button
                          className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                      )}
                    </div>
                    <div className="relative inline-block mb-4">
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <label htmlFor="avatar-upload-header" className="absolute bottom-0 right-0 bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 cursor-pointer transition-colors">
                        <Camera className="h-4 w-4" />
                        <input
                          id="avatar-upload-header"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="flex flex-row items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {user.firstName || user.name || "-"}
                      </h2>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {user.lastName || ""}
                      </h2>
                    </div>
                    {user.bio && (
                      <p className="text-gray-600 text-center mb-2">
                        {user.bio}
                      </p>
                    )}
                    <p className="text-gray-500 flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {user.email}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow p-6">
                    {isEditing ? (
                      <form
                        className="space-y-6"
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateProfile(editForm);
                          setIsEditing(false);
                        }}
                      >
                        <div className="flex flex-row gap-6">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Edit className="h-4 w-4" />
                              First Name
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0 focus:outline-none px-3 py-2"
                              value={editForm.firstName}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  firstName: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Edit className="h-4 w-4" />
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0 focus:outline-none px-3 py-2"
                              value={editForm.lastName}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  lastName: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                            <Edit className="h-4 w-4" />
                            Bio
                          </label>
                          <textarea
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0 focus:outline-none px-3 py-2"
                            value={editForm.bio}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                bio: e.target.value,
                              }))
                            }
                            rows={3}
                          />
                        </div>
                        <div className="flex flex-row gap-6">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Calendar className="h-4 w-4" />
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0 focus:outline-none px-3 py-2"
                              value={editForm.dateOfBirth}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  dateOfBirth: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Edit className="h-4 w-4" />
                              Gender
                            </label>
                            <select
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0 focus:outline-none px-3 py-2"
                              value={editForm.gender}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  gender: e.target.value,
                                }))
                              }
                            >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-6">
                          <button
                            type="submit"
                            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 font-medium"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 font-medium"
                            onClick={() => {
                              setIsEditing(false);
                              setEditForm({
                                firstName: user?.firstName || "",
                                lastName: user?.lastName || "",
                                bio: user?.bio || "",
                                dateOfBirth: user?.dateOfBirth || "",
                                gender: user?.gender || "",
                              });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex flex-row gap-6">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Edit className="h-4 w-4" />
                              First Name
                            </label>
                            <div className="text-gray-900 text-base font-normal">
                              {user.firstName || "-"}
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Edit className="h-4 w-4" />
                              Last Name
                            </label>
                            <div className="text-gray-900 text-base font-normal">
                              {user.lastName || "-"}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                            <Edit className="h-4 w-4" />
                            Bio
                          </label>
                          <div className="text-gray-900 text-base font-normal min-h-[24px]">
                            {user.bio || "-"}
                          </div>
                        </div>
                        
                        <div className="flex flex-row gap-6">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Calendar className="h-4 w-4" />
                              Date of Birth
                            </label>
                            <div className="text-gray-900 text-base font-normal">
                              {user.dateOfBirth || "-"}
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                              <Edit className="h-4 w-4" />
                              Gender
                            </label>
                            <div className="text-gray-900 text-base font-normal">
                              {user.gender || "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Placeholder for other tabs */}
              {activeTab !== "profile" && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings
                  </p>
                  <p className="text-gray-500">
                    Content for {activeTab} tab will be implemented next.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;