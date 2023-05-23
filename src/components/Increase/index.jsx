import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getFullTime } from '../../utils/getFullTime'
import { addTask } from '../features/todo/todoSlice.js'
import TaskBox from '../TaskBox'
import './index.css'

function Increase() {
  const dispatch = useDispatch()

  const label = useRef(null)
  const taskName = useRef(null)
  const root = useRef(document.documentElement)

  const elem = root.current
  const styles = getComputedStyle(elem)
  const varValue = styles
    .getPropertyValue('--addTask--content')
    .slice(1, styles.getPropertyValue('--addTask--content').length - 1)
  const customStyle = {
    '--after-content': `"${varValue}"`
  }
  useEffect(() => {
    taskName.current.setAttribute('placeholder', varValue)
  }, [])

  function IncreaseTask() {
    if (taskName.current.value.trim() == '') {
      return
    }
    dispatch(addTask({ taskName: taskName.current.value, startTime: getFullTime() }))
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
        <TaskBox
          taskName={taskName}
          label={label}
          focusInput={focusInput}
          blurInput={blurInput}
          customStyle={customStyle}
          IncreaseTask={IncreaseTask}
        />
        <button
          className="determine"
          onClick={IncreaseTask}
        >
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
          >
            <path
              d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
              fill="#081e1b"
            ></path>
          </svg>
        </button>
      </div>
      <div className="line" />
    </div>
  )
}

export default Increase
