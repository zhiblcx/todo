import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './index.css'

export default function RecordTable() {
  const [tasks] = useState(useSelector((state) => state.tasks.value))

  const dayTimer = useSelector((state) =>
    state.timer.dayTime.map((content) => {
      const count = tasks.filter((task) => content.date === task.endTime).length
      return { ...content, count }
    })
  )

  const [timer, setTimer] = useState(dayTimer)

  const [data, setData] = useState(
    timer
      .slice(0, 7)
      .map((time) => ({
        studyTime: (
          parseInt(
            parseInt(time.time.split(':')[0] * 60 * 60) +
              parseInt(time.time.split(':')[1] * 60) +
              parseInt(time.time.split(':')[2])
          ) /
          60 /
          60
        ).toFixed(2),
        completeCount: time.count,
        name:
          time.date.length > 15
            ? time.date.split('-')[0].split('/')[1] +
              '/' +
              time.date.split('-')[0].split('/')[2] +
              '-' +
              time.date.split('-')[1].split('/')[1] +
              '/' +
              time.date.split('-')[1].split('/')[2]
            : time.date
      }))
      .reverse()
  )

  const { maxStudyTime: maxStudy, maxCompleteCount: maxComplete } = getMaxValue(data)

  const [styleBtn, setStyleBtn] = useState(0)
  const [maxStudyTime, setMaxStudyTime] = useState(Math.ceil(maxStudy))
  const [maxCompleteCount, setMaxCompleteCount] = useState(maxComplete == 0 ? 1 : maxComplete)

  const table = useRef(null)
  const chart = useRef(null)

  const weekTimer = useSelector((state) =>
    state.timer.weekTime.map((content) => {
      const count = tasks.filter((task) => {
        if (task.endTime) {
          return (
            new Date(task.endTime).getTime() >= new Date(content.weekStartTime).getTime() &&
            new Date(task.endTime).getTime() <= new Date(content.weekEndTime).getTime()
          )
        }
      }).length
      const date = content.weekStartTime + '-' + content.weekEndTime
      return { ...content, count, date }
    })
  )

  const monthTimer = useSelector((state) =>
    state.timer.monthTime.map((content) => {
      const count = tasks.filter((task) => {
        if (task.endTime) {
          return content.date == task.endTime.split('/')[0] + '/' + task.endTime.split('/')[1]
        }
      }).length
      return { ...content, count }
    })
  )

  useEffect(() => {
    table.current.className = 'tableStyle'
    chart.current.className = 'chart'

    window.setTimeout(() => {
      table.current.className = 'tableStyle stableEnter'
      chart.current.className = 'chart stableEnter'
    }, 10)

    const daqq = timer
      .slice(0, 7)
      .map((time) => ({
        studyTime: (
          parseInt(
            parseInt(time.time.split(':')[0] * 60 * 60) +
              parseInt(time.time.split(':')[1] * 60) +
              parseInt(time.time.split(':')[2])
          ) /
          60 /
          60
        ).toFixed(2),
        completeCount: time.count,
        name:
          time.date.length > 15
            ? time.date.split('-')[0].split('/')[1] +
              '/' +
              time.date.split('-')[0].split('/')[2] +
              '-' +
              time.date.split('-')[1].split('/')[1] +
              '/' +
              time.date.split('-')[1].split('/')[2]
            : time.date
      }))
      .reverse()
    setData(daqq)
    const { maxStudyTime: maxStudy, maxCompleteCount: maxComplete } = getMaxValue(daqq)
    setMaxStudyTime(Math.ceil(maxStudy))
    setMaxCompleteCount(maxComplete == 0 ? 1 : maxComplete)
  }, [timer])

  function handlerDayBtn() {
    setStyleBtn(0)
    setTimer(dayTimer)
  }

  function handlerWeekBtn() {
    setStyleBtn(1)
    if (weekTimer.some((timer) => timer.date.split('-')[0] == 'undefined')) {
      return
    }
    setTimer(weekTimer)
  }

  function handlerMonthBtn() {
    setStyleBtn(2)
    setTimer(monthTimer)
  }

  function getMaxValue(data) {
    const maxStudyTime = Math.max(...data.map((item) => item.studyTime))
    const maxCompleteCount = Math.max(...data.map((item) => item.completeCount))
    return { maxStudyTime, maxCompleteCount }
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

      <div
        style={{ display: data.length <= 0 ? 'block' : 'none', color: 'white', fontSize: '30px', marginTop: '80px' }}
      >
        还没有学习记录，要加油哦！！！
      </div>
      <table
        className="tableStyle"
        ref={table}
        style={{ display: data.length <= 0 ? 'none' : '' }}
      >
        <thead>
          <tr>
            <th>日期</th>
            <th>学习时长</th>
            <th>完成任务个数</th>
          </tr>
        </thead>
        <tbody>
          {timer.slice(0, 7).map((content, index) => (
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
      <div
        ref={chart}
        style={{ display: data.length <= 0 ? 'none' : 'block' }}
      >
        <LineChart
          style={{ margin: '20px auto' }}
          width={800}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            dataKey="studyTime"
            yAxisId="left"
            scale="auto"
            domain={[0, maxStudyTime]}
          />
          <YAxis
            dataKey="completeCount"
            yAxisId="right"
            orientation="right"
            allowDecimals={false}
            domain={[0, maxCompleteCount]}
          />
          <Tooltip
            formatter={(value, key) => {
              if (key == '学习时长') {
                return value + '小时'
              } else {
                return value + '个'
              }
            }}
          />
          <Legend />
          <Line
            type="monotone"
            yAxisId="left"
            dataKey="studyTime"
            stroke="#8884d8"
            name="学习时长"
          />
          <Line
            type="monotone"
            yAxisId="right"
            dataKey="completeCount"
            stroke="#82ca9d"
            name="任务完成个数"
          />
        </LineChart>
      </div>
    </div>
  )
}
