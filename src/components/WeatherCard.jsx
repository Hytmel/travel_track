import React from 'react';

function WeatherCard({ date, icon, temp, high, low, wind, destinationName, destinationCountry }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[253px] max-w-[253px] flex flex-row justify-between items-stretch" style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.07)' }}>
      {/* Left column */}
      <div className="flex flex-col justify-between items-start flex-1">
        <div>
          <div className="font-poppins font-light text-[12px] mb-4" style={{ color: 'rgba(0,0,0,0.29)' }}>{date}</div>
          <div className="font-poppins font-normal text-[20px] mb-8" style={{ color: '#197CAC' }}>{temp}°</div>
        </div>
        <div className="font-poppins font-normal text-[14px]" style={{ color: '#197CAC' }}>
          {destinationName}{destinationCountry ? `, ${destinationCountry}` : ''}
        </div>
      </div>
      {/* Right column */}
      <div className="flex flex-col justify-between items-end text-right ml-4">
        <div className="w-20 h-20 flex items-center justify-center mb-2">
          <span className="text-6xl">{icon}</span>
        </div>
        <div className="font-poppins font-normal text-[12px] mb-2" style={{ color: '#91D8FB' }}>
          <span className="mr-3">H:{high}°</span>
          <span>L:{low}°</span>
        </div>
        <div className="font-poppins font-normal text-[14px]" style={{ color: '#197CAC' }}>{wind}</div>
      </div>
    </div>
  );
}

export default WeatherCard; 