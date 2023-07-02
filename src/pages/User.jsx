import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Integral from '@/components/Svg/Integral.jsx'
import NoLike from '@/components/Svg/NoLike.jsx'
import ErrorPop from '@/components/ErrorPop'
import ModifyCard from '@/components/ModifyCard/'
import { maskVisible, editMessage } from '@/components/features/user/userSlice'
import ChangeEmailDialog from '@/components/ChangeEmailDialog'
import ChangePasswordDiaplog from '@/components/ChangePasswordDiaplog'
import ExitBubbleBox from '@/components/ExitBubbleBox'

export default function User() {
  const originalName = useSelector((state) => state.userInfo.name)
  const originalEmail = useSelector((state) => state.userInfo.email)
  const originalMessage = useSelector((state) => state.userInfo.message)
  const [message, setMessage] = useState(originalMessage)
  const [email, setEmail] = useState(originalEmail)
  const [userName, setUserName] = useState(originalName)
  const [isEditName, setIsEditName] = useState(false)
  const [isEditMessage, setIsEditMessage] = useState(false)
  const [isEditEmail, setisEditEmail] = useState(false)
  const [isEditPassword, setIsEditPassword] = useState(false)
  const [isExitLogin, setIsExitLogin] = useState(false)
  const [error, setError] = useState({})
  const inputMessage = useRef(null)
  const dispatch = useDispatch()

  const customStyle = {
    '--after-content': "'名称在1-10字符'",
    color: '#22857b'
  }

  function editName() {
    setIsEditName(true)
    dispatch(maskVisible())
  }

  useEffect(() => {
    if (isEditMessage && inputMessage.current) {
      inputMessage.current.focus()
      if (message != '这个人很懒，什么也没留下') {
        inputMessage.current.value = message
      }
    }
  }, [isEditMessage])

  useEffect(() => {
    setUserName(originalName)
    setMessage(originalMessage)
    // setEmail(originalEmail)
  }, [originalName, originalMessage])

  function editEmail() {
    setisEditEmail(true)
  }
  function editPassword() {
    setIsEditPassword(true)
    console.log('修改密码')
  }
  function exitLogin() {
    console.log('退出登录')
    setIsExitLogin(true)
  }

  function editMessageBtn() {
    setIsEditMessage(true)
  }

  function handlerMessage() {
    setIsEditMessage(false)
    if (inputMessage.current.value.trim() == '') {
      dispatch(editMessage({ message: '这个人很懒，什么也没留下' }))
    } else if (inputMessage.current.value.length > 16) {
      setError({ error: true, text: '不能超过16个字符' })
    } else {
      dispatch(editMessage({ message: inputMessage.current.value }))
    }
  }

  return (
    <>
      <ChangePasswordDiaplog
        visible={isEditPassword}
        onClose={() => setIsEditPassword(false)}
      />
      <ChangeEmailDialog
        visible={isEditEmail}
        onClose={() => {
          setisEditEmail(false)
        }}
      />
      <ErrorPop
        visible={error.error}
        message={error.text}
        onClose={() => setError({ error: false })}
      />
      <ModifyCard
        visible={isEditName}
        customStyle={customStyle}
        userName={userName}
        onClose={() => {
          setIsEditName(false), dispatch(maskVisible())
        }}
      />
      <div style={{ color: 'white', marginTop: '20px', fontSize: '30px' }}>User</div>
      <div
        style={{
          width: '400px',
          margin: '20px auto',
          borderRadius: '10px',
          color: '#fefefe',
          padding: '20px',
          background: '#1a1a1a',
          marginTop: '60px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src="../../public/avatar2.jpg"
            alt=""
            width="60px"
            style={{ borderRadius: '50%', cursor: 'pointer' }}
          />
          <div
            style={{
              marginLeft: '20px',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: '5px'
            }}
          >
            <div
              style={{
                marginBottom: '5px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ fontSize: '18px', marginBottom: '10px', textAlign: 'left' }}>{userName}</div>
              {isEditMessage == false ? (
                <div
                  style={{
                    fontSize: '10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#757575'
                  }}
                  onClick={editMessageBtn}
                >
                  {message}
                </div>
              ) : (
                <input
                  type="text"
                  ref={inputMessage}
                  style={{
                    fontSize: '10px',
                    textAlign: 'left',
                    border: 'none',
                    borderRadius: '2px',
                    outline: 'none',
                    color: '#757575',
                    width: '200px'
                  }}
                  onBlur={handlerMessage}
                />
              )}
            </div>
            <button
              style={{
                background: '#2aa69a',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
                height: '28px'
              }}
              onClick={editName}
            >
              修改姓名
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <Integral />
            <div style={{ fontSize: '14px', marginTop: '5px' }}>12</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <NoLike />
            <div style={{ fontSize: '14px', marginTop: '5px' }}>99</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', marginRight: '10px' }}>邮箱:</div>
          <div style={{ fontSize: '14px' }}>{email}</div>
          <div
            style={{ marginLeft: '20px', fontSize: '14px', color: '#2aa69a', cursor: 'pointer' }}
            onClick={editEmail}
          >
            修改邮箱
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{ fontSize: '14px', color: '#2aa69a', cursor: 'pointer' }}
            onClick={editPassword}
          >
            修改密码
          </div>
          <div style={{ fontSize: '14px', color: '#2aa69a', position: 'relative' }}>
            <span
              onClick={exitLogin}
              style={{ cursor: 'pointer' }}
            >
              退出登录
            </span>
            <ExitBubbleBox
              visible={isExitLogin}
              onClose={() => setIsExitLogin(false)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
