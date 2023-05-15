import './index.css'

function TaskBox(props) {
  const { taskName, label, focusInput, blurInput } = props

  return (
    <div className="taskBox">
      <input className="text" ref={taskName} onClick={focusInput} onBlur={blurInput} />
      <label htmlFor="task" ref={label} />
    </div>
  )
}

export default TaskBox
