import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/admin/Home'
import Dashboard from '../components/admin/Dasboard'
import Webinar from '../components/admin/Webinar'
import Footer from '../components/admin/Footer'
import EventList from '../components/admin/EventList'
import VolunteerList from '../components/admin/VolunteerList'
import SeminarList from '../components/admin/SeminarList'
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
import AboutUs from '../homepage/AboutUs'
import LoginHome from '../homepage/home-auth/LoginHome'
import SignupHome from '../homepage/home-auth/SignupHome'
import NewsList from '../components/admin/NewsList'
import ContactFormList from '../components/admin/ContactFormList'
import UserList from '../components/admin/UserList'
import LocationList from '../components/admin/LocationList'


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
        <Route path="/about-home" element={<HomePage />}>
          <Route index element={<AboutUs />} />
        </Route>

         <Route path="/login-home" element={<HomePage />}>
          <Route index element={<LoginHome />} />
        </Route>
        
         <Route path="/signup-home" element={<HomePage />}>
          <Route index element={<SignupHome />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path="/dashboard" element={<Home><Dashboard /></Home>} />
        <Route path="/webinar" element={<Home><Webinar /></Home>} />
          <Route path="/news" element={<Home><NewsList /></Home>} />
          <Route path="/contact-form-list" element={<Home><ContactFormList /></Home>} />
          <Route path="/user-list" element={<Home><UserList /></Home>} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/event-list' element={<Home><EventList /></Home>} />
        <Route path='/volunteer-list' element={<Home><VolunteerList /></Home>} />
        <Route path='/Seminar-list' element={<Home><SeminarList /></Home>} />
        <Route path='/profile-details' element={<Home><ProfileDetails /></Home>} />
           <Route path='/location-list' element={<Home><LocationList /></Home>} />


        <Route path="*" element={<Notfound />} />


      </Routes>
    </>
  )
}

export default Routers
