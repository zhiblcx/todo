import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todo/todoSlice'
import countTimer from './countTime/countTimeSlice.js'

export const store = configureStore({
  reducer: {
    tasks: todoSlice,
    timer: countTimer
  }
})
