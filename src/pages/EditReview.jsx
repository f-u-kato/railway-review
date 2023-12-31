import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { Navigate, useNavigate, Link, useParams } from 'react-router-dom'
import { url } from '../const'
import './editReview.scss'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export const EditReview = () => {
  const [cookies] = useCookies(['token'])
  const [submitMessage, setSubmitMessage] = useState()
  const [errorGetMessage, setErrorGetMessage] = useState()
  const [isError, setIsError] = useState(false)
  const [reviewDetail, setReviewDetail] = useState()
  const { bookId } = useParams()
  const navigate = useNavigate()
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
      .catch((err) => {
        setErrorGetMessage(`読み込みに失敗しました.${err}`)
      })
  })

  const onSubmit = (data) => {
    axios
      .put(`${url}/books/${bookId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        setSubmitMessage('情報を更新しました。')
        setIsError(false)
      })
      .catch((err) => {
        setSubmitMessage(
          `名前の更新に失敗しました。${err.response.data.ErrorGetMessageJP}`
        )
        setIsError(true)
      })
  }

  const deleteReview = () => {
    axios
      .delete(`${url}/books/${bookId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        setSubmitMessage(`削除に失敗しました．${err}`)
        setIsError(true)
      })
  }
  const submitMessageClass = isError ? 'error-message' : 'success-message'
  return (
    <div>
      <Header />
      {reviewDetail ? (
        <div className="review">
          <h1 className="page-title">書籍レビュー登録</h1>
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
              <p className="error-message">
                {errors.url && errors.url.message}
              </p>
            </div>
            <br />
            <div>
              <label htmlFor="detail">詳細</label>
              <br />
              <textarea
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
              <textarea
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
              <Link className="home-link" to="/">
                書籍一覧へ
              </Link>
              <button
                type="button"
                className="delete-button"
                onClick={deleteReview}
              >
                削除
              </button>
              <button type="submit" className="update-button">
                アップデート
              </button>
            </div>
            <p className={submitMessageClass}>{submitMessage}</p>
          </form>
        </div>
      ) : (
        <div className="click-element">
          <Link className="home-link" to="/">
            書籍一覧へ
          </Link>
        </div>
      )}
    </div>
  )
}
