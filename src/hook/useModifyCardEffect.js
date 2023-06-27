import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editTask } from '@/components/features/todo/todoSlice'

function useModifyCardEffect(props) {
  const { taskName } = props
  const inputFocus = useSelector((state) => state.tasks.visible)
  const tasks = useSelector((state) => state.tasks.value)
  const dispatch = useDispatch()

  useEffect(() => {
    taskName.current.setAttribute('placeholder', 'update Task')
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
}

export default useModifyCardEffect
