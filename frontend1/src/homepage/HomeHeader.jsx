import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <div className="hidden md:flex space-x-3">
          <Link to="/login-home" className="px-4 py-2 border border-[#006AF2] bg-[#006AF2] text-white shadow-lg rounded-full hover:bg-white hover:text-[#006AF2] transition">
            Login
          </Link>
          <Link to="/signup-home" className="px-4 py-2 border border-[#006AF2] bg-[#006AF2] shadow-lg text-white rounded-full hover:bg-white hover:text-[#006AF2] transition">
            Signup
          </Link>
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
            <Link to="/login-home" className="px-4 py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Login
            </Link>
            <Link to="/signup-home" className="px-4 py-2 text-center bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
              Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
