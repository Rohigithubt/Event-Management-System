import React from 'react';
import {
  FiHome,
  FiVideo,
  FiUser,
  FiBell,
  FiLogOut
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="fixed top-20.5 left-0 w-80 px-5 py-6 bg-white text-white shadow-xl transition-all duration-300 overflow-y-auto h-[calc(100vh-56px)]">
      <ul className="space-y-7 mt-20 mb-20">
        <li>
          <NavLink
            to="/dash"
            className="flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white"
          >
            <FiHome className="text-xl" />
            <span className="text-md">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user/webinar"
            className="flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white"
          >
            <FiVideo className="text-xl" />
            <span className="text-md">Webinars</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user/notification"
            className="flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white"
          >
            <FiBell className="text-xl" />
            <span className="text-md">Notification</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user/profile-setting"
            className="flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white"
          >
            <FiUser className="text-xl" />
            <span className="text-md">Profile Settings</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="#"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"
          >
            <FiLogOut className="text-xl" />
            <span className="text-md">Logout</span>
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default UserSidebar;
