import { useState, useRef, useEffect } from 'react'

import Mask from '@/components/Mask'
import styles from './ChangeEmailDialog.module.css'

export default function ChangeEmailDialog(props) {
  const email = useRef(null)
  const errorMsg = useRef(null)
  const [visible, setVisible] = useState(props.visible)
  const [emailAnimation, setEmailAnimation] = useState(styles.emailEnter)
  useEffect(() => {
    setVisible(props.visible)
  })
  function checkEmail() {
    const pattern = /[a-z0-9._%+-]+@qq\.com$/
    if (email.current.value === '') {
      errorMsg.current.style.display = 'none'
    } else if (pattern.test(email.current.value)) {
      errorMsg.current.style.display = 'none'
    } else {
      errorMsg.current.style.display = 'block'
    }
  }

  function handlerCode() {
    console.log('发送验证码')
  }
  function confirm() {
    console.log('确认')
    closeDialog()
  }
  function cancel() {
    closeDialog()
  }

  function closeDialog() {
    setEmailAnimation(styles.emailExit)
    setTimeout(() => {
      setVisible(false)
      props.onClose && props.onClose()
      setEmailAnimation(styles.emailEnter)
    }, 200)
  }
  return (
    <Mask
      visible={visible}
      onClose={closeDialog}
    >
      <div
        className={emailAnimation}
        style={{ background: '#1a1a1a', padding: '20px', borderRadius: '5px', marginTop: '120px' }}
      >
        <div style={{ marginBottom: '10px', color: '#fefefe' }}>请输入你新的邮箱</div>
        <input
          type="email"
          style={{
            background: '#fefefe',
            color: '#1a1a1a',
            borderRadius: '3px',
            border: 'none',
            padding: '5px',
            outline: 'none',
            textAlign: 'left'
          }}
          ref={email}
          onInput={checkEmail}
        />
        <span
          ref={errorMsg}
          style={{ color: '#d81e06', display: 'none', fontSize: '10px', marginTop: '5px' }}
        >
          请输入正确的邮箱地址
        </span>
        <div style={{ marginTop: '10px' }}>
          <button
            style={{
              background: '#2aa69a',
              color: '#fefefe',
              border: 'none',
              borderRadius: '3px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
            onClick={handlerCode}
          >
            发送验证码
          </button>
        </div>
        <div style={{ marginBottom: '10px', marginTop: '10px', color: '#fefefe' }}>请输入验证码</div>
        <input
          type="text"
          style={{
            background: '#fefefe',
            color: '#1a1a1a',
            borderRadius: '3px',
            border: 'none',
            padding: '5px',
            outline: 'none',
            textAlign: 'left'
          }}
        />
        <div style={{ marginTop: '10px' }}>
          <button
            style={{
              background: '#2aa69a',
              color: '#fefefe',
              border: 'none',
              borderRadius: '3px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
            onClick={confirm}
          >
            确定
          </button>
          <button
            style={{
              background: '#fefefe',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '3px',
              padding: '5px 10px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
            onClick={cancel}
          >
            取消
          </button>
        </div>
      </div>
    </Mask>
  )
}
