import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = {
  value: [],
  visible: false
}

if (localStorage.getItem('tasks')) {
  initialState.value = JSON.parse(localStorage.getItem('tasks'))
} else {
  localStorage.setItem('tasks', [])
}

export const todoSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, actions) => {
      state.value = [...state.value, { id: nanoid(), taskName: actions.payload }]
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    editTask: (state, actions) => {
      const index = state.value.findIndex(state => state.id == actions.payload.id)
      state.value[index] = { id: actions.payload.id, taskName: actions.payload.taskName }
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    deleteTask: (state, actions) => {
      const newTasks = state.value.filter((task) => task.id != actions.payload)
      state.value = newTasks
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    maskVisible: (state) => {
      state.visible = !state.visible
    }
  },
})
export const { addTask, deleteTask, editTask, maskVisible } = todoSlice.actions

export default todoSlice.reducer