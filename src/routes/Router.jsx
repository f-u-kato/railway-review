import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import { Profile } from '../pages/Profile'

export const Router = () => {
  const auth = useSelector((state) => state.auth.isLogIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}
