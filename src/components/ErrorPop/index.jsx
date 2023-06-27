import { useState, useEffect } from 'react'

import Mask from '@/components/Mask'
import Error from '@/components/Svg/Error'
import styles from './ErrorPop.module.css'

export default function ErrorPop(props) {
  const [messageAnimation, setMessageAnimation] = useState(styles.messageEnter)
  const [visible, setVisible] = useState(props.visible)
  useEffect(() => {
    setVisible(props.visible)
  })
  return (
    <Mask
      visible={visible}
      onClose={() => {
        setMessageAnimation(styles.messageExit)
        setTimeout(() => {
          setVisible(false)
          props.onClose && props.onClose()
          setMessageAnimation(styles.messageEnter)
        }, 200)
      }}
    >
      <div className={`${styles.error} ${messageAnimation}`}>
        <Error />
        <div style={{ marginLeft: '5px' }}>{props.message}</div>
      </div>
    </Mask>
  )
}
