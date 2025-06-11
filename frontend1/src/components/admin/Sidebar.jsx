import React from 'react';
import { FiHome, FiVideo, FiUsers, FiMonitor } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-20.5 left-0 bg-white  text-white shadow-xl transition-all duration-300 overflow-y-auto h-[calc(100vh-56px)] ${isOpen ? 'w-74 px-5 py-6' : 'w-0'
        }`}
    >
      <ul className="space-y-7 mt-20">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-4 py-3 px-4 bg-white text-black hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors duration-200"
          >
            <FiHome className="text-xl" />
            <span className="text-black font-normal">Dashboard</span>
          </Link>
        </li>
       
        
        <li>
          <Link
            to="/webinar"
            className="flex items-center gap-4 py-3 px-4 bg-white text-black hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors duration-200"
          >
            <FiVideo className="text-xl" />
            <span className="text-black font-normal">Webinars</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Seminar-list"
            className="flex items-center gap-4 py-3 px-4 bg-white text-black hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors duration-200"
          >
            <FiMonitor className="text-xl" />
            <span className="text-black font-normal">Seminars</span>
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center gap-4 py-3 px-4 bg-white text-black hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors duration-200"
          >
            <FiUsers className="text-xl" />
            <span className="text-black font-normal">Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="/volunteer-list"
            className="flex items-center gap-4 py-3 px-4 bg-white text-black hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors duration-200"
          >
            <FiMonitor className="text-xl" />
            <span className="text-black font-normal">Volunteer List</span>
          </Link>
        </li>
        <li>
          <Link
            to="/event-list"
            className="flex items-center gap-4 py-3 px-4 bg-white text-black hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors duration-200"
          >
            <FiMonitor className="text-xl" />
            <span className="text-black font-normal">Event List</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
