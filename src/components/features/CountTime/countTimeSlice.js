import { createSlice } from '@reduxjs/toolkit'
import { getFirstDayOfWeek, getLastDayOfWeek } from '../../../utils/getFullTime'

const initialState = {
  totalTime: []
}

if (localStorage.getItem('count-timer')) {
  initialState.totalTime = JSON.parse(localStorage.getItem('count-timer'))
} else {
  localStorage.setItem('count-timer', JSON.stringify([{ tag: 0, weekTime: '00:00:00' }]))
}

export const countTimer = createSlice({
  name: 'count-timer',
  initialState,
  reducers: {
    recordFirstTimer: (state) => {
      if (state.totalTime[state.totalTime.length - 1].endTime == undefined) {
        state.totalTime[state.totalTime.length - 1] = {
          startTime: getFirstDayOfWeek(),
          endTime: getLastDayOfWeek(),
          weekTime: '00:00:00',
          firstTime: new Date().getTime(),
          tag: 1
        }
      } else {
        const difference =
          new Date(state.totalTime[state.totalTime.length - 1].endTime).getTime() - new Date().getTime()
        if (difference < 0) {
          state.totalTime = [{}, ...state.totalTime]
        } else {
          state.totalTime[state.totalTime.length - 1] = {
            ...state.totalTime[state.totalTime.length - 1],
            tag: 1,
            firstTime: new Date().getTime()
          }
        }
      }
      localStorage.setItem('count-timer', JSON.stringify(state.totalTime))
    },

    recordLastTimer: (state) => {
      const oldWeekTime = state.totalTime[state.totalTime.length - 1].weekTime
      const oldFirstTime = state.totalTime[state.totalTime.length - 1].firstTime
      const totalSecond =
        parseInt(oldWeekTime.split(':')[0] * 60 * 60) +
        parseInt(oldWeekTime.split(':')[1] * 60) +
        parseInt(oldWeekTime.split(':')[2]) +
        parseInt((new Date().getTime() - new Date(oldFirstTime).getTime()) / 1000)

      const hour =
        parseInt(totalSecond / 60 / 60) < 10 ? '0' + parseInt(totalSecond / 60 / 60) : parseInt(totalSecond / 60 / 60)
      const minute =
        parseInt((totalSecond / 60) % 60) < 10 ? '0' + parseInt(totalSecond / 60) : parseInt(totalSecond / 60)
      const second = parseInt(totalSecond % 60) < 10 ? '0' + parseInt(totalSecond % 60) : parseInt(totalSecond % 60)

      state.totalTime[state.totalTime.length - 1] = {
        startTime: getFirstDayOfWeek(),
        endTime: getLastDayOfWeek(),
        weekTime: hour + ':' + minute + ':' + second,
        firstTime: '00:00:00',
        tag: 0
      }
      localStorage.setItem('count-timer', JSON.stringify(state.totalTime))
    }
  }
})

export const { recordFirstTimer, recordLastTimer } = countTimer.actions

export default countTimer.reducer
