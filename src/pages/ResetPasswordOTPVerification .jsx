import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthButton from '../components/AuthButton.jsx';
import { apiService } from '../api/api';

const ResetPasswordOTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isResent, setIsResent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  // Get email from navigation state
  useEffect(() => {
    const emailFromState = location.state?.email;
    
    if (emailFromState) {
      setEmail(emailFromState);
    } else {
      // If no email in state, redirect back to forgot password
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsCountingDown(false);
      setCountdown(60);
    }
  }, [countdown, isCountingDown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i] || '';
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Email is required to resend code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiService.forgotPassword(email);
      
      setIsResent(true);
      setIsCountingDown(true);
      setCountdown(60);
      // Hide resent message after 3 seconds
      setTimeout(() => setIsResent(false), 3000);
    } catch (error) {
      setError(error.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (!email) {
      setError('Email is required. Please go back and try again.');
      return;
    }
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify the reset code with your backend
      const response = await apiService.verifyResetCode({
        email: email,
        code: otpString
      });
      
      console.log('Full API response:', response);
      
      if (response.success && response.resetToken) {
        console.log('Reset code verified, token received:', response.resetToken);
        console.log('Navigating to:', `/reset-password?token=${response.resetToken}`);
        
        // Try both navigation methods
        const resetUrl = `/reset-password?token=${response.resetToken}`;
        
        // Method 1: React Router navigate
        navigate(resetUrl);
        
        // Method 2: As backup, use window.location (uncomment if navigate doesn't work)
        // window.location.href = resetUrl;
        
      } else {
        console.log('Response success:', response.success);
        console.log('Reset token:', response.resetToken);
        setError('Verification successful but no reset token received. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      
      if (error.message.includes('expired')) {
        setError('Verification code has expired. Please request a new one.');
      } else if (error.message.includes('invalid')) {
        setError('Invalid verification code. Please check and try again.');
      } else {
        setError(error.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center font-poppins" 
         style={{ backgroundImage: 'url(/src/assets/images/forgotpass.png)' }}>
      
      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 font-poppins">
          
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={handleBack}
              className="mr-4 text-[#197CAC] hover:text-[#156a99] transition-colors"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="font-poppins font-semibold text-[27px] text-[#197CAC]">
              Password Reset Code
            </h2>
          </div>
          
          {/* Instructions */}
          <p className="text-gray-400 text-[16px] mb-8 font-poppins font-normal">
            Enter the password reset code sent to {email || 'your email address'}
          </p>
          
          {/* OTP Input Fields */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="number"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-lg font-semibold border-b-2 border-gray-300 focus:border-[#3ABEFF] focus:outline-none transition-colors text-[#3ABEFF] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{ 
                    caretColor: 'transparent',
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                    appearance: 'none'
                  }}
                  disabled={loading}
                />
              ))}
            </div>
            
            {error && (
              <div className="text-red-500 text-sm font-poppins text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            
            {/* Resend Code Section */}
            <div className="space-y-2">
              {isResent && (
                <div className="text-[#3ABEFF] text-sm font-medium">
                  Reset Code Resent!
                </div>
              )}
              
              {isCountingDown ? (
                <div className="text-gray-400 text-sm">
                  Send code again in {Math.floor(countdown / 60).toString().padStart(2, '0')}:{(countdown % 60).toString().padStart(2, '0')}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  className="text-[#3ABEFF] text-sm font-medium hover:text-[#2ba8e6] transition-colors disabled:opacity-50"
                >
                  Resend reset code
                </button>
              )}
            </div>
            
            {/* Verify Button */}
            <AuthButton 
              type="submit" 
              className="bg-[#3ABEFF] text-white hover:bg-[#2ba8e6] w-full"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordOTPVerification;