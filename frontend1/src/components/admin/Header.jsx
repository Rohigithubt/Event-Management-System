import React from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ toggleSidebar }) => {
  return (
    <header
      className="px-4 py-5.5 flex items-center justify-between text-white border border-gray-300 relative"
    >
      <div className="text-2xl font-bold text-black">EMSystem</div>
      <button
        onClick={toggleSidebar}
        className="p-3 text-black mr-240 rounded-md"
      >
        <RiMenuLine className="text-xl" />
      </button>


      <div className="hidden lg:block">
        <ProfileDropdown />
      </div>

      <div className="lg:hidden">
        <FaUserCircle className="text-2xl cursor-pointer" />
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