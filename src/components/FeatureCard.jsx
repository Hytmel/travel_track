import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-[7px] text-center w-[262px] h-[210px] px-[21px] py-[4px] shadow-xl border border-black/48 hover:shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out">
      <div className=" flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-[20px] font-semibold text-black mb-4 font-poppins w-[163px] h-[36px] leading-[180%] mx-auto whitespace-nowrap">{title}</h3>
      <p className="text-[16px] font-normal text-black/48 mb-4 font-poppins w-[220px] h-[58px] leading-[180%] mx-auto">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard; 