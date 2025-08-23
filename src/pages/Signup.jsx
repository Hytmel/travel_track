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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!form.firstName.trim()) {
      setError('First name is required.');
      return false;
    }
    if (!form.lastName.trim()) {
      setError('Last name is required.');
      return false;
    }
    if (!form.email.trim()) {
      setError('Email is required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!form.password) {
      setError('Password is required.');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (!form.confirmPassword) {
      setError('Please confirm your password.');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare data for API (exclude confirmPassword)
      const registrationData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      const result = await register(registrationData);
      
      if (result.success) {
        setSuccess(result.message);
        
        // Reset form
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        // Redirect to email verification page instead of login
        setTimeout(() => {
          navigate('/verify-email', { 
            state: { 
              email: registrationData.email 
            } 
          });
        }, 2000);
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    // TODO: Implement social signup
    console.log(`${provider} signup clicked`);
    setError(`${provider} signup is not implemented yet.`);
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
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-12">
              <div className="flex-1">
                <TextInput
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  disabled={loading}
                  required
                />
              </div>
              <div className="flex-1">
                <TextInput
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  disabled={loading}
                  required
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
              disabled={loading}
              required
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
              disabled={loading}
              required
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
              disabled={loading}
              required
            />
            
            <div className="flex items-center justify-between text-xs font-poppins">
              <span className="text-gray-400">
                Have an account ? <Link to="/login" className="text-[#197CAC] font-medium font-poppins underline">Sign in</Link>
              </span>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm font-poppins mb-2 p-2 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}
            
            {/* Success Message */}
            {success && (
              <div className="text-green-600 text-sm font-poppins mb-2 p-2 bg-green-50 border border-green-200 rounded">
                {success}
              </div>
            )}
            
            <AuthButton 
              type="submit" 
              className="bg-[#197CAC] text-white hover:bg-[#156a99] mt-4 w-full" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </AuthButton>
          </form>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm font-poppins">Or sign up with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          {/* Social Login Buttons */}
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => handleSocialSignup('Google')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              <span className="font-medium text-gray-700 font-poppins">Google</span>
            </button>
            <button 
              type="button"
              onClick={() => handleSocialSignup('Facebook')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
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