import { useState, useEffect } from 'react'
import { addDays, format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { alarmTime } from '@/components/features/todo/todoSlice'
import DatePicker from 'react-datepicker'

import SwitchButton from '@/components/SwitchButton'

import 'react-datepicker/dist/react-datepicker.css'
export default function TaskRemain() {
  const taskTotal = useSelector((state) => state.tasks.value)
  const [taskList, setTaskList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setTaskList(taskTotal.filter((task) => task.alarm))
  }, [taskTotal])

  return (
    <>
      <div style={{ color: 'white', marginTop: '20px', fontSize: '30px' }}>Task Remain</div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '420px', margin: '10px auto', border: 'none' }}>
          <thead>
            <tr style={{ color: 'white' }}>
              <th>任务名</th>
              <th>提醒时间</th>
              <th>提醒状态</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) =>
              task.alarm ? (
                <tr key={task.id}>
                  <td>
                    <div
                      style={{
                        background: '#2aa69a',
                        borderRadius: '2px',
                        marginRight: '10px',
                        border: '1px solid #4f4f4f',
                        fontSize: '13px',
                        height: '20px',
                        lineHeight: '20px',
                        width: '140px',
                        overflow: 'hidden',
                        whileSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        margin: '0 auto'
                      }}
                    >
                      {task.taskName}
                    </div>
                  </td>
                  <td>
                    <DatePicker
                      selected={task.alarmTime ? new Date(task.alarmTime) : null}
                      onChange={(date) => {
                        const newTaskList = taskList.map((task) => {
                          if (task.id === task.id) {
                            return {
                              ...task,
                              alarmTime: format(date, 'yyyy-MM-dd HH:mm')
                            }
                          } else {
                            return task
                          }
                        })
                        setTaskList(newTaskList)
                      }}
                      onSelect={(date) => {
                        dispatch(alarmTime({ alarmTime: format(date, 'yyyy-MM-dd HH:mm'), id: task.id }))
                      }}
                      dateFormat="yyyy/MM/dd HH:mm"
                      highlightDates={[addDays(new Date(), 0)]}
                      withPortal
                      showTimeInput
                    />
                  </td>
                  <td>
                    <div style={{ marginTop: '5px' }}>
                      <SwitchButton
                        btnState={task.alarmState}
                        id={task.id}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                ''
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
