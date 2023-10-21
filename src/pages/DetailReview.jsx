import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { Navigate, useNavigate, Link, useParams } from 'react-router-dom'
import { url } from '../const'
import './detailReview.scss'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export const DetailReview = () => {
  const auth = useSelector((state) => state.auth.isLogIn)
  const [cookies] = useCookies(['token'])
  const [errorMessage, setErrorMessage] = useState()
  const [bookReview, setBookReview] = useState()
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const headers = auth
      ? { headers: { authorization: `Bearer ${cookies.token}` } }
      : {}
    axios
      .get(`${url}/books/${bookId}`, headers)
      .then((res) => {
        setBookReview(res.data)
      })
      .catch((err) => {
        setErrorMessage(`データの取得に失敗しました${err}`)
      })
  }, [])

  return (
    <div>
      <Header />
      <div className="detail-review">
        <h1 className="page-title">書籍レビュー詳細</h1>
        <p className="error-message">{errorMessage}</p>
        {bookReview ? (
          <>
          <div className='review-body'>
            <div>
              <label>タイトル</label>
              <br />
              <p className="review-title review-info">{bookReview.title}</p>
            </div>
            <br />
            <div>
              <label>URL</label>
              <br />
              <a href={bookReview.url} className="review-url review-info">
                {bookReview.url}
              </a>
            </div>
            <br />
            <div>
              <label>詳細</label>
              <br />
              <textarea className="review-detail review-info" readOnly>{bookReview.detail}</textarea>
            </div>
            <div>
              <label>レビュー</label>
              <br />
              <textarea className="review-main review-info" readOnly>{bookReview.review}</textarea>
            </div>
            </div>
            <p className="review-reviewer">レビュワー:{bookReview.reviewer}</p>
            <div className="click-element">
              <Link className="login-link" to="/">
                書籍一覧へ
              </Link>
              {bookReview.isMine ? (
                <button
                  type="submit"
                  className="edit-button"
                  onClick={()=>{navigate(`/edit/${bookId}`)}}
                >
                  編集
                </button>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <div className="click-element">
            <Link className="login-link" to="/">
              書籍一覧へ
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
