import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editTask } from '../features/todo/todoSlice'
import Mask from '../Mask'
import TaskBox from '../TaskBox'
import './index.css'

export default function ModifyCard(props) {
  const inputFocus = useSelector((state) => state.tasks.visible)
  const tasks = useSelector((state) => state.tasks.value)
  const dispatch = useDispatch()

  const label = useRef(null)
  const taskName = useRef(null)
  const root = useRef(document.documentElement)

  const elem = root.current
  const styles = getComputedStyle(elem)
  const varValue = styles
    .getPropertyValue('--editTask--content')
    .slice(1, styles.getPropertyValue('--editTask--content').length - 1)
  const customStyle = {
    '--after-content': `"${varValue}"`
  }

  useEffect(() => {
    taskName.current.setAttribute('placeholder', varValue)
    taskName.current.focus()
    if (inputFocus == true) {
      taskName.current.focus()
      const currentTask = tasks.find((task) => task.id == props.selectTaskId)
      taskName.current.value = currentTask.taskName
    } else {
      if (taskName.current.value.trim() == '') {
        return
      }
      dispatch(editTask({ id: props.selectTaskId, taskName: taskName.current.value }))
    }
  }, [inputFocus])

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
    <Mask>
      <div className="modifyBox">
        <TaskBox
          customStyle={customStyle}
          taskName={taskName}
          label={label}
          focusInput={focusInput}
          blurInput={blurInput}
        />
      </div>
    </Mask>
  )
}
