import React from 'react'
import VolunteerSidebar from './VolunteerSidebar'
import HomeHeader from '../../homepage/HomeHeader'
import { Outlet } from 'react-router-dom'

const VolunteerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />
      <VolunteerSidebar />
      <main className="p-4 bg-white h-full flex overflow-auto">
        <div className='flex flex-col flex-1 transition-all duration-300 ml-74 mt-15'>
        <Outlet />
        </div>
      </main>
    </div>
  )
}

export default VolunteerLayout
