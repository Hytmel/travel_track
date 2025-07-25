import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Explore from './pages/Explore.jsx';
import ItineraryBuilder from './pages/ItineraryBuilder.jsx';
import MyTrips from './pages/MyTrips.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import SignupStep2 from './pages/SignupStep2.jsx';
import DestinationDetails from './pages/DestinationDetails.jsx';
import Hotels from './pages/Hotels.jsx';
import Dishes from './pages/Dishes.jsx';
import BuildTrip from './pages/BuildTrip.jsx';
import TripPackage from './pages/TripPackage.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import { SelectedDestinationProvider } from './components/SelectedDestinationContext.jsx';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/signup-step2';
  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/build-trip" element={<BuildTrip />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/itinerary" element={<ItineraryBuilder />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-step2" element={<SignupStep2 />} />
        <Route path="/trip-package" element={<TripPackage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SelectedDestinationProvider>
        <Router>
          <AppContent />
        </Router>
      </SelectedDestinationProvider>
    </AuthProvider>
  );
}

export default App; 