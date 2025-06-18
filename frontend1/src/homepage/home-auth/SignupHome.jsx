import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import noImg from '../../assets/images/no-image.jpg';
import Footer from '../../components/admin/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/slice/userSlice';

const SignupHome = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneno: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    location: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (form.password !== form.confirmPassword) {
      return setErrors({ confirmPassword: 'Passwords do not match' });
    }

    try {
      const { confirmPassword, ...dataToSend } = form; 
      const res = await dispatch(RegisterUser(dataToSend));

      if (RegisterUser.fulfilled.match(res)) {
        navigate('/login-home');
      } else if (res.payload?.message) {
        setErrors({ backend: res.payload.message });
      } else {
        setErrors({ backend: 'Registration failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ backend: 'Server error. Try again later.' });
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-white mt-18">
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10 border-r border-gray-300">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-[#0a2540] border-b-3 border-blue-600 inline-block mt-9 pb-2">
              Sign Up Now
            </h2>
            <p className="text-black mt-5 mb-9">Create your account by filling in the information below.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white p-10 rounded-xl shadow-lg border border-gray-200 space-y-6"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center bg-[#f5f7f9] rounded-full p-1 gap-1">
                <Link
                  to="/login-home"
                  className="text-sm px-6 py-2 rounded-full font-semibold text-[#0a2540] duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup-home"
                  className="text-sm px-6 py-2 rounded-full font-semibold bg-blue-600 text-white shadow-md duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {errors.backend && (
              <p className="text-red-600 text-sm text-center -mt-2">{errors.backend}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneno"
                value={form.phoneno}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            {form.role === 'volunteer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter Your Location"
                  required={form.role === 'volunteer'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center text-xl text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Your Password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center text-xl text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>

            <p className="text-center">
              Already registered?{' '}
              <Link to="/login-home" className="text-blue-600">
                Sign In
              </Link>
            </p>
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
                        <span className="font-medium">{item.createBy}</span> | {item.date}
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

export default SignupHome;
