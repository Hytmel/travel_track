// services/api.js
const BASE_URL = 'https://traveltrackbackend-mfpx.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Google OAuth login
  async googleLogin(idToken) {
    return this.request('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  }

  async verifyEmail(data) {
    return this.request('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resendVerificationCode(data) {
    return this.request('/api/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Fixed endpoint to match your API
  async forgotPassword(email) {
    return this.request('/api/auth/forgotpassword', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // You'll need to add this endpoint for OTP verification in forgot password flow
  async verifyResetCode(data) {
    return this.request('/api/auth/verify-reset-code', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(resetToken, password) {
    return this.request('/api/auth/resetpassword', {
      method: 'PUT', // Changed from POST to PUT
      body: JSON.stringify({ resetToken, password }),
    });
  }

  // User profile endpoints
  async getUserProfile() {
    return this.request('/api/user/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Trip endpoints (add as needed)
  async getTrips() {
    return this.request('/api/trips');
  }

  async createTrip(tripData) {
    return this.request('/api/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;