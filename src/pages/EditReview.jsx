import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { Navigate, useNavigate, Link, useParams } from 'react-router-dom'
import { url } from '../const'
import './profile.scss'
import { useForm } from 'react-hook-form'

export const EditReview = () => {
  const [cookies] = useCookies(['token'])
  const [updateMessage, setUpdateMessage] = useState()
  const [errorMessage,setErrorMessage]=useState()
  const [isError,setIsError]=useState(false)
  const [reviewDetail,setReviewDetail]=useState()
  const { bookId } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    axios
      .get(`${url}/books/${bookId}`, {
        headers: { authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
          setReviewDetail(res.data)
      })
      .catch((err)=>{
        setErrorMessage(`読み込みに失敗しました.${err}`)
      })
  })

  const onSubmit = (data) => {
    axios
      .post(`${url}/books`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        setUpdateMessage('情報を更新しました。')
        setIsError(false)
      })
      .catch((err) => {
        setUpdateMessage(
          `名前の更新に失敗しました。${err.response.data.ErrorMessageJP}`
        )
        setIsError(true)
      })
  }
  const updateMessageClass=isError?"error-message":"success-message";
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
              defaultValue={reviewDetail.title}
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
              defaultValue={reviewDetail.url}
            />
            <p className="error-message">{errors.url && errors.url.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="detail">詳細</label>
            <br />
            <input
              id="detail"
              {...register('detail', { required: '入力必須です' })}
              placeholder=""
              defaultValue={reviewDetail.detail}
            />
            <p className="error-message">
              {errors.detail && errors.detail.message}
            </p>
          </div>
          <div>
            <label htmlFor="review">レビュー</label>
            <br />
            <input
              id="review"
              {...register('review', { required: '入力必須です' })}
              placeholder=""
              defaultValue={reviewDetail.review}
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
              アップデート
            </button>
          </div>
          <p className={updateMessageClass}>{updateMessage}</p>
        </form>
      </div>
    </div>
  )
}
