import React from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../authSlice'
import './header.scss'

export const Header = () => {
  const auth = useSelector((state) => state.auth.isLogIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies()
  const handleLogOut = () => {
    dispatch(logOut())
    removeCookie('token')
    navigate('/login')
  }

  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      {auth ? (
        <button onClick={handleLogOut} className="log-out-button">
          ログアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  )
}
