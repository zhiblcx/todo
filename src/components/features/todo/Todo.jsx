import { useSelector, useDispatch } from 'react-redux'
import ModifyCard from '../../ModifyCard'
import EditSvg from './EditSvg.jsx'
import DeleteSvg from './DeleteSvg.jsx'
import { deleteTask, maskVisible } from './todoSlice'
import './todo.css'

export default function Todo() {
  const tasks = useSelector(state => state.tasks.value)

  const dispatch = useDispatch()

  function handlerDeleteTask(taskID) {
    dispatch(deleteTask(taskID))
  }

  function handlerEditBtn() {
    dispatch(maskVisible())
  }

  return (
    <div>
      {tasks.map(task => (
        <div className="card" key={task.id} style={{ marginBottom: '10px' }}>
          <input type="checkbox" className="checkbox" value="checkbox" id={task.id} />
          <label htmlFor={task.id} className="textTask">
            {task.taskName}
          </label>
          <button className="edit" onClick={handlerEditBtn}>
            <EditSvg />
          </button>
          <button className="delete" onClick={() => handlerDeleteTask(task.id)}>
            <DeleteSvg />
          </button>
        </div>
      ))}
      <ModifyCard />
    </div>
  )
}
