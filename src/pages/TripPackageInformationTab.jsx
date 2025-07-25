import React from 'react';
import DestinationsSection from '../components/DestinationsSection';
import TravelMatesSection from '../components/TravelMatesSection';
import WeatherCard from '../components/WeatherCard';
import { ArrowBetweenDestinations, ArrowBetweenDestinationsB } from '../components/Icons';
import { useSelectedDestination } from '../components/SelectedDestinationContext';

function TripPackageInformationTab({
  destinationImage,
  destinationName,
  destinationCountry,
  startDate,
  endDate,
  tripName,
  tripType,
  destinationDescription,
  descExpanded,
  setDescExpanded,
  days,
  editingIdx,
  setEditingIdx,
  destinationsState,
  handleDestinationChange,
  handleDestinationKeyDown,
  handleDestinationBlur,
  user,
  weather
}) {
  const { tripInfo, setTripInfo } = useSelectedDestination();



  // Travel mates handlers (update context directly)
  function handleAddFriend(friend) {
    if (friend && !tripInfo.travelMates?.includes(friend)) {
      setTripInfo(prev => ({
        ...prev,
        travelMates: [...(prev.travelMates || []), friend],
      }));
    }
  }
  function handleRemoveFriend(friend) {
    setTripInfo(prev => ({
      ...prev,
      travelMates: (prev.travelMates || []).filter(f => f !== friend),
    }));
  }

  return (
    <>
      {/* Top: Image + Destination Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 font-poppins">
        <img src={destinationImage} alt={destinationName} className="w-full md:w-96 h-64 object-cover rounded-xl" />
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-xl font-semibold" style={{ color: '#197CAC' }}>{destinationName}{destinationCountry ? `, ${destinationCountry}` : ''}</div>
          <div className="text-sm" style={{ color: '#197CAC' }}>
            {startDate && endDate ? `${startDate} - ${endDate}` : ''}
          </div>
          <div className="text-sm" style={{ color: '#197CAC' }}>
            {(() => {
              const totalActivities = days.reduce((sum, day) => sum + (day.activities?.length || 0), 0);
              return `${totalActivities} activit${totalActivities === 1 ? 'y' : 'ies'}`;
            })()}
          </div>
          <div className={`text-gray-600 mb-2 ${descExpanded ? '' : 'line-clamp-3'}`} style={{overflow: 'hidden'}}>
            {destinationDescription}
          </div>
          <button
            className="hover:underline text-sm w-fit text-left"
            style={{ color: '#197CAC' }}
            onClick={() => setDescExpanded(e => !e)}
          >
            {descExpanded ? 'View less' : 'View more '} {descExpanded ? '' : <span>&rarr;</span>}
          </button>
        </div>
      </div>
      {/* Details Section */}
      <div className="mb-8 font-poppins">
        <div className="text-[20px] font-semibold mb-4 font-poppins" style={{ color: '#197CAC' }}>Details</div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 font-poppins">
          <div>
            <label className="block font-medium text-[16px] text-gray-500 mb-2">Trip name</label>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none text-gray-600" value={tripName} readOnly />
          </div>
          <div>
            <label className="block font-medium text-[16px] text-gray-500 mb-2">Destination</label>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none text-gray-600" value={destinationName} readOnly />
          </div>
          <div>
            <label className="block font-medium text-[16px] text-gray-500 mb-2">Type</label>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none text-gray-600" value={tripType} readOnly />
          </div>
          <div>
            <label className="block font-medium text-[16px] text-gray-600 mb-2">Start date</label>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none text-gray-600" value={startDate} readOnly />
          </div>
          <div>
            <label className="block font-medium text-[16px] text-gray-500 mb-2">End date</label>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#F3F3F3] focus:border-transparent focus:ring-0 focus:outline-none text-gray-600" value={endDate} readOnly />
          </div>
        </div>
      </div>
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
      {/* Travel Mates Section */}
      <TravelMatesSection
        invitedFriends={tripInfo.travelMates && tripInfo.travelMates.length > 0 ? tripInfo.travelMates : (user && user.name ? [user.name] : [])}
        handleAddFriend={handleAddFriend}
        handleRemoveFriend={handleRemoveFriend}
      />
      {/* Destination's Weather Section */}
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
              destinationName={destinationName}
              destinationCountry={destinationCountry}
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

export default TripPackageInformationTab; 