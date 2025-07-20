import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Explore from './pages/Explore.jsx';
import ItineraryBuilder from './pages/ItineraryBuilder.jsx';
import MyTrips from './pages/MyTrips.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/itinerary" element={<ItineraryBuilder />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 