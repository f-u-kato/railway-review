import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { url } from '../const'
import './home.scss'
import { Pagination } from '../components/Pagination'
import { useSelector } from 'react-redux'

export const Home = () => {
  const [cookies] = useCookies(['token'])
  const [errorMessage, setErrorMessage] = useState()
  const [bookList, setBookList] = useState([])
  const currentPage = useSelector((state)=>state.page)
  useEffect(() => {
    axios
      .get(`${url}/books?offset=${(currentPage-1)*10}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBookList(res.data)
      })
      .catch((err) => {
        setErrorMessage(
          `リストの取得に失敗しました。${err.response.data.ErrorMessageJP}`
        )
      })
  },[currentPage])

  return (
    <div>
      <Header />
      <main className="review-books">
        <h1 className="page-title">書籍レビュー</h1>
        <p className="error-message">{errorMessage}</p>
        <ul className="book-list">
          {bookList.map((book, key) => (
            <li key={key} className="book-list-item">
              <Link to={`/books/${book.id}`} className="book-list-item__link">
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
        <Pagination />
      </main>
    </div>
  )
}
