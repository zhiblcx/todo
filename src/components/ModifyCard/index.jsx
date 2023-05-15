import { useEffect, useRef } from 'react'
import Mask from '../Mask'
import TaskBox from '../TaskBox'
import './index.css'

export default function ModifyCard(props) {
  const label = useRef(null)
  const taskName = useRef(null)
  const root = useRef(document.documentElement)

  useEffect(() => {
    const elem = root.current
    const styles = getComputedStyle(elem)
    const varValue = styles.getPropertyValue('--editTask--content').slice(1, styles.getPropertyValue('--editTask--content').length - 1)
    taskName.current.setAttribute('placeholder', varValue)
  }, [])

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
        <TaskBox taskName={taskName} label={label} focusInput={focusInput} blurInput={blurInput} />
      </div>
    </Mask>
  )
}
