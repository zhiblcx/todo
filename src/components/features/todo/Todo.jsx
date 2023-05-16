import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ModifyCard from '../../ModifyCard'
import EditSvg from './EditSvg.jsx'
import DeleteSvg from './DeleteSvg.jsx'
import DeleteBubbleBox from '../../DeleteBubbleBox'
import { deleteTask, maskVisible } from './todoSlice'
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

  return (
    <div>
      {tasks.map(task => (
        <div className="card" key={task.id} style={{ marginBottom: '10px', position: 'relative' }}>
          <input type="checkbox" className="checkbox" value="checkbox" id={task.id} />
          <label htmlFor={task.id} className="textTask">
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
