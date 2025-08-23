import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '../components/Icons.jsx';
import AuthButton from '../components/AuthButton.jsx';
import { useAuth } from '../components/AuthContext.jsx';
import { apiService } from '../api/api.js';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, login } = useAuth();

  useEffect(() => {
    // Get reset token from URL parameters
    const token = searchParams.get('token');
    console.log('=== RESET PASSWORD DEBUG ===');
    console.log('Token from URL params:', token);
    console.log('Full URL:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('All search params:', Object.fromEntries(searchParams));
    console.log('===============================');
    
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    setResetToken(token);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!resetToken) {
      setError('Invalid reset token. Please request a new password reset.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Call the backend API to reset password
      const response = await apiService.resetPassword(resetToken, password);
      
      console.log('Password reset successful:', response);
      
      // If backend returns a token and user data, auto-login the user
      if (response.token && response.data?.user) {
        login(response.data.user, response.token);
      }
      
      // Navigate to password changed success page
      navigate('/password-changed-success');
      
    } catch (error) {
      console.error('Password reset failed:', error);
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/email-confirmed');
  };

  // Show error if no reset token
  if (!resetToken && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center font-poppins" 
           style={{ backgroundImage: 'url(/src/assets/images/forgotpass.png)' }}>
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 font-poppins">
            <div className="text-center">
              <h2 className="font-poppins font-semibold text-[27px] text-[#197CAC] mb-4">
                Loading...
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center font-poppins" 
         style={{ backgroundImage: 'url(/src/assets/images/forgotpass.png)' }}>
      
      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 font-poppins">
          
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={handleBack}
              className="mr-4 text-[#197CAC] hover:text-[#156a99] transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="font-poppins font-semibold text-[27px] text-[#197CAC]">
              Reset Password
            </h2>
          </div>
          
          {/* Instructions */}
          <p className="text-gray-400 text-[16px] mb-8 font-poppins font-normal">
            Please enter a new password. Your new password must be different from previous one.
          </p>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#3ABEFF] focus:outline-none transition-colors text-lg font-poppins placeholder:font-poppins disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#3ABEFF] focus:outline-none transition-colors text-lg font-poppins placeholder:font-poppins disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm font-poppins text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            
            {/* Confirm Button */}
            <AuthButton 
              type="submit"
              disabled={isLoading || !resetToken}
              className="bg-[#3ABEFF] text-white hover:bg-[#2ba8e6] w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting...' : 'Confirm'}
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;