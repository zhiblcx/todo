import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { recordFirstTimer, recordLastTimer } from './countTimeSlice'
import { formatTime } from '../../../utils/formatTime.js'
import styles from './CountTime.module.css'

export default function CountTime() {
  const [timer, setTimer] = useState('00:00:00')

  const {
    stateBtn,
    time: weekTime,
    firstTime
  } = useSelector((state) => {
    const totalTime = state.timer.weekTime
    if (totalTime.length === 0) {
      return {
        stateBtn: 0,
        time: '00:00:00',
        firstTime: '00:00:00'
      }
    } else {
      return {
        stateBtn: totalTime[0].tag || 0,
        time: totalTime[0].time || '00:00:00',
        firstTime: totalTime[0].firstTime || '00:00:00'
      }
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    let countTimer
    if (stateBtn === 1) {
      countTimer = setInterval(() => {
        const oldFirstTime = firstTime
        const totalSecond = parseInt((new Date().getTime() - new Date(oldFirstTime).getTime()) / 1000)
        setTimer(formatTime(totalSecond))
      }, 1000)
    }

    return () => {
      setTimer('00:00:00')
      clearInterval(countTimer)
    }
  }, [stateBtn, firstTime])

  function handlerStartStudy() {
    dispatch(recordFirstTimer())
  }

  function handlerEndStudy() {
    dispatch(recordLastTimer())
  }

  return (
    <>
      <div style={{ display: stateBtn === 0 ? 'block' : 'none' }}>
        <div className={styles.text}>本周学习时间</div>
        <div className={styles.time}>{weekTime}</div>
        <div
          className={styles.countTimeBtn}
          onClick={handlerStartStudy}
        >
          开始学习
        </div>
      </div>
      <div style={{ display: stateBtn == 1 ? 'block' : 'none' }}>
        <div className={styles.text}>正在学习中...</div>
        <div className={styles.time}>{timer}</div>
        <div
          className={styles.countTimeBtn}
          onClick={handlerEndStudy}
        >
          结束学习
        </div>
      </div>
    </>
  )
}
