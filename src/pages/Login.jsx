import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EyeIcon, EyeOffIcon, GoogleIcon, FacebookIcon } from '../components/Icons.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

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
  const { login } = useAuth();
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

  return (
    <div className="min-h-screen flex items-center justify-space-around bg-[#FCFCFC] font-poppins">
      <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white pt-10 pl-12">
        {/* Left: Login Form */}
        <div className="flex-1 flex flex-col justify-center pl-20 pt-17 pb-10 ">
          <h2 className="font-poppins font-semibold text-[28px] text-[#197CAC] mb-8">Sign in to continue!</h2>
          <form className="space-y-6" onSubmit={e => {
            e.preventDefault();
            if (!form.email || !form.password) {
              setError('Please fill in both email and password.');
              return;
            }
            setError('');
            // Demo user info, replace with real data after backend integration
            login({
              name: 'Bouhafs Rim',
              email: form.email,
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            });
            navigate('/');
          }}>
            <div>
              <input
                id="email"
                type="email"
                className="w-full border-0 border-b border-gray-300 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent placeholder:text-gray-400 placeholder:font-poppins"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
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
              />
              <button
                type="button"
                className="absolute right-0 top-2.5 text-gray-500 hover:text-[#197CAC]"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label="Show password"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <div className="flex items-center justify-between text-xs mt-1 font-poppins">
              <span className="text-gray-400">Forget password? <a href="#" className="text-[#197CAC] font-medium font-poppins underline">reset now</a></span>
            </div>
            <div className="flex items-center justify-between text-xs font-poppins">
              <span className="text-gray-400">Do not have an account ? <Link to="/signup" className="text-[#197CAC] font-medium font-poppins underline">Sign up</Link></span>
            </div>
            {error && <div className="text-red-500 text-sm font-poppins mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full h-11 bg-[#197CAC] text-white rounded-md font-medium text-lg mt-2 hover:bg-[#156a99] transition-colors font-poppins"
            >
              Sign in
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm font-poppins">Or log in with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition-colors">
              <GoogleIcon />
              <span className="font-medium text-gray-700 font-poppins">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition-colors">
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