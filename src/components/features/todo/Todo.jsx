import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ModifyCard from '../../ModifyCard'
import EditSvg from './EditSvg.jsx'
import DeleteSvg from './DeleteSvg.jsx'
import DeleteBubbleBox from '../../DeleteBubbleBox'
import { maskVisible, completeTask } from './todoSlice'
import { getFullTime } from '../../../utils/getFullTime'
import './todo.css'

export default function Todo() {
  const tasks = useSelector(state => state.tasks.value)
  const [selectTaskId, setSelectTaskId] = useState(null)
  const [deleteTaskId, setDeleteTaskId] = useState(null)
  const dispatch = useDispatch()

  function handlerDeleteTask(taskId) {
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
  }

  return (
    <div>
      {tasks.map(task => (
        <div className="card" key={task.id} style={{ marginBottom: '10px', position: 'relative' }}>
          <input type="checkbox" className="checkbox" value="checkbox" id={task.id} onChange={event => handlerChange(event, task.id)} checked={task.checked} />
          <label htmlFor={task.id} className="textTask" style={{ textDecoration: task.checked ? 'line-through' : 'none' }}>
            {task.taskName}
          </label>
          <button className="edit" onClick={() => handlerEditBtn(task.id)}>
            <EditSvg />
          </button>
          <button className="delete" onClick={() => handlerDeleteTask(task.id)}>
            <DeleteSvg />
          </button>
          <span style={{ position: 'absolute', left: '15px', bottom: '5px', fontSize: '5px', width: '140px', textAlign: 'left', color: '#757575' }}>
            {task.startTime}
            <span className={task.endTime && 'endTime'}>{task.endTime && ' - ' + task.endTime}</span>
          </span>
          {selectTaskId == task.id && <ModifyCard selectTaskId={task.id} />}
          {deleteTaskId == task.id && <DeleteBubbleBox deleteTaskId={task.id} visible={true} />}
        </div>
      ))}
    </div>
  )
}
