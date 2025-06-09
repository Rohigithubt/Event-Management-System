// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import img from './assets/images/notfound.jpg'

const Notfound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <h1
        className="text-[120px] font-extrabold bg-clip-text text-transparent leading-none"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        Oops!
      </h1>
      <h2 className="text-xl font-bold mt-6 mb-2">404 - PAGE NOT FOUND</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
      >
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default Notfound;
