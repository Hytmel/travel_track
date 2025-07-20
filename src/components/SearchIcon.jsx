import React from 'react';

const SearchIcon = ({ className = "h-6 w-6", stroke = "#3ABEFF" }) => {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M18.25 18.25L12.7501 12.75M14.5833 8.16667C14.5833 11.7105 11.7105 14.5833 8.16667 14.5833C4.62284 14.5833 1.75 11.7105 1.75 8.16667C1.75 4.62284 4.62284 1.75 8.16667 1.75C11.7105 1.75 14.5833 4.62284 14.5833 8.16667Z" 
        stroke={stroke} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon; 