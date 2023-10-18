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
  const [updateError,setUpdateError]= useState({error:false,message:''})
  const [infoError,setInfoError]=useState()
  const [userInfo, setUserInfo] = useState()
  const [preview, setPreview] = useState()
  const [iconImage, setIconImage] = useState()
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    axios
      .get(`${url}/users}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data)
        setIconImage(res.data.iconUrl)
        const reader = new FileReader()
        reader.readAsDataURL(res.data.iconUrl)
        reader.onload = () => {
          setPreview(reader.result)
        }

      })
      .catch((err) => {
        setInfoError(
          `ユーザ情報の取得に失敗しました。${err.response.data.ErrorMessageJP}`
        )
      })
  },[])

  const onUpdateName = (data) => {
    axios
      .put(`${url}/users`, data,{
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        axios
      .put(`${url}/users`, data,{
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUpdateError(
            "情報を更新しました。"
          )
      })
      .catch((err) => {
        setUpdateError(
          `アイコンの更新に失敗しました。${err.response.data.ErrorMessageJP}`
        )
      })
      })
      .catch((err) => {
        setNameUpdate(
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
        <h1 className="title">サインアップ</h1>
        <p className="error-message">{infoError}</p>
        <form onSubmit={handleSubmit}>
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
            <Link className="login-link" to="/">
              書籍一覧へ
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
