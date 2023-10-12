import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import './signin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../authSlice'
import { url } from '../const'
import { useForm } from 'react-hook-form'

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        setCookie('token', res.data.token)
        dispatch(signIn())
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`)
      })
  }

  if (auth) return <Navigate to="/" />

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email')} placeholder='Email' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...register('password')} type="password" placeholder='Password'/>
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
