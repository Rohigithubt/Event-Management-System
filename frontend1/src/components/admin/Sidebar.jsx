import React from 'react';
import {
  FiHome,
  FiVideo,
  FiUsers,
  FiMonitor,
  FiBookOpen,
  FiPhone,
  FiLogOut,
  FiMapPin
} from 'react-icons/fi';
import { MdEventNote, MdNewspaper } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-20.5 left-0 bg-white text-white shadow-xl transition-all duration-300 overflow-y-auto h-[calc(100vh-56px)] ${isOpen ? 'w-80 px-5 py-6' : 'w-0'
        }`}
    >
      <ul className="space-y-7 mt-20 mb-20">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <FiHome className="text-xl" />
            <span className="text-md">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/webinar"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <FiVideo className="text-xl" />
            <span className="text-md">Webinars</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Seminar-list"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <FiBookOpen className="text-xl" />
            <span className="text-md">Seminars</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:text-white'
              }`
            }
          >
            <MdNewspaper className="text-xl" />
            <span className="text-md">News</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact-form-list"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <FiPhone className="text-xl" />
            <span className="text-md">Contact Form List</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user-list"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <FiUsers className="text-xl" />
            <span className="text-md">Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/volunteer-list"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <FiMonitor className="text-xl" />
            <span className="text-md">Volunteer List</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/location-list"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <FiMapPin className="text-xl" />
            <span className="text-md">Location List</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/event-list"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 ${isActive
                ? 'bg-[#006AF2] text-white'
                : 'bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white'
              }`
            }
          >
            <MdEventNote className="text-xl" />
            <span className="text-md">Event List</span>
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

export default Sidebar;
