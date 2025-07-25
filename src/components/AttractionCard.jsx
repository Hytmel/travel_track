import React from 'react';
import { Link } from 'react-router-dom';

const AttractionCard = ({ attraction }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full max-w-xs transition-all group hover:shadow-xl hover:-translate-y-1">
    <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
      <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="font-semibold text-[22px] truncate whitespace-nowrap overflow-hidden" style={{ color: '#197CAC' }}>
          {attraction.name}, {attraction.country}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-poppins font-medium text-[14px] text-black">{attraction.rating}</span>
          <span className="text-yellow-500 text-[18px] font-semibold">★</span>
        </div>
      </div>
      <div className="font-medium text-[16px] mb-2" style={{ color: '#2B90C2' }}>
        Recommended duration: {attraction.duration}
      </div>
      <div className="font-normal text-[16px] text-gray-600 mb-2 line-clamp-3 overflow-hidden">{attraction.description}</div>
      <Link to="#" className="hover:underline font-normal text-[15px] mt-2 flex items-center gap-1" style={{ color: '#197CAC' }}>
        more details <span className="font-normal text-[15px]" style={{ color: '#197CAC' }}>&rarr;</span>
      </Link>
    </div>
  </div>
);

export default AttractionCard; 