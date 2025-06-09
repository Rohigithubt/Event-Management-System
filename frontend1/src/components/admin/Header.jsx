import React from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa'; // user icon for mobile
import ProfileDropdown from './ProfileDropdown';

const Header = ({ toggleSidebar }) => {
  return (
    <header
      className="px-4 py-3 flex items-center justify-between text-white"
      style={{
        position: 'relative',
        zIndex: 1000,
        backgroundColor: '#3366ff',
        boxShadow:
          '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      }}
    >
      {/* Logo */}
      <div className="text-2xl font-bold">EMSystem</div>

      {/* Toggle Sidebar (visible on mobile) */}
      <button onClick={toggleSidebar} className="text-2xl text-black mr-270">
        <RiMenuLine />
      </button>

      {/* Profile - desktop */}
      <div className="hidden lg:block">
        <ProfileDropdown />
      </div>

      {/* Profile - mobile */}
      <div className="lg:hidden">
        <FaUserCircle className="text-2xl cursor-pointer" />
        {/* Optional: Add dropdown on click */}
      </div>
    </header>
  );
};

export default Header;

/*

import React from 'react';
import { RiMenuLine } from 'react-icons/ri';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ toggleSidebar }) => {
  return (
    <header
      className="px-4 py-3 flex items-center justify-between text-white"
      style={{
        backgroundColor: '#3366ff',
        boxShadow:
          '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      }}
    >
      <button onClick={toggleSidebar} className="text-2xl text-white">
        <RiMenuLine />
      </button>
      <ProfileDropdown />
    </header>
  );
};

export default Header;


*/