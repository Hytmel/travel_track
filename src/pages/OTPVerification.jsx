import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthButton from '../components/AuthButton.jsx';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isResent, setIsResent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

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

  const handleResendCode = () => {
    setIsResent(true);
    setIsCountingDown(true);
    setCountdown(60);
    // Here you would typically resend the code
    setTimeout(() => setIsResent(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

         // Here you would typically verify the OTP
     // For now, we'll navigate to email confirmed success page
     navigate('/email-confirmed');
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
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="font-poppins font-semibold text-[27px] text-[#197CAC]">
              Code verification
            </h2>
          </div>
          
          {/* Instructions */}
          <p className="text-gray-400 text-[16px] mb-8 font-poppins font-normal">
            Enter the code sent to your email
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
                   className="w-12 h-12 text-center text-lg font-semibold border-b-2 border-gray-300 focus:border-[#3ABEFF] focus:outline-none transition-colors text-[#3ABEFF] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                   style={{ 
                     caretColor: 'transparent',
                     WebkitAppearance: 'none',
                     MozAppearance: 'textfield',
                     appearance: 'none'
                   }}
                 />
              ))}
            </div>
            
            {error && <div className="text-red-500 text-sm font-poppins text-center">{error}</div>}
            
                         {/* Resend Code Section */}
             <div className="space-y-2">
               {isResent && (
                 <div className="text-[#3ABEFF] text-sm font-medium">
                   Code Resent!
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
                   className="text-[#3ABEFF] text-sm font-medium hover:text-[#2ba8e6] transition-colors"
                 >
                   Resend code
                 </button>
               )}
             </div>
            
            {/* Confirm Button */}
            <AuthButton 
              type="submit" 
              className="bg-[#3ABEFF] text-white hover:bg-[#2ba8e6] w-full"
            >
              Confirm
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification; 