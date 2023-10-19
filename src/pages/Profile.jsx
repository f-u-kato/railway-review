import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { url } from '../const'
import './profile.scss'
import Compressor from 'compressorjs'
import { useForm } from 'react-hook-form'

export const Profile = () => {
  const [cookies] = useCookies(['token'])
  const [updateError, setUpdateError] = useState()
  const [infoError, setInfoError] = useState()
  const [userName, setUserName] = useState()
  const [preview, setPreview] = useState()
  const [iconImage, setIconImage] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.name)
        if (res.data.iconUrl) {
          setPreview(res.data.iconUrl)
          axios.get(res.data.iconUrl).then((r) => setIconImage(r.blob()))
        }
      })
      .catch((err) => {
        setInfoError(`ユーザ情報の取得に失敗しました。${err}`)
      })
  }, [])

  const onSubmit = (data) => {
    axios
      .put(`${url}/users`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        if (iconImage) {
          const submitData = new FormData()
          submitData.append('icon', iconImage)
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + cookies.token,
            },
          }

          axios
            .post(`${url}/uploads`, submitData, config)
            .then((res) => {
              setUpdateError('情報を更新しました。')
            })
            .catch((err) => {
              setUpdateError(
                `アイコンの更新に失敗しました。${err.response.data.ErrorMessageJP}`
              )
            })
        }
      })
      .catch((err) => {
        setUpdateError(
          `名前の更新に失敗しました。${err.response.data.ErrorMessageJP}`
        )
      })
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
        <h1 className="title">ユーザ情報編集</h1>
        <p className="error-message">{infoError}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">名前</label>
            <br />
            <input
              id="name"
              {...register('name', { required: '入力必須です' })}
              placeholder="山田太郎"
              defaultValue={userName}
            />
            <p className="error-message">
              {errors.name && errors.name.message}
            </p>
          </div>
          <div>
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
                defaultValue={iconImage}
              />
            </label>
          </div>
          <div className="click-element">
            <Link className="login-link" to="/">
              書籍一覧へ
            </Link>
            <button type="submit" className="sign-up-button">
              アップデート
            </button>
          </div>
          <p className="error-message">{updateError}</p>
        </form>
      </div>
    </div>
  )
}
