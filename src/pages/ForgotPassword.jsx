import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, GoogleIcon, FacebookIcon } from '../components/Icons.jsx';
import TextInput from '../components/TextInput.jsx';
import AuthButton from '../components/AuthButton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../api/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const response = await apiService.forgotPassword(email);
      
      if (response.success) {
        // Navigate to the dedicated reset password OTP verification page
        navigate('/reset-password-otp', {
          state: {
            email: email
          }
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center font-poppins"
         style={{ backgroundImage: 'url(/src/assets/images/forgotpass.png)' }}>
      
      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 font-poppins">
          
          <h2 className="font-poppins font-semibold text-[27px] text-[#197CAC] mb-4 text-center">
            Reset Your Password
          </h2>
          
          <p className="text-gray-400 text-[16px] mb-8 font-poppins font-normal">
            Please enter your email address. We will send you a code to reset your password.
          </p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextInput
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
            
            {error && (
              <div className="text-red-500 text-sm font-poppins text-center">
                {error}
              </div>
            )}
            
            <AuthButton 
              type="submit" 
              className="bg-[#3ABEFF] text-white hover:bg-[#2ba8e6] w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send the code'}
            </AuthButton>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={handleBackToLogin}
              className="text-[#3ABEFF] text-sm font-medium hover:text-[#2ba8e6] transition-colors"
              disabled={loading}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;