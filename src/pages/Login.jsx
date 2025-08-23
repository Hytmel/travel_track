import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EyeIcon, EyeOffIcon, FacebookIcon } from '../components/Icons.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';
import { useGoogleLogin } from '@react-oauth/google';

const sliderImages = [
  '/src/assets/images/login1.svg',
  '/src/assets/images/login2.svg',
  '/src/assets/images/login3.svg',
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Touch events for mobile
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (startX.current === null) return;
    const diff = e.touches[0].clientX - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) handleNext();
      else handlePrev();
      startX.current = null;
    }
  };
  const handleTouchEnd = () => {
    startX.current = null;
  };

  // Mouse events for desktop
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current || startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) handleNext();
      else handlePrev();
      isDragging.current = false;
      startX.current = null;
    }
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    startX.current = null;
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  };
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      setError('Please fill in both email and password.');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const credentials = {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      const result = await loginUser(credentials);
      
      if (result.success) {
        // Login successful, navigate to home
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message.includes('verify')) {
        setError('Please verify your email address before logging in. Check your email for a verification link.');
      } else if (error.message.includes('credentials') || error.message.includes('password') || error.message.includes('email')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse?.credential;
      if (!idToken) {
        setError('Google did not provide a credential. Please try again.');
        return;
      }
      setError('');
      setLoading(true);
      const res = await loginWithGoogle(idToken);
      if (res?.success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login was cancelled or failed. Please try again.');
  };

  // Alternative Google login using useGoogleLogin hook
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError('');
        setLoading(true);
        
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        const userInfo = await userInfoResponse.json();
        
        // Create a credential-like object for your backend
        const mockCredential = {
          credential: tokenResponse.access_token, // Use access token
          user: userInfo
        };
        
        const res = await loginWithGoogle(mockCredential);
        if (res?.success) {
          navigate('/');
        }
      } catch (err) {
        setError(err.message || 'Google login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google login failed. Please try again.'),
    flow: 'implicit'
  });

  return (
    <div className="min-h-screen flex items-center justify-space-around bg-[#FCFCFC] font-poppins">
      <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white pt-10 pl-12">
        {/* Left: Login Form */}
        <div className="flex-1 flex flex-col justify-center pl-20 pt-17 pb-10 ">
          <h2 className="font-poppins font-semibold text-[28px] text-[#197CAC] mb-8">Sign in to continue!</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                id="email"
                type="email"
                className="w-full border-0 border-b border-gray-300 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent placeholder:text-gray-400 placeholder:font-poppins"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                disabled={loading}
              />
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full border-0 border-b border-gray-400 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent placeholder:text-gray-400 placeholder:font-poppins"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-0 top-2.5 text-gray-500 hover:text-[#197CAC]"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label="Show password"
                disabled={loading}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <div className="flex items-center justify-between text-xs mt-1 font-poppins">
              <span className="text-gray-400">Forget password? <Link to="/forgot-password" className="text-[#197CAC] font-medium font-poppins underline">reset now</Link></span>
            </div>
            <div className="flex items-center justify-between text-xs font-poppins">
              <span className="text-gray-400">Do not have an account ? <Link to="/signup" className="text-[#197CAC] font-medium font-poppins underline">Sign up</Link></span>
            </div>
            {error && <div className="text-red-500 text-sm font-poppins mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full h-11 bg-[#197CAC] text-white rounded-md font-medium text-lg mt-2 hover:bg-[#156a99] transition-colors font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm font-poppins">Or log in with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="flex gap-4 items-center">
            {/* Custom Google Login Button */}
            <button
              onClick={googleLogin}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[40px]"
              disabled={loading}
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-gray-700 font-poppins">Google</span>
            </button>
            
            {/* Facebook Button */}
            <button 
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[40px]" 
              disabled={loading}
              type="button"
            >
              <FacebookIcon />
              <span className="font-medium text-gray-700 font-poppins">Facebook</span>
            </button>
          </div>
        </div>
        
        {/* Right: Image Slider with Swipe/Drag */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-white p-8">
          <div className="flex flex-col items-center">
            <div
              className="w-[420px] h-[520px] rounded-3xl overflow-hidden shadow-lg bg-white relative select-none group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              role="presentation"
            >
              <img
                src={sliderImages[current]}
                alt="Login Visual"
                className="w-full h-full object-cover transition-all duration-500"
                draggable={false}
              />
              {/* Left Arrow */}
              <button
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full text-[#197CAC] opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={handlePrev}
                aria-label="Previous image"
                type="button"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              {/* Right Arrow */}
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full text-[#197CAC] opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={handleNext}
                aria-label="Next image"
                type="button"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 py-4 w-[420px]">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`inline-block ${idx === current ? 'w-3 h-2 rounded-full bg-[#197CAC]' : 'w-2 h-2 rounded-full border border-[#197CAC] bg-white'} transition-all`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;