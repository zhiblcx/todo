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
      state.value = [{ id: nanoid(), taskName: actions.payload, checked: false }, ...state.value]
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
    },
    completeTask: (state, actions) => {
      const index = state.value.findIndex(state => state.id === actions.payload.id)
      state.value[index] = { id: actions.payload.id, checked: actions.payload.checked, taskName: state.value[index].taskName }
      localStorage.setItem('tasks', JSON.stringify(state.value))
    }
  },
})
export const { addTask, deleteTask, editTask, maskVisible, completeTask } = todoSlice.actions

export default todoSlice.reducer