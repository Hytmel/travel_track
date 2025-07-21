import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, GoogleIcon, FacebookIcon } from '../components/Icons.jsx';
import TextInput from '../components/TextInput.jsx';
import AuthButton from '../components/AuthButton.jsx';
import ImageSlider from '../components/ImageSlider.jsx';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const sliderImages = [
  '/src/assets/images/login1.svg',
  '/src/assets/images/login2.svg',
  '/src/assets/images/login3.svg',
];

const SignupStep2 = () => {
  const [form, setForm] = useState({
    day: '',
    month: '',
    year: '',
    gender: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!form.day || !form.month || !form.year || !form.gender || !agreeToTerms) {
      setError('Please fill in all fields and agree to the terms.');
      return;
    }
    setError('');
    // Submit logic here
    alert('Sign up successful!');
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  return (
    <div className="min-h-screen flex items-center justify-space-around bg-[#FCFCFC] font-poppins">
      <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white pt-10 pl-12">
        {/* Left: Image Slider */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-white p-8">
          <div className="flex flex-col items-center">
            <ImageSlider images={sliderImages} className="w-[420px] h-[550px]" />
          </div>
        </div>
        
        {/* Right: Signup Form */}
        <div className="flex-1 flex flex-col justify-center pl-20 pt-17 pb-10 pr-16">
          <Link to="/signup" className="font-poppins font-semibold text-[28px] text-[#197CAC] mb-8 flex items-center hover:text-[#156a99] transition-colors">
            <ChevronLeft className="w-8 h-8 mr-2" />
            Sign up to continue!
          </Link>
          
          <form className="space-y-6">
            {error && <div className="text-red-500 text-sm font-poppins mb-2">{error}</div>}
            {/* Date of Birth */}
            <div className="flex gap-4">
              <div className="flex-1">
                <select
                  name="day"
                  value={form.day}
                  onChange={handleChange}
                  className={`w-full border-0 border-b border-gray-300 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent font-poppins ${!form.day ? 'text-gray-400 font-normal' : 'text-gray-700'}`}
                >
                  <option value="">Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                  className={`w-full border-0 border-b border-gray-300 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent font-poppins ${!form.month ? 'text-gray-400 font-normal' : 'text-gray-700'}`}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className={`w-full border-0 border-b border-gray-300 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent font-poppins ${!form.year ? 'text-gray-400 font-normal' : 'text-gray-700'}`}
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender */}
            <div>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={`w-full border-0 border-b border-gray-300 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent font-poppins ${!form.gender ? 'text-gray-400 font-normal' : 'text-gray-700'}`}
              >
                <option value="">Gender</option>
                {genders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            {/* Sign in link */}
            <div className="flex items-center justify-between text-xs font-poppins">
              <span className="text-gray-400">Have an account ? <Link to="/login" className="text-[#197CAC] font-medium font-poppins underline">Sign in</Link></span>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 text-[#197CAC] bg-gray-100 border-gray-300 rounded focus:ring-[#197CAC] focus:ring-2"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700 font-poppins">
                I agree to the <a href="#" className="text-[#197CAC] underline">Terms of Service</a> and <a href="#" className="text-[#197CAC] underline">Privacy Policy</a>
              </label>
            </div>

            {/* Sign Up button */}
            <AuthButton type="button" className="bg-[#197CAC] text-white hover:bg-[#156a99] mt-4" onClick={handleSignUp}>Sign Up</AuthButton>
          </form>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm font-poppins">Or sign up with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          {/* Social Login Buttons */}
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
      </div>
    </div>
  );
};

export default SignupStep2; 