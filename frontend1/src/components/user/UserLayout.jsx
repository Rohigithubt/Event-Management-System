import React from 'react'
import UserSidebar from './UserSidebar'
import HomeHeader from '../../homepage/HomeHeader'

const UserLayout = ({children}) => {
  return (
    <div className="flex h-screen overflow-hidden ml-0">
      <UserSidebar />
      <HomeHeader />
       <main className="p-4 bg-white h-full flex overflow-auto"> <div className="flex flex-col flex-1 transition-all duration-300 ml-74"> {children}</div></main>
    </div>
  )
}

export default UserLayout
