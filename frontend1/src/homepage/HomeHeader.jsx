import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX,FiBell } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import userImage from "../assets/images/images.png"

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  return (
    <header className="fixed top-0 left-0 w-full z-50 border border-gray-300 bg-white px-4 py-4 sm:px-6 md:px-10">
      <div className="flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold text-black">
          EMSystem
        </div>

        <nav className="hidden md:flex space-x-6 lg:space-x-10 text-base lg:text-lg">
          <Link to="/home-page" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/our-heros" className="font-black hover:text-blue-600 transition">Our Heroes</Link>
          <Link to="/education" className="hover:text-blue-600 transition">Education</Link>
          <Link to="/home-seminar" className="text-gray-700 hover:text-blue-600 transition">Seminar</Link>
          <Link to="/home-news" className="text-gray-700 hover:text-blue-600 transition">News</Link>
          <Link to="/home-contact" className="text-gray-700 hover:text-blue-600 transition">Contact Us</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          
          {user ? (
            <>
            <Link to="/user/notification" ><FiBell className="text-xl" /></Link>
            <Link 
              to="/user/profile-setting" 
              className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-1 rounded-full transition"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                {user.image ? (
                  <img 
                    src={`${VITE_API_URL}/${user.image}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <img 
                    src={userImage}
                    />
                  </div>
                )}
              </div>
              <div>
              <p className='font-normal'>Welcome</p>
              <span className="text-gray-700">{user.name || 'Profile'}</span>
              </div>
            </Link>
            </>
          ) : (
            <>
              <Link to="/login-home" className="px-4 py-2 border border-[#006AF2] bg-[#006AF2] text-white shadow-lg rounded-full hover:bg-white hover:text-[#006AF2] transition">
                Login
              </Link>
              <Link to="/signup-home" className="px-4 py-2 border border-[#006AF2] bg-[#006AF2] shadow-lg text-white rounded-full hover:bg-white hover:text-[#006AF2] transition">
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-base">
          <Link to="/home-page" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/our-heros" className="block font-black hover:text-blue-600">Our Heroes</Link>
          <Link to="/education" className="block hover:text-blue-600">Education</Link>
          <Link to="/home-seminar" className="block text-gray-700 hover:text-blue-600">Seminar</Link>
          <Link to="/home-news" className="block text-gray-700 hover:text-blue-600">News</Link>
          <Link to="/home-contact" className="block text-gray-700 hover:text-blue-600">Contact Us</Link>

          <div className="pt-2 flex flex-col gap-2 sm:flex-row sm:gap-3">
            {user ? (
              <Link 
                to="/user/profile-setting" 
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300">
                  {user.image ? (
                    <img 
                      src={`${VITE_API_URL}/${user.image}`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-600">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{user.name || 'Profile'}</span>
              </Link>
            ) : (
              <>
                <Link to="/login-home" className="px-4 py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Login
                </Link>
                <Link to="/signup-home" className="px-4 py-2 text-center bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;