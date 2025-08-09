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
    location: user?.location || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
  });

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
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
                  <button className="absolute bottom-0 right-0 bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {user.firstName || user.name || ""} {user.lastName || ""}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                {user.location && (
                  <div className="flex items-center justify-center mt-2 text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.location}
                  </div>
                )}
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
              <div className="space-y-2">
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

              {/* Profile Tab Content */}
              {activeTab === "profile" && (
                <div>
                  {isEditing ? (
                    <form
                      className="space-y-4"
                      onSubmit={e => {
                        e.preventDefault();
                        handleSaveProfile();
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">First Name</label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            value={editForm.firstName}
                            onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Last Name</label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            value={editForm.lastName}
                            onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                          value={editForm.bio}
                          onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            value={editForm.location}
                            onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="tel"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            value={editForm.phone}
                            onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                          value={editForm.dateOfBirth}
                          onChange={e => setEditForm(f => ({ ...f, dateOfBirth: e.target.value }))}
                        />
                      </div>
                      <div className="flex space-x-4 mt-4">
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
                              location: user?.location || "",
                              phone: user?.phone || "",
                              dateOfBirth: user?.dateOfBirth || "",
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <button
                          className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">First Name</div>
                          <div className="font-semibold text-gray-900">{user.firstName || "-"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Last Name</div>
                          <div className="font-semibold text-gray-900">{user.lastName || "-"}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Bio</div>
                        <div className="font-semibold text-gray-900">{user.bio || "-"}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Location</div>
                          <div className="font-semibold text-gray-900">{user.location || "-"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-semibold text-gray-900">{user.phone || "-"}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Date of Birth</div>
                        <div className="font-semibold text-gray-900">{user.dateOfBirth || "-"}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Placeholder for other tabs */}
              {activeTab !== "profile" && (
                <p className="text-gray-600">
                  Content for {activeTab} tab will be implemented next.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default UserProfile;
