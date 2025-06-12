import React from 'react';
import { FiHome, FiVideo, FiUsers, FiMonitor } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-20.5 left-0 bg-white  text-white shadow-xl transition-all duration-300 overflow-y-auto h-[calc(100vh-56px)] ${isOpen ? 'w-80 px-5 py-6' : 'w-0'
        }`}
    >
      <ul className="space-y-7 mt-20">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"
          >
            <FiHome className="text-xl" />
            <span className="text-inherit text-md">Dashboard</span>
          </Link>
        </li>


        <li>
          <Link
            to="/webinar"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"          >
            <FiVideo className="text-xl" />
            <span className="text-inherit text-md">Webinars</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Seminar-list"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"          >
            <FiMonitor className="text-xl" />
            <span className="text-inherit text-md">Seminars</span>
          </Link>
        </li>
        <li>
          <Link
            to="/news"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"          >
            <FiMonitor className="text-xl" />
            <span className="text-inherit text-md">News</span>
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"          >
            <FiUsers className="text-xl" />
            <span className="text-inherit text-md">Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="/volunteer-list"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"          >
            <FiMonitor className="text-xl" />
            <span className="text-inherit text-md">Volunteer List</span>
          </Link>
        </li>
        <li>
          <Link
            to="/event-list"
            className="flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white rounded-full duration-200"          >
            <FiMonitor className="text-xl" />
            <span className="text-inherit text-md">Event List</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
