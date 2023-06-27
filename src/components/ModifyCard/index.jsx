import { useRef } from 'react'

import Mask from '../Mask'
import TaskBox from '../TaskBox'
import useModifyCardEffect from '@/hook/useModifyCardEffect.js'
import useEditNameEffect from '@/hook/useEditNameEffect'
import './index.css'

export default function ModifyCard(props) {
  const label = useRef(null)
  const taskName = useRef(null)

  if (props.selectTaskId) {
    useModifyCardEffect({ ...props, taskName })
  }

  if (props.userName) {
    useEditNameEffect({ ...props, userName: taskName })
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
    <Mask
      onClose={() => props.onClose()}
      visible={props.visible}
    >
      <div className="modifyBox">
        <TaskBox
          customStyle={props.customStyle}
          taskName={taskName}
          label={label}
          focusInput={focusInput}
          blurInput={blurInput}
        />
      </div>
    </Mask>
  )
}
