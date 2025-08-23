import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Explore from "./pages/Explore.jsx";
import ItineraryBuilder from "./pages/ItineraryBuilder.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SignupStep2 from "./pages/SignupStep2.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import OTPVerification from "./pages/EmailConfirmed.jsx";
import EmailVerification from "./pages/OTPVerification.jsx";
import ResetPasswordOTPVerification from "./pages/ResetPasswordOTPVerification .jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import PasswordChangedSuccess from "./pages/PasswordChangedSuccess.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import Hotels from "./pages/Hotels.jsx";
import Dishes from "./pages/Dishes.jsx";
import BuildTrip from "./pages/BuildTrip.jsx";
import TripPackage from "./pages/TripPackage.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import { SelectedDestinationProvider } from "./components/SelectedDestinationContext.jsx";
import { FavoritesProvider } from "./components/FavoritesContext.jsx";
import TripDiaryTab from "./components/TripDiaryTab.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/signup-step2" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/otp-verification" ||
    location.pathname === "/email-confirmed" ||
    location.pathname === "/verify-email" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/reset-password-otp" ||
    location.pathname === "/password-changed-success";
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<EmailVerification />} />
        <Route path="/email-confirmed" element={<OTPVerification />} />
        <Route path="/reset-password-otp" element={<ResetPasswordOTPVerification />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password-changed-success"
          element={<PasswordChangedSuccess />}
        />
        <Route path="/trip-package" element={<TripPackage />} />
        <Route path="/trip-diary" element={<TripDiaryTab />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <SelectedDestinationProvider>
          <FavoritesProvider>
            <Router>
              <AppContent />
            </Router>
          </FavoritesProvider>
        </SelectedDestinationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
