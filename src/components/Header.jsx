import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../authSlice'
import './header.scss'
import axios from 'axios'
import { url } from '../const'

export const Header = () => {
  const auth = useSelector((state) => state.auth.isLogIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies()
  const [userName, setUserName] = useState()
  const handleLogOut = () => {
    dispatch(logOut())
    removeCookie('token')
  }
  useEffect(() => {
    if (auth) {
      axios
        .get(`${url}/users`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setUserName(res.data.name)
        })
        .catch((err) => {
          console.log(`ユーザ情報の取得に失敗しました。${err}`)
        })
    }
  }, [])

  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      {auth ? (
        <>
          <p className="user-name">{userName}</p>
          <Link to="/profile" className="edit-profile">
            ユーザ情報編集
          </Link>
          <button onClick={handleLogOut} className="log-out-button">
            ログアウト
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="log-out-button">
            ログイン
          </Link>
        </>
      )}
    </header>
  )
}
