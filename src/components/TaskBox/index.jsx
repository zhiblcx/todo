import './index.css'

function TaskBox(props) {
  const { taskName, label, focusInput, blurInput, customStyle } = props

  return (
    <div className="taskBox">
      <input className="text" ref={taskName} onFocus={focusInput} onBlur={blurInput} />
      <label htmlFor="task" ref={label} style={customStyle} />
    </div>
  )
}

export default TaskBox
