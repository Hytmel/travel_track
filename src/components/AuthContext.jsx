import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on app startup
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token and get user data
          const userData = await apiService.getUserProfile();
          login(userData.data.user, token);
        }
      } catch (error) {
        // Token is invalid, remove it
        localStorage.removeItem('authToken');
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userInfo, token = null) => {
    // Store token if provided
    if (token) {
      localStorage.setItem('authToken', token);
    }

    // Ensure we have a complete user object with all expected fields
    const completeUser = {
      // Basic info from backend
      id: userInfo.id || '',
      firstName: userInfo.firstName || '',
      lastName: userInfo.lastName || '',
      email: userInfo.email || '',
      isEmailVerified: userInfo.isEmailVerified || false,
      role: userInfo.role || 'user',
      
      // Computed name
      name: `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim(),
      
      // Handle avatar from backend (can be object or string)
      avatar: userInfo.avatar?.url || userInfo.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      
      // Extended profile info (with defaults)
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
      
      // Backend preferences structure
      preferences: {
        // Map backend structure to your existing structure
        budget: userInfo.preferences?.budget || 'moderate',
        travelStyle: userInfo.preferences?.travelStyle || 'balanced',
        accommodationType: userInfo.preferences?.accommodationType || 'hotel',
        currency: userInfo.preferences?.currency || 'USD',
        language: userInfo.preferences?.language || 'en',
        timezone: userInfo.preferences?.timezone || 'UTC',
        ...userInfo.preferences
      },
      
      // Handle notification settings from backend
      notifications: {
        emailNotifications: userInfo.preferences?.notifications?.email ?? true,
        pushNotifications: userInfo.preferences?.notifications?.push ?? true,
        tripReminders: userInfo.notifications?.tripReminders ?? true,
        ...userInfo.notifications
      }
    };
    
    setUser(completeUser);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      console.log(response);
      
      if (response.success) {
        // Don't automatically log in, user needs to verify email first
        return {
          success: true,
          message: response.message,
          user: response.data.user
        };
      }
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  // Login function
  const loginUser = async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      console.log(response);
      
      if (response.success && response.token) {
        login(response.data.user, response.token);
        return {
          success: true,
          message: response.message,
          user: response.data.user,
          token: response.token
        };
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  // Google OAuth login function
  const loginWithGoogle = async (idToken) => {
    try {
      const response = await apiService.googleLogin(idToken);
      if (response.success && response.token) {
        login(response.data.user, response.token);
        return {
          success: true,
          message: response.message,
          user: response.data.user,
          token: response.token
        };
      }
      throw new Error(response.message || 'Google login failed');
    } catch (error) {
      throw new Error(error.message || 'Google login failed');
    }
  };

  // Add updateProfile function
  const updateProfile = async (profileData) => {
    if (!user) return;

    try {
      const response = await apiService.updateUserProfile(profileData);
      console.log(response);
      
      if (response.success) {
        const updatedUser = {
          ...user,
          ...profileData,
          // Update name if firstName/lastName changed
          name: `${profileData.firstName || user.firstName} ${profileData.lastName || user.lastName}`.trim()
        };
        setUser(updatedUser);
        return response;
      }
    } catch (error) {
      throw new Error(error.message || 'Profile update failed');
    }
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
      loading,
      login,
      loginUser,
      loginWithGoogle,
      register,
      logout,
      updateProfile,
      updatePreferences,
      updateNotificationSettings
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};