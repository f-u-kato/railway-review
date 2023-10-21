import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import { Profile } from '../pages/Profile'
import { Register } from '../pages/Register'
import { DetailReview } from '../pages/DetailReview'
import { EditReview } from '../pages/EditReview'

export const Router = () => {
  const auth = useSelector((state) => state.auth.isLogIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail/:bookId" element={<DetailReview />} />

        {auth ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<Register />} />
            <Route path="/edit/:bookId" element={<EditReview />} />
          </>
        ) : (
          <></>
        )}
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}
