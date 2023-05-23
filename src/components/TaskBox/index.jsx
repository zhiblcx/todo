import './index.css'

function TaskBox(props) {
  const { taskName, label, focusInput, blurInput, customStyle, IncreaseTask } = props

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      if (IncreaseTask) {
        // 检查 IncreaseTask 是否存在
        IncreaseTask() // 调用传入的 IncreaseTask 函数
      }
      taskName.current.blur() // 触发输入框的失焦事件
      taskName.current.focus()
    }
  }

  return (
    <div className="taskBox">
      <input
        className="text"
        ref={taskName}
        onFocus={focusInput}
        onBlur={blurInput}
        onKeyUp={(e) => handleKeyUp(e)}
      />
      <label
        htmlFor="task"
        ref={label}
        style={customStyle}
      />
    </div>
  )
}

export default TaskBox
