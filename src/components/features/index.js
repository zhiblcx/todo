import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todo/todoSlice.js'

export const store = configureStore({
  reducer: {
    tasks: todoSlice,
  },
})