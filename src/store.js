import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import {pageSlice} from './pageSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    page: pageSlice.reducer,
  },
})
