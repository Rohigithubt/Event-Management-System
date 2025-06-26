import React from 'react';
import {
  FiHome,
  FiClock,
  FiUser,
  FiBell,
  FiList,
  FiLogOut
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogOut } from '../../redux/slice/userSlice';
import userImage from "../../assets/images/images.png"

const VolunteerSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
  try {
    console.log("hello")
    await dispatch(LogOut()).unwrap();
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    toast.success('Logged out successfully');
    navigate('/login-home');
  } catch (error) {
    toast.error(error.message || 'Logout failed');
  }
};

  return (
    <div className="fixed top-20.5 left-0 w-80 px-5 py-6 bg-white text-white shadow-xl transition-all duration-300 overflow-y-auto h-[calc(100vh-56px)]">
      
      <div className="flex flex-col items-center mt-0 relative">
        <div className="w-24 h-24 rounded-full border-5 border-white flex ml-4 items-center justify-center overflow-hidden -mt-2 z-50 relative">
          {user?.image ? (
            <img 
              src={`${VITE_API_URL}/${user.image}`} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img 
                src={userImage}
              />
            </div>
          )}
        </div>
        
        <div className='w-60 h-30 bg-gray-100 ml-4 -mt-10 rounded-xl z-10'>
          <p className='text-xl font-semibold text-black text-center pt-10'>Welcome Back!</p>
          <p className='text-xl font-normal text-black text-center pt-2 pb-10'>
            {user?.name || 'User'}
          </p>
        </div>
      </div>

      <ul className="space-y-7 mt-20 mb-20">
        <li>
          <NavLink
            to="/dashboard"
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
            <FiList className="text-xl" />
            <span className="text-md">Requests</span>
          </NavLink>
        </li>

         <li>
          <NavLink
            to="/user/notification"
            className="flex items-center gap-4 py-3 px-5 h-17 rounded-full duration-200 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white"
          >
            <FiClock className="text-xl" />
            <span className="text-md">Event History</span>
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
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center gap-4 py-3 px-5 h-17 bg-[#F5F7F9] text-black hover:bg-[#006AF2] hover:!text-white !rounded-full duration-200"
          >
            <FiLogOut className="text-xl" />
            <span className="text-md">{loading ? 'Logging out...' : 'Logout'}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VolunteerSidebar;