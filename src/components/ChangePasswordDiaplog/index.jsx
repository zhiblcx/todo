import { useRef, useState, useEffect } from 'react'

import Mask from '@/components/Mask'
import Visible from '@/components/Svg/Visible.jsx'
import Hidden from '@/components/Svg/Hidden.jsx'
import styles from '../ChangeEmailDialog/ChangeEmailDialog.module.css'

export default function ChangePasswordDialog(props) {
  const password = useRef(null)
  const confirmPassword = useRef(null)
  const errorMsg = useRef(null)
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassowrd] = useState(false)
  const [visible, setVisible] = useState(props.visible)
  const [passwordAnimation, setPasswordAnimation] = useState(styles.emailEnter)
  useEffect(() => {
    setVisible(props.visible)
  })
  function checkPassword(event) {
    event.preventDefault()
    if (password.current.value != confirmPassword.current.value) {
      errorMsg.current.textContent = '两次密码不一样'
      errorMsg.current.style.display = 'block'
    }
  }
  function passwordRule() {
    const pattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/
    if (password.current.value === '') {
      errorMsg.current.style.display = 'none'
    } else if (pattern.test(password.current.value)) {
      errorMsg.current.style.display = 'none'
    } else if (password.current.value.length < 6 || password.current.value.length > 16) {
      errorMsg.current.textContent = '密码在6个字符和16个字符以内'
      errorMsg.current.style.display = 'block'
    } else {
      errorMsg.current.textContent = '密码必须包含字符和数字'
      errorMsg.current.style.display = 'block'
    }
  }

  function closeDialog() {
    setPasswordAnimation(styles.emailExit)
    setTimeout(() => {
      setVisible(false)
      props.onClose && props.onClose()
      setPasswordAnimation(styles.emailEnter)
    }, 200)
  }

  function confirm() {
    closeDialog()
    console.log('确认')
  }

  return (
    <Mask
      visible={visible}
      onClose={closeDialog}
    >
      <form
        onSubmit={checkPassword}
        className={passwordAnimation}
      >
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '5px', marginTop: '150px' }}>
          <div style={{ marginBottom: '10px', color: '#fefefe' }}>新密码</div>
          <div style={{ display: 'flex' }}>
            <input
              type={visiblePassword ? 'password' : 'text'}
              style={{
                background: '#fefefe',
                color: '#1a1a1a',
                borderRadius: '3px',
                border: 'none',
                padding: '5px',
                outline: 'none',
                textAlign: 'left',
                marginRight: '2px'
              }}
              ref={password}
              autoComplete="new-password"
              onInput={passwordRule}
            />
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? <Visible /> : <Hidden />}
            </span>
          </div>
          <div style={{ marginBottom: '10px', marginTop: '10px', color: '#fefefe' }}>确认密码</div>
          <div style={{ display: 'flex' }}>
            <input
              type={visibleConfirmPassword ? 'password' : 'text'}
              style={{
                background: '#fefefe',
                color: '#1a1a1a',
                borderRadius: '3px',
                border: 'none',
                padding: '5px',
                outline: 'none',
                textAlign: 'left',
                marginRight: '2px'
              }}
              autoComplete="new-password"
              ref={confirmPassword}
            />
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => setVisibleConfirmPassowrd(!visibleConfirmPassword)}
            >
              {visibleConfirmPassword ? <Visible /> : <Hidden />}
            </span>
          </div>
          <span
            style={{ color: '#d81e06', display: 'none', fontSize: '10px', marginTop: '5px' }}
            ref={errorMsg}
          >
            两次密码不一样
          </span>
          <div style={{ marginTop: '10px' }}>
            <button
              type="submit"
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
              onClick={closeDialog}
            >
              取消
            </button>
          </div>
        </div>
      </form>
    </Mask>
  )
}
