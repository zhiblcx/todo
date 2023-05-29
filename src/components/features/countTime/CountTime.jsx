import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { recordFirstTimer, recordPausedTimer, recordResumeTimer, recordLastTimer, recodeGiveup } from './countTimeSlice'
import BubbleBox from '../../BubbleBox'
import { formatTime } from '../../../utils/formatTime.js'
import styles from './CountTime.module.css'

export default function CountTime() {
  const [timer, setTimer] = useState('00:00:00')
  const [paused, setPaused] = useState(useSelector((state) => (state.timer.pausedTimer == null ? true : false)))
  const [visible, setVisible] = useState(false)
  const pausedTime = useSelector((state) => state.timer.pausedTimer)

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
    if (stateBtn === 1 && paused == true) {
      countTimer = setInterval(() => {
        const oldFirstTime = firstTime
        const totalSecond = parseInt((new Date().getTime() - new Date(oldFirstTime).getTime()) / 1000)
        setTimer(formatTime(totalSecond))
      }, 1000)
    } else if (paused == false) {
      const oldFirstTime = firstTime
      const totalSecond = parseInt((pausedTime - new Date(oldFirstTime).getTime()) / 1000)
      setTimer(formatTime(totalSecond))
      clearInterval(countTimer)
    }

    return () => {
      clearInterval(countTimer)
    }
  }, [stateBtn, firstTime, paused])

  function handlerStartStudy() {
    setTimer('00:00:00')
    dispatch(recordFirstTimer())
  }

  function handlerEndStudy(event) {
    event.stopPropagation()
    dispatch(recordLastTimer())
    setPaused(true)
    setVisible(false)
  }

  function handlerGiveup(event) {
    event.stopPropagation()
    dispatch(recodeGiveup())
    setPaused(true)
    setVisible(false)
  }

  function handlerPausedStudy() {
    setPaused(!paused)
    if (!paused) {
      // 恢复学习
      dispatch(recordResumeTimer())
    } else {
      // 暂停学习
      dispatch(recordPausedTimer())
    }
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
      <div style={{ display: stateBtn === 1 ? 'block' : 'none' }}>
        <div className={styles.text}>正在学习中...</div>
        <div className={styles.time}>{timer}</div>
        <div
          className={styles.countTimeBtn}
          onClick={handlerPausedStudy}
        >
          {paused ? '暂停学习' : '恢复学习'}
        </div>
        <div
          className={styles.countTimeBtn}
          onClick={() => setVisible(true)}
          style={{ position: 'relative', marginTop: '10px' }}
        >
          结束学习
          <div style={{ position: 'absolute', right: '-50px', top: '40px' }}>
            <BubbleBox visible={visible}>
              <div
                style={{
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1f1f1f',
                  border: '1px solid #2d6c6e',
                  height: '40px',
                  width: '100px',
                  opacity: '0.9'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#2e989c',
                    borderRadius: '5px',
                    fontSize: '10px',
                    width: '50px',
                    height: '30px',
                    lineHeight: '30px',
                    margin: '2px'
                  }}
                  onClick={(event) => handlerEndStudy(event)}
                >
                  确定
                </div>
                <div
                  style={{
                    backgroundColor: '#a44733',
                    borderRadius: '5px',
                    fontSize: '10px',
                    width: '50px',
                    height: '30px',
                    lineHeight: '30px',
                    margin: '2px'
                  }}
                  onClick={(event) => handlerGiveup(event)}
                >
                  放弃
                </div>
              </div>
            </BubbleBox>
          </div>
        </div>
      </div>
    </>
  )
}
