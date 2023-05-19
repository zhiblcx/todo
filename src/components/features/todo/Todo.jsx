import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ModifyCard from '../../ModifyCard'
import EditSvg from './EditSvg.jsx'
import DeleteSvg from './DeleteSvg.jsx'
import DeleteBubbleBox from '../../DeleteBubbleBox'
import { maskVisible, completeTask, sortTask } from './todoSlice'
import { getFullTime } from '../../../utils/getFullTime'
import './todo.css'

export default function Todo() {
  const taskTotal = useSelector((state) => state.tasks.value)

  const [tasks, setTasks] = useState(taskTotal)
  const [selectTaskId, setSelectTaskId] = useState(null)
  const [deleteTaskId, setDeleteTaskId] = useState(null)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setTasks(taskTotal)
  }, [taskTotal])

  function handlerDeleteTask(taskId) {
    setDeleteVisible(true)
    setDeleteTaskId(taskId)
  }

  function handlerEditBtn(taskId) {
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
    setTasks(taskTotal)
  }

  function handlerDone() {
    setTasks(taskTotal.filter((task) => task.checked == true))
  }

  function handlerUndone() {
    setTasks(taskTotal.filter((task) => task.checked != true))
  }

  return (
    <div>
      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
        <button
          className="taskBtnState"
          onClick={handlerTotal}
        >
          全部
        </button>
        <button
          className="taskBtnState"
          onClick={handlerDone}
        >
          已完成
        </button>
        <button
          className="taskBtnState"
          onClick={handlerUndone}
        >
          未完成
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
            style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
          >
            {task.taskName}
          </label>
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
              bottom: '5px',
              fontSize: '5px',
              width: '140px',
              textAlign: 'left',
              color: '#757575'
            }}
          >
            {task.startTime}
            <span className={task.endTime ? 'endTimeEnter' : ''}>{task.endTime && ' - ' + task.endTime}</span>
          </span>
          {selectTaskId == task.id && <ModifyCard selectTaskId={task.id} />}
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
