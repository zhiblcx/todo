import { useState } from 'react'

import Mask from '@/components/Mask'
import Success from '@/components/Svg/Success'
import styles from './ErrorPop.module.css'

export default function ErrorPop(props) {
  const [messageAnimation, setMessageAnimation] = useState(styles.messageAnimation)
  const [visible, setVisible] = useState(true)
  return (
    <Mask
      visible={visible}
      onClose={() => {
        setMessageAnimation(styles.messageExit)
        setTimeout(() => {
          setVisible(false)
        }, 200)
      }}
    >
      <div className={`${styles.error} ${messageAnimation}`}>
        <Success />
        <div style={{ marginLeft: '5px' }}>{props.message}</div>
      </div>
    </Mask>
  )
}
