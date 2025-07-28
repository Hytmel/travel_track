import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, GoogleIcon, FacebookIcon } from '../components/Icons.jsx';
import TextInput from '../components/TextInput.jsx';
import AuthButton from '../components/AuthButton.jsx';
import { Link, useNavigate } from 'react-router-dom';

 const ForgotPassword = () => {
   const [email, setEmail] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

     const handleSubmit = (e) => {
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
     // Here you would typically send the reset email
     // For now, we'll navigate to OTP verification
     navigate('/otp-verification');
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
             />
             
             {error && <div className="text-red-500 text-sm font-poppins text-center">{error}</div>}
             
             <AuthButton 
               type="submit" 
               className="bg-[#3ABEFF] text-white hover:bg-[#2ba8e6] w-full"
             >
               Send the code
             </AuthButton>
           </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 