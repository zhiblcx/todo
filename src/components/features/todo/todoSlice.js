import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = {
  value: [
    {
      id: '01',
      taskName: '123111111111111111111111111123123'
    },
    {
      id: '02',
      taskName: '456'
    },
    {
      id: '03',
      taskName: '789'
    }
  ]
}

export const todoSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, actions) => {
      state.value = [...state.value, { id: nanoid(), taskName: actions.payload }]
    },
    editTask: (state, actions) => {
      const index = state.value.findIndex(state => state.id == actions.payload.id)
      state.value[index] = { id: actions.payload.id, taskName: actions.payload.taskName }
    },
    deleteTask: (state, actions) => {
      const newTasks = state.value.filter((task) => task.id != actions.payload)
      state.value = newTasks
    }
  },
})
export const { addTask, deleteTask } = todoSlice.actions

export default todoSlice.reducer