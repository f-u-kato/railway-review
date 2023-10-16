import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import './signUp.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../authSlice'
import { url } from '../const'
import { useForm } from 'react-hook-form'
import Compressor from 'compressorjs'

export const SignUp = () => {
  const auth = useSelector((state) => state.auth.isLogIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()
  const [preview, setPreview] = useState('')
  const [iconImage, setIconImage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const emailRule = {
    required: '入力必須です',
    maxLength: {
      value: 50,
      message: '最大50文字です',
    },
    pattern: {
      value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
      message: 'メールアドレスの形式が違います',
    },
  }
  const passwordRule = {
    required: 'パスワードを入力してください',
    minLength: {
      value: 4,
      message: '4文字以上に設定してください',
    },
  }
  const onSubmit = (data) => {
    axios
      .post(`${url}/users`, data)
      .then((res) => {
        setCookie('token', res.data.token)
        const submitData = new FormData()
        submitData.append('icon', iconImage, iconImage.name)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:
              'Bearer ' +
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc0MzUwMDYsImlhdCI6MTY5NzM0ODYwNiwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiODFhODM0ZGEtZjhiMS00MDE2LWE5NGMtMGY1OTQzMmE2NDNmIn0.uiMgpYvnScjJoLdwoLgk7vERSZXaBFeLMgL2LXtOHZA',
          },
        }
        axios
          .post(`${url}/uploads`, submitData, config)
          .then((res) => {
            dispatch(logIn())
            navigate('/')
          })
          .catch((err) => {
            setErrorMessage(`アイコンアップロードに失敗しました．${err}`)
          })
      })
      .catch((err) => {
        setErrorMessage(`サインアップに失敗しました。${err}`)
      })

    if (auth) return <Navigate to="/" />
  }

  const handleChangeFile = (e) => {
    const { files } = e.target
    const file = files[0]

    const compressor = new Compressor(file, {
      quality: 0.6,
      maxWidth: 200,
      maxHeight: 200,
      success(result) {
        setIconImage(result)
        const reader = new FileReader()
        reader.readAsDataURL(result)
        reader.onload = () => {
          setPreview(reader.result)
        }
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

  return (
    <div>
      <Header />
      <div className="sign-up">
        <h1 className="title">サインアップ</h1>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">名前</label>
            <br />
            <input
              id="name"
              {...register('name', { required: '入力必須です' })}
              placeholder="山田太郎"
            />
            <p className="error-message">
              {errors.name && errors.name.message}
            </p>
          </div>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <br />
            <input
              id="email"
              {...register('email', emailRule)}
              placeholder="aaa@xxx.yy"
            />
            <p className="error-message">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <br />
            <input
              id="password"
              {...register('password', passwordRule)}
              type="password"
              placeholder="Password"
            />
            <p className="error-message">
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="user-icon">
            <label htmlFor="image">
              <img src={preview} alt="preview" className="preview-img" />
              <input
                id="image"
                type="file"
                onChange={handleChangeFile}
                className="input-img"
              />
            </label>
          </div>
          <div className="click-element">
            <Link className="login-link" to="/login">
              ログイン画面へ
            </Link>
            <button type="submit" className="sign-up-button">
              サインアップ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
