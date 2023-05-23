import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './index.css'

export default function RecordTable() {
  const [styleBtn, setStyleBtn] = useState(0)
  const [tasks] = useState(useSelector((state) => state.tasks.value))
  const table = useRef(null)

  const dayTimer = useSelector((state) =>
    state.timer.dayTime.map((content) => {
      const count = tasks.filter((task) => content.date === task.endTime).length
      return { ...content, count }
    })
  )

  const weekTimer = useSelector((state) =>
    state.timer.weekTime.map((content) => {
      const count = tasks.filter((task) => content.date <= task.endTime && content.date >= task.startTime).length
      const date = content.weekStartTime + '-' + content.weekEndTime
      return { ...content, count, date }
    })
  )

  const monthTimer = useSelector((state) =>
    state.timer.monthTime.map((content) => {
      const count = tasks.filter((task) => content.date == task.endTime).length
      return { ...content, count }
    })
  )
  const [timer, setTimer] = useState(dayTimer)

  useEffect(() => {
    table.current.className = 'tableStyle'
    window.setTimeout(() => {
      table.current.className = 'tableStyle stableEnter'
    }, 10)
  }, [timer])

  function handlerDayBtn() {
    setStyleBtn(0)
    setTimer(dayTimer)
  }

  function handlerWeekBtn() {
    setStyleBtn(1)
    setTimer(weekTimer)
  }

  function handlerMonthBtn() {
    setStyleBtn(2)
    setTimer(monthTimer)
  }

  return (
    <div>
      <div style={{ marginTop: '20px', marginBottom: '15px' }}>
        <button
          className="taskBtnState"
          onClick={handlerDayBtn}
          style={{ backgroundColor: styleBtn == 0 ? '#2d6c6e' : '' }}
        >
          日报
        </button>
        <button
          className="taskBtnState"
          onClick={handlerWeekBtn}
          style={{ backgroundColor: styleBtn == 1 ? '#2d6c6e' : '' }}
        >
          周报
        </button>
        <button
          className="taskBtnState"
          onClick={handlerMonthBtn}
          style={{ backgroundColor: styleBtn == 2 ? '#2d6c6e' : '' }}
        >
          月报
        </button>
      </div>
      <table
        className="tableStyle"
        ref={table}
      >
        <thead>
          <tr>
            <th>日期</th>
            <th>学习时长</th>
            <th>完成任务个数</th>
          </tr>
        </thead>
        <tbody>
          {timer.map((content, index) => (
            <tr key={index}>
              <td>{content.date}</td>
              <td>{content.time}</td>
              <td>{content.count}</td>
            </tr>
          ))}
          {timer.length > 7 ? (
            <tr>
              <td
                colSpan="3"
                style={{ lineHeight: '20px' }}
              >
                ·····
              </td>
            </tr>
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
