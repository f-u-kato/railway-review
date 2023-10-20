import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { Navigate, useNavigate, Link, useParams } from 'react-router-dom'
import { url } from '../const'
import './profile.scss'
import { useForm } from 'react-hook-form'

export const DetailReview = () => {
  const [cookies] = useCookies(['token'])
  const [updateError, setUpdateError] = useState()
  const [bookDetail, setBookDetail] = useState()
  const { bookId } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  

  useEffect(()=>{
    const data= {"id":bookId}
    const headers={"headers":{authorization: `Bearer ${cookies.token}`,}}
    axios.get(`${url}/books/${bookId}`,data,headers)
    .then((res)=>{
      setBookDetail(res.data)
    }
    )
  })



  return (
    <div>
      <Header />
      <div className="detail-review">
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
          <br/>
          <div>
            <label htmlFor="url"></label>
            <br />
            <input
              id="url"
              {...register('url', { required: '入力必須です' })}
              placeholder="https://..."
            />
            <p className="error-message">
              {errors.url && errors.url.message}
            </p>
          </div>
          <br/>
          <div>
            <label htmlFor="detail"></label>
            <br />
            <input
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
            <input
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
              アップデート
            </button>
          </div>
          <p className="error-message">{updateError}</p>
        </form>
      </div>
    </div>
  )
}
