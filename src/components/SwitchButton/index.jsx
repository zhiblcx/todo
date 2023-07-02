import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { alarmState } from '@/components/features/todo/todoSlice'

import styles from './SwitchButton.module.css'

export default function SwitchButton(props) {
  const offSwitch = useRef(null)
  const [state, setState] = useState(props.btnState || 0)
  const dispatch = useDispatch()
  return (
    <>
      <div
        className={
          state
            ? `${styles.target} ${styles.on} ${styles.switchBtnRight}`
            : `${styles.target} ${styles.off} ${styles.switchBtnLeft}`
        }
        ref={offSwitch}
        onClick={() => {
          setState(!state)
          dispatch(alarmState({ id: props.id, alarmState: !props.btnState }))
        }}
      >
        <div
          className={
            state ? `${styles.switchRight} ${styles.switchTextLeft}` : `${styles.switchLeft} ${styles.switchTextRight}`
          }
          style={{ userSelect: 'none', fontSize: '15px' }}
        >
          {state ? 'on' : 'off'}
        </div>
      </div>
    </>
  )
}
