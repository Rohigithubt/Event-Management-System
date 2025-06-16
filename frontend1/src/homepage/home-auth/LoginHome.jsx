import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import noImg from '../../assets/images/no-image.jpg';
import Footer from '../../components/admin/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/user/userSlice';

const LoginHome = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const news = [
    {
      id: 1,
      title: 'ujnuj',
      createBy: '5416tgbfgb',
      date: '18 June 2025 12:17 AM–01:18 PM',
      description: '',
      imageUrl: '',
    },
    {
      id: 2,
      title: 'Two-day seminar on higher education commences on Monday',
      createBy: 'rohit jain',
      date: '05 September 2024',
      description: '',
      imageUrl: '',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(LoginUser(form));
    if (LoginUser.fulfilled.match(result)) {
      navigate('/');
    } else if (LoginUser.rejected.match(result)) {
      if (result.payload && typeof result.payload === 'object') {
        setErrors(result.payload);
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white mt-18">
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10 border-r border-gray-300">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-[#0a2540] border-b-3 border-blue-600 inline-block mt-9 pb-2">
              Login Now
            </h2>
            <p className="text-black mt-5 mb-9">
              Welcome Back! please enter your email and password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white p-10 rounded-xl shadow-lg border border-gray-200 space-y-6"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center bg-[#f5f7f9] rounded-full p-1 gap-1">
                <Link
                  to="/login-home"
                  className="text-sm px-6 py-2 rounded-full font-semibold bg-blue-600 text-white shadow-md duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup-home"
                  className="text-sm px-6 py-2 rounded-full font-semibold text-[#0a2540] hover:text-white duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-blue-600 h-4 w-4"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
              </div>
              <button className="text-sm text-blue-600 hover:underline">Forgot Password?</button>
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm text-center">{errors.general}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 px-6 py-10 bg-[#f9fafb] overflow-y-auto">
          <h2 className="text-3xl ml-63 mb-27 font-semibold text-[#0a2540] border-b-3 border-blue-600 inline-block mt-9 pb-2">
            News & Blogs
          </h2>
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-md p-5 shadow-md">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4 flex-1">
                    <img
                      src={item.imageUrl || noImg}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-md shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-md font-semibold text-[#0a2540] break-words">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium"><ion-icon name="person-outline"></ion-icon> {item.createBy}</span> | <ion-icon name="calendar-outline"></ion-icon> {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="bg-gray-100 text-sm px-5 py-2 rounded-full font-semibold hover:bg-gray-200 w-full lg:w-auto">
                      Book Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginHome;
