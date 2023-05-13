import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/todo/todoSlice.js'
import './index.css'

function Increase() {
  const dispatch = useDispatch()

  const label = useRef(null)
  const taskName = useRef(null)

  function IncreaseTask() {
    if (taskName.current.value.trim() == '') {
      return
    }
    dispatch(addTask(taskName.current.value))
    taskName.current.value = ''
  }

  function focusInput(event) {
    label.current.className = 'label'
    if (event.target.value.trim() == '') {
      event.target.value = ' '
    }
  }

  function blurInput(event) {
    label.current.className = 'labelExit'
    if (event.target.value.trim() == '') {
      window.setTimeout(() => {
        event.target.value = ''
      }, 300)
    }
  }
  return (
    <div>
      <div className="title">My Task List</div>
      <div className="box">
        <div className="taskBox">
          <input className="text" ref={taskName} placeholder="ENTER TASK" onClick={() => focusInput(event)} onBlur={() => blurInput(event)}></input>
          <label htmlFor="task" ref={label}></label>
        </div>
        <button className="determine" onClick={IncreaseTask}>
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#081e1b"></path>
          </svg>
        </button>
      </div>
      <div className="line"></div>
    </div>
  )
}

export default Increase
