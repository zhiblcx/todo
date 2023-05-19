import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import styles from './CountTime.module.css'
import { recordFirstTimer, recordLastTimer } from './countTimeSlice'

export default function CountTime() {
  const [timer, setTimer] = useState('00:00:00')
  const stateBtn = useSelector((state) => state.timer.totalTime[state.timer.totalTime.length - 1].tag || 0)
  const weekTime = useSelector((state) => state.timer.totalTime[state.timer.totalTime.length - 1].weekTime)
  const dispatch = useDispatch()
  const firstTime = useSelector((state) => state.timer.totalTime[state.timer.totalTime.length - 1].firstTime)

  useEffect(() => {
    let countTimer
    if (stateBtn === 1) {
      countTimer = setInterval(() => {
        const oldFirstTime = firstTime
        const totalSecond = parseInt((new Date().getTime() - new Date(oldFirstTime).getTime()) / 1000)
        const hour =
          parseInt(totalSecond / 60 / 60) < 10 ? '0' + parseInt(totalSecond / 60 / 60) : parseInt(totalSecond / 60 / 60)
        const minute =
          parseInt((totalSecond / 60) % 60) < 10 ? '0' + parseInt(totalSecond / 60) : parseInt(totalSecond / 60)
        const second = parseInt(totalSecond % 60) < 10 ? '0' + parseInt(totalSecond % 60) : parseInt(totalSecond % 60)
        setTimer(hour + ':' + minute + ':' + second)
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
      <div style={{ display: stateBtn == 0 ? 'block' : 'none' }}>
        <div style={{ color: '#2aa69a', fontSize: '40px', marginTop: '30px' }}>本周学习时间</div>
        <div className={styles.time}>{weekTime}</div>
        <div
          style={{
            backgroundColor: '#2aa69a',
            outline: 'none',
            border: '2px solid #2d6c6e',
            width: '200px',
            height: '50px',
            lineHeight: '50px',
            margin: '50px auto',
            fontSize: '25px',
            cursor: 'pointer'
          }}
          onClick={handlerStartStudy}
        >
          开始学习
        </div>
      </div>
      <div style={{ display: stateBtn == 1 ? 'block' : 'none' }}>
        <div style={{ color: '#2aa69a', fontSize: '40px', marginTop: '30px' }}>正在学习中...</div>
        <div className={styles.time}>{timer}</div>
        <div
          style={{
            backgroundColor: '#2aa69a',
            outline: 'none',
            border: '2px solid #2d6c6e',
            width: '200px',
            height: '50px',
            lineHeight: '50px',
            margin: '50px auto',
            fontSize: '25px',
            cursor: 'pointer'
          }}
          onClick={handlerEndStudy}
        >
          结束学习
        </div>
      </div>
    </>
  )
}
