import React, { useState } from 'react';
import DestinationsSection from '../components/DestinationsSection';
import WeatherCard from '../components/WeatherCard';
import { useSelectedDestination } from '../components/SelectedDestinationContext';
import { ArrowBetweenDestinations, ArrowBetweenDestinationsB } from '../components/Icons';

function TripPackageItineraryTab({
  editingIdx,
  setEditingIdx,
  handleDestinationChange,
  handleDestinationKeyDown,
  handleDestinationBlur,
  weather
}) {
  const { tripInfo } = useSelectedDestination();

  return (
   <>
    {/* Destinations Section */}
    <DestinationsSection
      destinations={tripInfo.destinations || []}
      editingIdx={editingIdx}
      setEditingIdx={setEditingIdx}
      handleDestinationChange={handleDestinationChange}
      handleDestinationKeyDown={handleDestinationKeyDown}
      handleDestinationBlur={handleDestinationBlur}
      ArrowBetweenDestinations={ArrowBetweenDestinations}
      ArrowBetweenDestinationsB={ArrowBetweenDestinationsB}
    />
    
    {/* Weather Section */}
    <div className="mb-8 font-poppins">
      <div className="text-[20px] font-semibold mb-4 font-poppins" style={{ color: '#197CAC' }}>Destination's weather</div>
      <div className="flex flex-nowrap gap-4 font-poppins overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {weather.map((w, idx) => (
          <WeatherCard
            key={idx}
            date={w.date}
            icon={w.icon}
            temp={w.temp}
            high={w.high}
            low={w.low}
            wind={w.wind}
            destinationName={tripInfo.destinationTitle || tripInfo.destinations?.[0] || 'Lake Como, Italy'}
            destinationCountry={tripInfo.destinationCountry || ''}
          />
        ))}
      </div>
      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
   </>
  );
}

export default TripPackageItineraryTab; 