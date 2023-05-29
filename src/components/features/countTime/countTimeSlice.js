import { createSlice } from '@reduxjs/toolkit'
import { getFirstDayOfWeek, getLastDayOfWeek } from '../../../utils/getFullTime'
import { formatTime } from '../../../utils/formatTime'
import { getFullTime } from '../../../utils/getFullTime'
import { countTotalSecond } from '../../../utils/countTotalSecond'

const initialState = {
  dayTime: [],
  weekTime: [],
  monthTime: [],
  pausedTimer: null
}

if (localStorage.getItem('week-timer')) {
  initialState.weekTime = JSON.parse(localStorage.getItem('week-timer'))
  const difference = new Date(initialState.weekTime[0].weekEndTime + ' 23:59:59.999').getTime() - new Date().getTime()
  if (difference < 0) {
    initialState.weekTime = [{ time: '00:00:00', tag: 0 }, ...initialState.weekTime]
  }
} else {
  localStorage.setItem('week-timer', JSON.stringify([{ tag: 0, time: '00:00:00' }]))
  initialState.weekTime = JSON.parse(localStorage.getItem('week-timer'))
}

if (localStorage.getItem('daily-timer') && localStorage.getItem('month-timer')) {
  initialState.dayTime = JSON.parse(localStorage.getItem('daily-timer'))
  initialState.monthTime = JSON.parse(localStorage.getItem('month-timer'))
} else {
  localStorage.setItem('daily-timer', JSON.stringify([]))
  localStorage.setItem('month-timer', JSON.stringify([]))
}

if (localStorage.getItem('pasued-timer')) {
  initialState.pausedTimer = JSON.parse(localStorage.getItem('pasued-timer'))
} else {
  localStorage.setItem('pasued-timer', JSON.stringify(null))
}

export const countTimer = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    recordFirstTimer: (state) => {
      const today = getFullTime()
      const month = getFullTime().slice(0, 6)
      const todayRecord = state.dayTime.find((record) => record.date === today)
      const monthRecord = state.monthTime.find((record) => record.date === month)

      if (!todayRecord) {
        state.dayTime = [{ date: today, time: '00:00:00' }, ...state.dayTime]
      }

      if (!monthRecord) {
        state.monthTime = [{ date: month, time: '00:00:00' }, ...state.monthTime]
      }

      if (state.weekTime[0] == undefined) {
        state.weekTime[0] = {
          weekStartTime: getFirstDayOfWeek(),
          weekEndTime: getLastDayOfWeek(),
          time: '00:00:00',
          firstTime: new Date().getTime(),
          tag: 1
        }
      } else {
        const difference = new Date(state.weekTime[0].weekEndTime + ' 23:59:59.999').getTime() - new Date().getTime()
        if (difference < 0) {
          state.weekTime = [{ time: '00:00:00', tag: 0 }, ...state.weekTime]
        } else {
          state.weekTime[0] = {
            ...state.weekTime[0],
            firstTime: new Date().getTime(),
            tag: 1
          }
        }
      }
      localStorage.setItem('week-timer', JSON.stringify(state.weekTime))
    },

    recordPausedTimer: (state) => {
      state.pausedTimer = new Date().getTime()
      localStorage.setItem('pasued-timer', JSON.stringify(state.pausedTimer))
      localStorage.setItem('week-timer', JSON.stringify(state.weekTime))
    },

    recordResumeTimer: (state) => {
      if (state.pausedTimer) {
        const current = new Date().getTime()
        const pausedDuration = current - state.pausedTimer
        state.weekTime[0].firstTime += pausedDuration
        state.pausedTimer = null
        localStorage.setItem('pasued-timer', JSON.stringify(state.pausedTimer))
        localStorage.setItem('week-timer', JSON.stringify(state.weekTime))
      }
    },

    recordLastTimer: (state) => {
      const oldWeekTime = state.weekTime[0].time
      const oldFirstTime = state.weekTime[0].firstTime
      const totalSecond = countTotalSecond(oldWeekTime, oldFirstTime)
      const oldDayTime = state.dayTime[0].time
      const totalDaySecond = countTotalSecond(oldDayTime, oldFirstTime)
      state.dayTime[0].time = formatTime(totalDaySecond)
      const oldMonthTime = state.monthTime[0].time
      const totalMonthSecond = countTotalSecond(oldMonthTime, oldFirstTime)
      state.monthTime[0].time = formatTime(totalMonthSecond)

      state.weekTime[0] = {
        weekStartTime: getFirstDayOfWeek(),
        weekEndTime: getLastDayOfWeek(),
        time: formatTime(totalSecond),
        firstTime: '00:00:00',
        tag: 0
      }

      state.pausedTimer = null
      localStorage.setItem('pasued-timer', JSON.stringify(state.pausedTimer))
      localStorage.setItem('week-timer', JSON.stringify(state.weekTime))
      localStorage.setItem('daily-timer', JSON.stringify(state.dayTime))
      localStorage.setItem('month-timer', JSON.stringify(state.monthTime))
    },

    recodeGiveup: (state) => {
      state.weekTime[0] = {
        ...state.weekTime[0],
        firstTime: '00:00:00',
        tag: 0
      }

      localStorage.setItem('pasued-timer', JSON.stringify(state.pausedTimer))
      localStorage.setItem('week-timer', JSON.stringify(state.weekTime))
    }
  }
})

export const { recordFirstTimer, recordPausedTimer, recordResumeTimer, recordLastTimer, recodeGiveup } =
  countTimer.actions

export default countTimer.reducer
