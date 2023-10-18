import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { nextPage, previousPage } from '../pageSlice'
import "./pagination.scss"
import { useNavigate } from 'react-router-dom'

export const Pagination = () => {
  const currentPage = useSelector((state)=>state.page)
  const dispatch=useDispatch()
  return (
    <div className='page-button'>
      {currentPage > 1 ? (
        <button
          key="prev"
          className="page-button__prev page-button-item"
          onClick={() => {
            dispatch(previousPage());
            // navigate('/');
          }}
        >
          前
        </button>
      ) : (
        <div className='page-button--disable page-button-item'>前</div>
      )}

      <div
        className="page-button__current page-button-item"
      >
        {currentPage}
      </div>

      <button
        key="next"
        className="page-button__next page-button-item"
        onClick={() => {
          dispatch(nextPage());
          // navigate('/')
        }}
      >
        次
      </button>
    </div>
  )
}
