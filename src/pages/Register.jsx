import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { url } from '../const'
import './register.scss'
import { useForm } from 'react-hook-form'

export const Register = () => {
  const [cookies] = useCookies(['token'])
  const [updateMessage, setUpdateMessage] = useState()
  const [isError, setIsError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    axios
      .post(`${url}/books`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        setUpdateMessage('レビューを登録しました。')
        setIsError(false)
      })
      .catch((err) => {
        setUpdateMessage(
          `レビューの登録に失敗しました。${err.response.data.ErrorMessageJP}`
        )
        setIsError(true)
      })
  }
  const updateMessageClass = isError ? 'error-message' : 'success-message'

  return (
    <div>
      <Header />
      <div className="new-review">
        <h1 className="title">書籍レビュー登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">タイトル</label>
            <br />
            <input
              id="title"
              {...register('title', { required: '入力必須です' })}
              placeholder="タイトル"
            />
            <p className="error-message">
              {errors.title && errors.title.message}
            </p>
          </div>
          <br />
          <div>
            <label htmlFor="url">URL</label>
            <br />
            <input
              id="url"
              {...register('url', { required: '入力必須です' })}
              placeholder="https://..."
            />
            <p className="error-message">{errors.url && errors.url.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="detail">詳細</label>
            <br />
            <textarea
              id="detail"
              {...register('detail', { required: '入力必須です' })}
              placeholder=""
            />
            <p className="error-message">
              {errors.detail && errors.detail.message}
            </p>
          </div>
          <div>
            <label htmlFor="review">レビュー</label>
            <br />
            <textarea
              id="review"
              {...register('review', { required: '入力必須です' })}
              placeholder=""
            />
            <p className="error-message">
              {errors.detail && errors.detail.message}
            </p>
          </div>
          <div className="click-element">
            <Link className="login-link" to="/">
              書籍一覧へ
            </Link>
            <button type="submit" className="update-button">
              新規作成
            </button>
          </div>
          <p className={updateMessageClass}>{updateMessage}</p>
        </form>
      </div>
    </div>
  )
}
