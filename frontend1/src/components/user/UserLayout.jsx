import React from 'react'
import UserSidebar from './UserSidebar'
import HomeHeader from '../../homepage/HomeHeader'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />
      <UserSidebar />
      <main className="p-4 bg-white h-full flex overflow-auto">
        <div className='flex flex-col flex-1 transition-all duration-300 ml-74 mt-15'>
        <Outlet />
        </div>
      </main>
    </div>
  )
}

export default UserLayout
