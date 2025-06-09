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
import HomeHeader from '../homepage/HomeHeader'
import MainHome from '../homepage/MainHome'
import HomePage from '../homepage/HomePage'
import OurHeros from '../homepage/OurHeros'
import Education from '../homepage/Education'
import HomeSeminar from '../homepage/HomeSeminar'
import HomeNews from '../homepage/HomeNews'
import HomeContactus from '../homepage/HomeContactus'
import Notfound from '../Notfound'


const Routers = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/homepage' element={<HomeHeader />} />
        
        <Route path="/home-page" element={<HomePage />}>
          <Route index element={<MainHome />} />
        </Route>
           <Route path="/our-heros" element={<HomePage />}>
          <Route index element={<OurHeros />} />
        </Route>
        <Route path="/education" element={<HomePage />}>
          <Route index element={<Education />} />
        </Route>
        <Route path="/home-seminar" element={<HomePage />}>
          <Route index element={<HomeSeminar />} />
        </Route>
        <Route path="/home-news" element={<HomePage />}>
          <Route index element={<HomeNews />} />
        </Route>
         <Route path="/home-contact" element={<HomePage />}>
          <Route index element={<HomeContactus />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path="/dashboard" element={<Home><Dashboard /></Home>} />
        <Route path="/webinar" element={<Home><Webinar /></Home>} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/event-list' element={<Home><EventList /></Home>} />
        <Route path='/volunteer-list' element={<Home><VolunteerList /></Home>} />
        <Route path='/Seminar-list' element={<Home><Seminar /></Home>} />
        <Route path='/profile-details' element={<Home><ProfileDetails /></Home>} />


        <Route path="*" element={<Notfound />} />


      </Routes>
    </>
  )
}

export default Routers
