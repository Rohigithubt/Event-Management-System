import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/admin/Home'
import Dashboard from '../components/admin/Dasboard'
import WebinarList from '../components/admin/WebinarList'
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
import UserSidebar from '../components/user/UserSidebar'
import UserLayout from '../components/user/UserLayout'
import UserWebinar from '../components/user/UserWebinar'
import UserNotification from '../components/user/UserNotification'
import UserProfileSetting from '../components/user/UserProfileSetting'


const Routers = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/user-sidebar' element={<UserSidebar />} />
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
        <Route path="/webinar" element={<Home><WebinarList /></Home>} />
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

/* -------------------------------------------------------User Routing-----------------------------------------------------------------------*/

       <Route path='/user/layout' element={<UserLayout />} />

        <Route path="/user/webinar" element={<UserLayout />}>
          <Route index element={<UserWebinar />} />
        </Route>

         <Route path="/user/notification" element={<UserLayout />}>
          <Route index element={<UserNotification />} />
        </Route>

        <Route path="/user/profile-setting" element={<UserLayout />}>
          <Route index element={<UserProfileSetting />} />
        </Route>



      </Routes>
    </>
  )
}

export default Routers
