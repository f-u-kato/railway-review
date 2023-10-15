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

export const Login = () => {
  const auth = useSelector((state) => state.auth.isLogIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()
  const { register, handleSubmit, formState: {errors} } = useForm()

  const emailRule={
    required: "メールアドレスを入力してください",
    pattern:{
      value:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
      message:'メールアドレスの形式が違います'
    }
  }
  const passwordRule={
    required: "パスワードを入力してください"
  }

  const onSubmit = (data) => {
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        dispatch(logIn())
        setCookie('token', res.data.token)
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err.response.data.ErrorMessageJP}`)
      })

      if (auth) return <Navigate to="/" />
  }

  

  return (
    <div>
      <Header />
      <div className="login">
        <h1 className="title">ログイン</h1>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label role="label" htmlFor="email">メールアドレス</label>
            <br />
            <input
              role='input'
              id="email"
              {...register('email', emailRule)}
              placeholder="aaa@xxx.yy"
            />
            <p className='error-message' id='email-error'>{errors.email && errors.email.message}</p>
          </div>
          <div>
            <label role="label" htmlFor="password">パスワード</label>
            <br />
            <input
              role='input'
              id="password"
              {...register('password', passwordRule)}
              type="password"
              placeholder="Password"
            />
            <p className='error-message' id='password-error'>{errors.password && errors.password.message}</p>
          </div>
          <div className="click-element">
            <Link className="sign-up-link" to="/signup">
              新規作成
            </Link>
            <button role='button' type="submit" className="login-button" id='submit' >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
