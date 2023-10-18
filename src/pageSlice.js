import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: 1,
  reducers: {
    nextPage: (state) => {
      return state + 1
    },
    previousPage: (state) => {
      return state - 1
    },
  },
})

export const { nextPage, previousPage } = pageSlice.actions
