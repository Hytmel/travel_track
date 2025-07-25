import React, { createContext, useContext, useState } from 'react';

const SelectedDestinationContext = createContext();

export function SelectedDestinationProvider({ children }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  // New: full trip info state
  const [tripInfo, setTripInfo] = useState({
    destinations: [],
    travelMates: [],
    days: [],
    tripName: '',
    startDate: '',
    endDate: '',
    tripType: '',
    destinationImage: '',
    destinationDescription: '',
    destinationTitle: '', // Added destination title
    // add more fields as needed
  });
  return (
    <SelectedDestinationContext.Provider value={{ selectedDestination, setSelectedDestination, tripInfo, setTripInfo }}>
      {children}
    </SelectedDestinationContext.Provider>
  );
}

export function useSelectedDestination() {
  return useContext(SelectedDestinationContext);
} 