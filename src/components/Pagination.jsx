import React from 'react'
import { connect } from 'react-redux'
import { setCurrentPage } from './paginationActions'

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const buttons = []
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  return (
    <div>
      {prevPage > 0 ? (
        <button
          key="prev"
          className="prev"
          onClick={() => handlePageChange(prevPage)}
        >
          前
        </button>
      ) : (
        <></>
      )}

      <button
        key={currentPage}
        className="active"
        onClick={() => handlePageChange(currentPage)}
      >
        {currentPage}
      </button>

      <button
        key="next"
        className="next"
        onClick={() => handlePageChange(nextPage)}
      >
        次
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  totalPages: state.totalPages,
})

const mapDispatchToProps = {
  setCurrentPage,
}
