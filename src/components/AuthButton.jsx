import React from 'react';

const AuthButton = ({ children, onClick, type = 'button', className = '', ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full h-11 rounded-md font-medium text-lg mt-2 transition-colors font-poppins ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default AuthButton; 