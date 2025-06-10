import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
   <header className="fixed top-0 left-0 w-full z-50  border border-gray-300 bg-white py-6 px-6">

      <div className="flex justify-between items-center">
        <div className="text-2xl ml-5 font-bold text-black-600">
          EMSystem
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <nav className="hidden md:flex space-x-12 text-lg">
          <Link to="/home-page" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/our-heros" className="font-black hover:text-blue-600 transition">Our Heroes</Link>
          <Link to="/education" className="hover:text-blue-600 transition">Education</Link>
          <Link to="/home-seminar" className="text-gray-700 hover:text-blue-600 transition">Seminar</Link>
          <Link to="/home-news" className="text-gray-700 hover:text-blue-600 transition">News</Link>
          <Link to="/home-contact" className="text-gray-700 hover:text-blue-600 transition">Contact Us</Link>
        </nav>

        <div className="hidden md:flex space-x-3">
          <Link to="/login" className="px-4 py-2 bg-blue-200 text-balck rounded-full w-22 pl-6 hover:bg-blue-600 hover:text-white transition">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-200 text-black rounded-full w-22 pl-5 hover:bg-blue-600 hover:text-amber-50 transition">
            Signup
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-lg">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/heroes" className="block font-black hover:text-blue-600">Our Heroes</Link>
          <Link to="/education" className="block hover:text-blue-600">Education</Link>
          <Link to="/seminar" className="block text-gray-700 hover:text-blue-600">Seminar</Link>
          <Link to="/news" className="block text-gray-700 hover:text-blue-600">News</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600">Contact Us</Link>
          <div className="pt-2 space-x-2">
            <Link to="/login" className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Login
            </Link>
            <Link to="/signup" className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
              Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
