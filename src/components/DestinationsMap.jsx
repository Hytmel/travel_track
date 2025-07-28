import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom airplane icon
const airplaneIcon = L.divIcon({
  html: `
    <svg width="40" height="45" viewBox="0 0 55 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.9195 17.2925C29.8885 9.87152 28.5072 0.809669 26.91 0.799072C25.2969 0.826174 24.0539 9.88637 24.0849 17.3073C24.082 17.9956 24.095 18.6463 24.1079 19.2969C23.3521 19.977 21.7547 21.4347 19.7499 23.2754C19.7389 23.2484 19.7926 23.2269 19.7978 23.1622L19.7748 21.1726C19.7685 20.9253 19.5366 20.7379 19.2516 20.7282L17.3156 20.7293C17.0306 20.7196 16.8055 20.9356 16.8118 21.1829L16.8348 23.1725C16.8348 23.1725 16.9107 23.3604 16.954 23.4678L16.9513 25.7803C15.2413 27.3457 13.365 29.0406 11.5425 30.7141L11.5303 28.7514C11.5241 28.5039 11.2922 28.3166 11.0071 28.3068L9.07119 28.3082C8.78613 28.2984 8.56106 28.5142 8.56729 28.7615L8.5903 30.7512C8.5903 30.7512 8.66626 30.9392 8.70964 31.0466L8.71206 33.2943C4.04306 37.5857 0.156785 41.1861 0.0927776 41.3369C-0.0832458 41.7515 0.0452795 44.6981 0.0452795 44.6981C0.0422879 45.3864 0.114137 45.9507 0.205537 45.945C0.259237 45.9233 0.331928 45.1757 0.345767 44.5141L10.7561 38.1217C10.7903 38.6702 10.9262 39.0838 11.0444 39.0671C11.2272 39.0559 11.349 38.5069 11.352 37.8185L11.3303 37.7648L13.407 36.4886C13.4572 36.9992 13.5553 37.3968 13.7113 37.3963C13.8941 37.3849 14.0159 36.8359 14.0189 36.1476L15.8916 34.985L17.353 34.582C17.3819 35.1949 17.4966 35.7107 17.6794 35.6993C17.8622 35.688 17.9839 35.139 17.987 34.4507L17.9762 34.4239L20.9148 33.5802C20.9437 34.1931 21.0745 34.6712 21.2304 34.6707C21.4133 34.6592 21.535 34.1103 21.538 33.4219L21.5272 33.3952L24.2133 32.6221C24.2951 37.6177 24.3719 39.5856 24.3901 43.2639C24.419 46.9688 24.7055 50.5386 25.0872 53.5703C22.5624 55.9021 17.4644 60.523 17.4644 60.523L17.3102 62.6155L26.31 60.3848C26.4789 61.0349 26.6582 61.5558 26.81 61.9317C26.9337 63.4747 27.0661 64.4206 27.1952 64.4311C27.3511 64.4304 27.477 63.505 27.5687 62.0314C27.7019 61.6652 27.8505 61.1055 27.9877 60.3629L37.0939 62.4931L36.9092 60.4126C36.9092 60.4126 31.4234 55.5702 28.9636 53.347C29.2868 50.4367 29.571 47.0424 29.8168 43.4762C29.7954 38.8624 29.826 36.8511 29.8651 32.6188L32.535 33.3517C32.532 34.0401 32.6684 34.6094 32.8512 34.5981C33.0071 34.5975 33.1237 34.1131 33.1485 33.4787L36.0982 34.2857L36.1089 34.3126C36.1059 35.001 36.2424 35.5705 36.4253 35.559C36.5811 35.5585 36.7246 35.0633 36.7224 34.4396L38.1972 34.8431L40.0941 35.9819C40.0911 36.6703 40.2276 37.2398 40.4105 37.2285C40.5663 37.2278 40.6618 36.8457 40.703 36.3294L42.7725 37.5859L42.794 37.6396C42.7642 38.3389 42.9275 38.8975 43.0834 38.897C43.2395 38.8964 43.3509 38.4766 43.3812 37.9334L53.857 44.2265C53.8702 44.8772 53.9373 45.662 54.0018 45.667C54.0932 45.6615 54.1505 45.1075 54.1535 44.4191C54.1535 44.4191 54.2831 41.4931 54.1096 41.0635C54.0446 40.9024 50.1065 37.3401 45.4027 33.1189L45.4003 30.871C45.4003 30.871 45.5448 30.6877 45.5392 30.5963L45.5161 28.6066C45.5099 28.3592 45.2779 28.1718 44.9929 28.162L43.057 28.1634C42.772 28.1536 42.5469 28.3696 42.5531 28.6169L42.5652 30.5796C40.7096 28.9245 38.8432 27.2424 37.0954 25.6997L37.0983 23.3873C37.0983 23.3873 37.2427 23.204 37.237 23.1126L37.2141 21.1229C37.2079 20.8755 36.9759 20.6881 36.6909 20.6783L34.755 20.6797C34.47 20.6699 34.2449 20.8859 34.2511 21.1332L34.274 23.1228C34.274 23.1228 34.3067 23.2033 34.3174 23.2303C32.3162 21.4465 30.7142 20.0322 29.9375 19.3467C29.9244 18.6961 29.9382 18.0345 29.9412 17.3461L29.9195 17.2925Z" fill="#DA3351"/>
    </svg>
  `,
  className: 'custom-airplane-icon',
  iconSize: [40, 45],
  iconAnchor: [20, 22.5],
});

// Custom destination marker
const destinationIcon = L.divIcon({
  html: `
    <div style="
      width: 16px;
      height: 16px;
      background: #197CAC;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>
  `,
  className: 'custom-destination-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function DestinationsMap({ destinations = [] }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  console.log('DestinationsMap received destinations:', destinations);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map with dynamic center
    const centerLat = destinations.length > 0 ? 37.5 : 36.7538;
    const centerLng = destinations.length > 0 ? 3.75 : 3.0588;
    const map = L.map(mapRef.current).setView([centerLat, centerLng], 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || destinations.length === 0) return;

    const map = mapInstanceRef.current;
    
    // Clear existing markers and lines
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    console.log('Creating markers for destinations:', destinations);

    // Generate dynamic coordinates based on destination names
    const destinationCoordinates = destinations.map((destination, index) => {
      // Simple hash-based coordinate generation for demo purposes
      // In a real app, you'd use a geocoding service
      const hash = destination.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      // Generate coordinates within a reasonable range
      const lat = 35 + (hash % 10) * 0.5; // Between 35-40 latitude
      const lng = 0 + (hash % 15) * 0.5;  // Between 0-7.5 longitude
      
      return [lat, lng];
    });

    const markers = [];
    const routePoints = [];

    const allMarkers = [];

    destinations.forEach((destination, index) => {
      if (index < destinationCoordinates.length) {
        const coords = destinationCoordinates[index];
        routePoints.push(coords);

        // Add destination marker with airplane icon
        const marker = L.marker(coords, { icon: airplaneIcon })
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center;">
              <strong>${destination}</strong><br>
              <small>Day ${index + 1}</small>
            </div>
          `);

        markers.push(marker);
        allMarkers.push(marker);


      }
    });

    // Add route line
    if (routePoints.length > 1) {
      const routeLine = L.polyline(routePoints, {
        color: '#ff4444',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 5'
      }).addTo(map);

      // Fit map to show all markers
      const group = new L.featureGroup([...allMarkers, routeLine]);
      map.fitBounds(group.getBounds().pad(0.1));


    }

  }, [destinations]);

  return (
    <div className="bg-white " >
             <div className="text-[20px] font-semibold mb-2 font-poppins" style={{ color: '#197CAC' }}>
         Itinerary Map
       </div>
       <div className="text-base text-gray-600 mb-8 font-poppins font-normal">
         Here's a visual overview of your journey! Each dotted line shows your travel route between destinations. 
         Tap on a location for more details.
       </div>
      
      <div 
        ref={mapRef} 
        style={{ 
          height: '400px', 
          width: '100%', 
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />

      

      {/* Empty State */}
      {destinations.length === 0 && (
        <div className="mt-4 p-8 bg-gray-50 rounded-lg text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <div className="text-lg font-semibold text-gray-700 mb-1">No destinations yet</div>
          <div className="text-sm text-gray-500">Add destinations to see them on the map</div>
        </div>
      )}
    </div>
  );
}

export default DestinationsMap; 