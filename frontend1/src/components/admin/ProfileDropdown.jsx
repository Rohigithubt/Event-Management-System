import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-800 hover:text-blue-600 text-3xl focus:outline-none"
      >
        <FaUserCircle />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-30">
          <ul className="py-2 text-gray-800">
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold text-base">
              <FiUser className="text-lg" />
              <Link to='/profile-details'>
              <span>Profile</span></Link>
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold text-base">
              <FiLogOut className="text-lg" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
