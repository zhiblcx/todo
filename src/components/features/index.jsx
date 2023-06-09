import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todo/todoSlice'
import countTimer from './countTime/countTimeSlice.js'
import userSlice from './user/userSlice.js'

export const store = configureStore({
  reducer: {
    tasks: todoSlice,
    timer: countTimer,
    userInfo: userSlice
  }
})
