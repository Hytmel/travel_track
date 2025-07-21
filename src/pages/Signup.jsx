import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, GoogleIcon, FacebookIcon } from '../components/Icons.jsx';
import TextInput from '../components/TextInput.jsx';
import AuthButton from '../components/AuthButton.jsx';
import ImageSlider from '../components/ImageSlider.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

const sliderImages = [
  '/src/assets/images/login1.svg',
  '/src/assets/images/login2.svg',
  '/src/assets/images/login3.svg',
];

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // Pass form data to step 2 via navigation state
    navigate('/signup-step2', { state: { ...form } });
  };

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
          <h2 className="font-poppins font-semibold text-[28px] text-[#197CAC] mb-8">Sign up to continue!</h2>
          <form className="space-y-6">
            <div className="flex gap-12">
              <div className="flex-1">
                <TextInput
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </div>
              <div className="flex-1">
                <TextInput
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>
            </div>
            <TextInput
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextInput
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              showPasswordToggle
              EyeIcon={<EyeIcon />}
              EyeOffIcon={<EyeOffIcon />}
              autoComplete="new-password"
            />
            <TextInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              showPasswordToggle
              EyeIcon={<EyeIcon />}
              EyeOffIcon={<EyeOffIcon />}
              autoComplete="new-password"
            />
            <div className="flex items-center justify-between text-xs font-poppins">
              <span className="text-gray-400">Have an account ? <Link to="/login" className="text-[#197CAC] font-medium font-poppins underline">Sign in</Link></span>
            </div>
            {error && <div className="text-red-500 text-sm font-poppins mb-2">{error}</div>}
            <AuthButton type="button" className="bg-[#197CAC] text-white hover:bg-[#156a99] mt-4 w-full" onClick={handleNextStep}>Next step</AuthButton>
          </form>
          
          {/* Divider - Fixed */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm font-poppins">Or sign up with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          {/* Social Login Buttons - Fixed sizing to match login */}
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

export default Signup;