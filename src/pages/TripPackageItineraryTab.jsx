import React, { useState } from 'react';
import DestinationsSection from '../components/DestinationsSection';
import { useSelectedDestination } from '../components/SelectedDestinationContext';
import { ArrowBetweenDestinations, ArrowBetweenDestinationsB } from '../components/Icons';

function TripPackageItineraryTab() {
  const { tripInfo, setTripInfo } = useSelectedDestination();
  const [editingIdx, setEditingIdx] = useState(null);

  // Handlers for editing destinations
  const handleDestinationChange = (idx, value) => {
    setTripInfo(prev => ({
      ...prev,
      destinations: prev.destinations.map((d, i) => (i === idx ? value : d)),
    }));
  };
  const handleDestinationKeyDown = (e, idx) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      setEditingIdx(null);
    }
  };
  const handleDestinationBlur = (idx) => {
    setEditingIdx(null);
  };

  return (
    <div className="w-full">
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
      {/* Itinerary UI will go here next */}
    </div>
  );
}

export default TripPackageItineraryTab; 