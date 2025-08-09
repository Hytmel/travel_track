import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize with more complete user structure
  const [user, setUser] = useState(null);

  const login = (userInfo) => {
    // Ensure we have a complete user object with all expected fields
    const completeUser = {
      // Basic info (from login/signup)
      name: userInfo.name || '',
      email: userInfo.email || '',
      avatar: userInfo.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      
      // Extended profile info (with defaults)
      firstName: userInfo.firstName || userInfo.name?.split(' ')[0] || '',
      lastName: userInfo.lastName || userInfo.name?.split(' ').slice(1).join(' ') || '',
      bio: userInfo.bio || '',
      dateOfBirth: userInfo.dateOfBirth || '',
      gender: userInfo.gender || '',
      
      // User stats (with defaults)
      stats: {
        totalTrips: userInfo.stats?.totalTrips || 0,
        completedTrips: userInfo.stats?.completedTrips || 0,
        totalDays: userInfo.stats?.totalDays || 0,
        ...userInfo.stats
      },
      
      // Preferences (with defaults)
      preferences: {
        budget: userInfo.preferences?.budget || 'moderate',
        travelStyle: userInfo.preferences?.travelStyle || 'balanced',
        accommodationType: userInfo.preferences?.accommodationType || 'hotel',
        ...userInfo.preferences
      },
      
      // Notification settings (with defaults)
      notifications: {
        emailNotifications: userInfo.notifications?.emailNotifications ?? true,
        pushNotifications: userInfo.notifications?.pushNotifications ?? true,
        tripReminders: userInfo.notifications?.tripReminders ?? true,
        ...userInfo.notifications
      }
    };
    
    setUser(completeUser);
  };

  const logout = () => setUser(null);

  // Add updateProfile function
  const updateProfile = (profileData) => {
    if (!user) return;
    
    setUser(prevUser => ({
      ...prevUser,
      ...profileData,
      // Update name if firstName/lastName changed
      name: `${profileData.firstName || prevUser.firstName} ${profileData.lastName || prevUser.lastName}`.trim()
    }));
  };

  // Add updatePreferences function
  const updatePreferences = (preferences) => {
    if (!user) return;
    
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        ...preferences
      }
    }));
  };

  // Add updateNotificationSettings function
  const updateNotificationSettings = (notifications) => {
    if (!user) return;
    
    setUser(prevUser => ({
      ...prevUser,
      notifications: {
        ...prevUser.notifications,
        ...notifications
      }
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateProfile, 
      updatePreferences, 
      updateNotificationSettings 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);