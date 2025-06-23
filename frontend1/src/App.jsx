import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/admin/Home'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/admin/Footer'
import Dashboard from './components/admin/Dasboard'
import WebinarList from './components/admin/WebinarList'
import Routers from './route/Routers'


function App() {

  return (
    <>
       
    <Routers />

    </>
  )
}

export default App
