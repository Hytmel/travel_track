import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../components/AuthButton.jsx';
import { SuccessIllustrationIcon } from '../components/Icons.jsx';

const EmailConfirmed = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Navigate to reset password page after email confirmation
    navigate('/reset-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center font-poppins" 
         style={{ backgroundImage: 'url(/src/assets/images/forgotpass.png)' }}>
      
      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
                 <div className="bg-white rounded-2xl shadow-2xl p-6 font-poppins">
          
          {/* Success Illustration */}
          <div className="flex justify-center mb-6">
            <SuccessIllustrationIcon />
          </div>
          
          {/* Success Message */}
          <div className="text-center mb-8">
            <h2 className="font-poppins font-semibold text-[27px] text-[#197CAC] mb-4">
              You successfully confirmed your email
            </h2>
          </div>
          
          {/* Confirm Button */}
          <AuthButton 
            onClick={handleConfirm}
            className="bg-[#3ABEFF] text-white hover:bg-[#2ba8e6] w-full"
          >
            Confirm
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed; 