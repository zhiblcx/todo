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
      state.value = [
        {
          id: nanoid(),
          taskName: actions.payload.taskName,
          startTime: actions.payload.startTime,
          checked: false
        },
        ...state.value
      ]
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    editTask: (state, actions) => {
      const { payload } = actions
      const index = state.value.findIndex(({ id }) => id === payload.id)
      state.value[index] = {
        ...state.value[index],
        id: payload.id,
        taskName: payload.taskName
      }
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    deleteTask: (state, actions) => {
      state.value = state.value.filter((task) => task.id !== actions.payload)
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    maskVisible: (state) => {
      state.visible = !state.visible
    },
    completeTask: (state, actions) => {
      const { payload } = actions
      const index = state.value.findIndex((state) => state.id === payload.id)
      state.value[index] = {
        ...state.value[index],
        checked: payload.checked,
        endTime: payload.endTime
      }
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    sortTask: (state) => {
      state.value.sort((taskA, taskB) => {
        if (taskA.checked && !taskB.checked) {
          return 1
        }
        if (!taskA.checked && taskB.checked) {
          return -1
        }
        return 0
      })
      localStorage.setItem('tasks', JSON.stringify(state.value))
    }
  }
})
export const { addTask, deleteTask, editTask, maskVisible, completeTask, sortTask } = todoSlice.actions

export default todoSlice.reducer
