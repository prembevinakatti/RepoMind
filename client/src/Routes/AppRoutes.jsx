import HomePage from '@/Pages/HomePage'
import LandingPage from '@/Pages/LandingPage'
import LoginPage from '@/Pages/LoginPage'
import RegisterPage from '@/Pages/RegisterPage'
import RepoDetailsPage from '@/Pages/RepoDetailsPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/repo/:id" element={<RepoDetailsPage/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
