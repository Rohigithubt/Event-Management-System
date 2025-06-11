import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dasboard';
import Webinar from './Webinar';
import { Outlet } from 'react-router-dom';

const Home = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden ml-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4 bg-gray-100 h-full flex overflow-auto"> <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}> {children}</div></main>
      </div>
    </div>
  );
};


export default Home;



