import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/admin/Home'
import Dashboard from '../components/admin/Dasboard'
import Webinar from '../components/admin/Webinar'
import Footer from '../components/admin/Footer'
import EventList from '../components/admin/EventList'
import VolunteerList from '../components/admin/VolunteerList'
import Seminar from '../components/admin/Seminar'
import ProfileDetails from '../components/admin/ProfileDetails'
import Login from '../authPages/Login'
import SignUp from '../authPages/SignUp'

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home />} />
        <Route path="/dashboard" element={<Home><Dashboard /></Home>} />
        <Route path="/webinar" element={<Home><Webinar /></Home>} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/event-list' element={<Home><EventList /></Home>} />
        <Route path='/volunteer-list' element={<Home><VolunteerList /></Home>} />
        <Route path='/Seminar-list' element={<Home><Seminar /></Home>} />
        <Route path='/profile-details' element={<Home><ProfileDetails /></Home>} />




      </Routes>
    </>
  )
}

export default Routers
