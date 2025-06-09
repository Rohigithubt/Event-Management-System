import React from 'react'
import Header from '../components/admin/Header'
import Sidebar from '../components/admin/Sidebar'
import {Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <Header />
    {/* <Sidebar /> */}
    <div className="content">
      {/* <Outlet /> */}
    </div>
    </>
  )
}

export default Layout
