import React from 'react';
import HomeHeader from './HomeHeader';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />
      <main className="flex-1 p-4 bg-gray-100 overflow-auto">
       <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
