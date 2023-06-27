import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  name: null,
  email: null,
  password: null,
  message: '这个人很懒,什么也没留下',
  visible: false
}

if (localStorage.getItem('userInfo')) {
  initialState = JSON.parse(localStorage.getItem('userInfo'))
} else {
  localStorage.setItem('userInfo', JSON.stringify(initialState))
}

export const userSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    editName: (state, actions) => {
      const { payload } = actions
      state.name = payload.name
      localStorage.setItem('userInfo', JSON.stringify(state))
    },
    editEmail: (state, actions) => {
      const { payload } = actions
      state.email = payload.email
      localStorage.setItem('userInfo', JSON.stringify(state))
    },
    editPassword: (state, actions) => {
      const { payload } = actions
      state.password = payload.password
      localStorage.setItem('userInfo', JSON.stringify(state))
    },
    editMessage: (state, actions) => {
      const { payload } = actions
      state.message = payload.message
      localStorage.setItem('userInfo', JSON.stringify(state))
    },
    maskVisible: (state) => {
      state.visible = !state.visible
    }
  }
})
export const { editName, editEmail, editPassword, editMessage, maskVisible } = userSlice.actions

export default userSlice.reducer
