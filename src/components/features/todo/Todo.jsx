import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ModifyCard from '../../ModifyCard'
import EditSvg from '../../Svg/EditSvg'
import DeleteSvg from '../../Svg/DeleteSvg'
import Alarmed from '@/components/Svg/Alarmed'
import Alarm from '@/components/Svg/Alarm'
import MarkToped from '@/components/Svg/MarkToped.jsx'
import MarkTop from '@/components/Svg/MarkTop'

import DeleteBubbleBox from '../../DeleteBubbleBox'
import { maskVisible, completeTask, sortTask, markTask, alarmTask } from './todoSlice'
import { getFullTime } from '@/utils/getFullTime'
import './todo.css'

export default function Todo() {
  const taskTotal = useSelector((state) => state.tasks.value)

  const [tasks, setTasks] = useState(taskTotal)
  const [selectTaskId, setSelectTaskId] = useState(null)
  const [deleteTaskId, setDeleteTaskId] = useState(null)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [styleBtn, setStyleBtn] = useState(0)
  const [visible, setVisible] = useState(false)

  const navigate = useNavigate()

  const customStyle = {
    '--after-content': "'update'"
  }

  const dispatch = useDispatch()

  useEffect(() => {
    setTasks(taskTotal)
  }, [taskTotal])

  function handlerDeleteTask(taskId) {
    setDeleteVisible(true)
    setDeleteTaskId(taskId)
  }

  function handlerEditBtn(taskId) {
    setVisible(true)
    setSelectTaskId(taskId)
    dispatch(maskVisible())
  }

  function handlerChange(event, taskID) {
    if (event.target.checked == true) {
      dispatch(completeTask({ id: taskID, checked: event.target.checked, endTime: getFullTime() }))
    } else {
      dispatch(completeTask({ id: taskID, checked: event.target.checked, endTime: '' }))
    }
    window.setTimeout(() => {
      dispatch(sortTask())
    }, 500)
  }

  function onClose() {
    setDeleteVisible(false)
  }

  function handlerTotal() {
    setStyleBtn(0)
    setTasks(taskTotal)
  }

  function handlerDone() {
    setStyleBtn(1)
    setTasks(taskTotal.filter((task) => task.checked == true))
  }

  function handlerUndone() {
    setStyleBtn(2)
    setTasks(taskTotal.filter((task) => task.checked != true))
  }

  return (
    <div>
      <div
        style={{
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <button
          className="taskBtnState"
          onClick={handlerTotal}
          style={{ backgroundColor: styleBtn == 0 ? '#2d6c6e' : '', width: '64px' }}
        >
          全部({taskTotal.length})
        </button>
        <button
          className="taskBtnState"
          onClick={handlerDone}
          style={{ backgroundColor: styleBtn == 1 ? '#2d6c6e' : '', width: '70px' }}
        >
          已完成({taskTotal.reduce((sum, task) => (task.checked == true ? (sum += 1) : sum), 0)})
        </button>
        <button
          className="taskBtnState"
          onClick={handlerUndone}
          style={{ backgroundColor: styleBtn == 2 ? '#2d6c6e' : '', width: '70px' }}
        >
          未完成({taskTotal.reduce((sum, task) => (task.checked != true ? (sum += 1) : sum), 0)})
        </button>
      </div>
      {tasks.map((task) => (
        <div
          className="card"
          key={task.id}
          style={{ marginBottom: '10px', position: 'relative' }}
        >
          <input
            type="checkbox"
            className="checkbox"
            value="checkbox"
            id={task.id}
            onChange={(event) => handlerChange(event, task.id)}
            checked={task.checked}
          />
          <label
            htmlFor={task.id}
            className="textTask"
            style={{
              textDecorationLine: task.checked ? 'line-through' : 'none',
              textDecorationColor: '#c55138',
              textDecorationStyle: 'solid'
            }}
          >
            {task.taskName}
          </label>
          {task.mark ? (
            <div
              style={{ position: 'absolute', right: '58px', top: '3px', cursor: 'pointer' }}
              onClick={() => {
                dispatch(markTask({ id: task.id, mark: 0 }))
                window.setTimeout(() => {
                  dispatch(sortTask())
                }, 500)
              }}
            >
              <MarkToped />
            </div>
          ) : (
            <div
              style={{ position: 'absolute', right: '58px', top: '3px', cursor: 'pointer' }}
              onClick={() => {
                dispatch(markTask({ id: task.id, mark: 1 }))
                window.setTimeout(() => {
                  dispatch(sortTask())
                }, 500)
              }}
            >
              <MarkTop />
            </div>
          )}

          {task.alarm ? (
            <div
              style={{ position: 'absolute', right: '15px', top: '3px', cursor: 'pointer' }}
              onClick={() => {
                dispatch(alarmTask({ alarm: 0, id: task.id }))
              }}
            >
              <Alarmed />
            </div>
          ) : (
            <div
              style={{ position: 'absolute', right: '15px', top: '3px', cursor: 'pointer' }}
              onClick={() => {
                dispatch(alarmTask({ alarm: 1, id: task.id }))
                navigate('/taskremain')
              }}
            >
              <Alarm />
            </div>
          )}

          <button
            className="edit"
            onClick={() => handlerEditBtn(task.id)}
          >
            <EditSvg />
          </button>
          <button
            className="delete"
            onClick={() => handlerDeleteTask(task.id)}
          >
            <DeleteSvg />
          </button>
          <span
            style={{
              position: 'absolute',
              left: '15px',
              bottom: '10px',
              fontSize: '5px',
              width: '140px',
              textAlign: 'left',
              color: '#757575'
            }}
          >
            {task.startTime}
            <span className={task.endTime ? 'endTimeEnter' : ''}>{task.endTime && ' - ' + task.endTime}</span>
          </span>
          {selectTaskId == task.id && (
            <ModifyCard
              selectTaskId={task.id}
              visible={visible}
              customStyle={customStyle}
              onClose={() => {
                setVisible(false), dispatch(maskVisible())
              }}
            />
          )}
          {deleteTaskId == task.id && (
            <DeleteBubbleBox
              deleteTaskId={task.id}
              visible={deleteVisible}
              onClose={onClose}
            />
          )}
        </div>
      ))}
    </div>
  )
}
