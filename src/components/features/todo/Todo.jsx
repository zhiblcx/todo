import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ModifyCard from '../../ModifyCard'
import EditSvg from './EditSvg.jsx'
import DeleteSvg from './DeleteSvg.jsx'
import DeleteBubbleBox from '../../DeleteBubbleBox'
import { maskVisible, completeTask } from './todoSlice'
import './todo.css'

export default function Todo() {
  const tasks = useSelector(state => state.tasks.value)
  const [selectTaskId, setSelectTaskId] = useState(null)
  const [deleteTaskId, setDeleteTaskId] = useState(null)
  const dispatch = useDispatch()

  function handlerDeleteTask(taskId) {
    setDeleteTaskId(taskId)
  }

  console.log(tasks)
  function handlerEditBtn(taskId) {
    setSelectTaskId(taskId)
    dispatch(maskVisible())
  }

  function handlerChange(event, taskID) {
    dispatch(completeTask({ id: taskID, checked: event.target.checked }))
  }

  return (
    <div>
      {tasks.map(task => (
        <div className="card" key={task.id} style={{ marginBottom: '10px', position: 'relative' }}>
          <input type="checkbox" className="checkbox" value="checkbox" id={task.id} onClick={event => handlerChange(event, task.id)} checked={task.checked} />
          <label htmlFor={task.id} className="textTask" style={{ textDecoration: task.checked ? 'line-through' : 'none' }}>
            {task.taskName}
          </label>
          <button className="edit" onClick={() => handlerEditBtn(task.id)}>
            <EditSvg />
          </button>
          <button className="delete" onClick={() => handlerDeleteTask(task.id)}>
            <DeleteSvg />
          </button>
          {selectTaskId == task.id && <ModifyCard selectTaskId={task.id} />}
          {deleteTaskId == task.id && <DeleteBubbleBox deleteTaskId={task.id} visible={true} />}
        </div>
      ))}
    </div>
  )
}
