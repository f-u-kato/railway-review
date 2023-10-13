import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import './login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../authSlice'
import { url } from '../const'
import { useForm } from 'react-hook-form'

export const LogIn = () => {
  const auth = useSelector((state) => state.auth.isLogIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()

  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    axios
      .post(`${url}/login`, data)
      .then((res) => {
        setCookie('token', res.data.token)
        dispatch(logIn())
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`)
      })
  }

  if (auth) return <Navigate to="/" />

  return (
    <div>
      <Header />
      <div className="login">
        <h1 className="title">ログイン</h1>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <br />
            <input id="email" {...register('email')} placeholder="aaa@xxx.yy" />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <br />
            <input
              id="password"
              {...register('password')}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="click-element">
            <Link className="sign-up-link" to="/signup">
              新規作成
            </Link>
            <button type="submit" className="login-button">
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
