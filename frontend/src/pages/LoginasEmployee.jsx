import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { setUser } from '../redux/authSlice';
import { AUTH_API_ENDPOINT } from '../utils/constant';
import BackgroundImage from '../assets/Images/bg.jpg'; // Import the background image

const LoginasEmp = () => {
  const [credentials, setCredentials] = useState({
    organization_name: '',
    mail: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${AUTH_API_ENDPOINT}/login`, credentials, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success("Login successful");
        navigate('/employee-dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f0f0', // Fallback color
      }}
    >
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-[1.01] w-full max-w-4xl">
        {/* Welcome Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#4361ee] to-[#4895ef] text-white p-8 md:p-12 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black/10 z-0"></div>
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <FiUser className="text-6xl md:text-8xl text-white transform transition-transform duration-500 hover:scale-110" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8">Join your organization's network</p>
            <div className="flex justify-center space-x-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-[#4361ee] shadow-lg">
                <FiMail className="text-xl md:text-2xl" />
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-[#4361ee] shadow-lg">
                <FiLock className="text-xl md:text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Login to your account</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Organization Name */}
            <div className="relative">
              <label
                className={`absolute left-4 -top-2 px-1 text-xs text-gray-500 bg-white transition-all duration-200 ${
                  credentials.organization_name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Organization Name
              </label>
              <input
                type="text"
                name="organization_name"
                value={credentials.organization_name}
                onChange={handleInputChange}
                placeholder="Organization Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4361ee] transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label
                className={`absolute left-4 -top-2 px-1 text-xs text-gray-500 bg-white transition-all duration-200 ${
                  credentials.mail ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                name="mail"
                value={credentials.mail}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4361ee] transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                className={`absolute left-4 -top-2 px-1 text-xs text-gray-500 bg-white transition-all duration-200 ${
                  credentials.password ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4361ee] transition-all duration-300"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/forgotpassword')}
                className="text-sm text-[#4361ee] hover:text-[#4895ef] transition-colors duration-300 w-full md:w-auto text-center"
              >
                Forgot Password?
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-[#4361ee] to-[#4895ef] text-white rounded-xl font-semibold hover:from-[#4895ef] hover:to-[#4361ee] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center justify-center w-full"
            >
              <i className="fas fa-arrow-left mr-1"></i> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginasEmp;