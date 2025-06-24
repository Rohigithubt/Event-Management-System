import React from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="px-4 py-4 sm:py-5 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 text-black mr-2 sm:mr-4 rounded-md hover:bg-gray-100"
        >
          <RiMenuLine className="text-xl" />
        </button>
        <div className="text-xl sm:text-2xl font-bold text-black">EMSystem</div>
      </div>

      <div className="flex items-center">
        <div className="hidden md:block">
          <ProfileDropdown />
        </div>
        <div className="md:hidden">
          <FaUserCircle className="text-2xl cursor-pointer text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;
