import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todo/todoSlice.js'
import countTimer from './CountTime/countTimeSlice.js'

export const store = configureStore({
  reducer: {
    tasks: todoSlice,
    timer: countTimer,
  },
})