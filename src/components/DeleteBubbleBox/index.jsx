import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/todo/todoSlice'
import BubbleBox from '../BubbleBox'
import styles from './DeleteBubbleBox.module.css'

export default function DeleteBubbleBox(props) {
  const [visible, setVisible] = useState(props.visible)
  const dispatch = useDispatch()
  function handlerComfirm() {
    dispatch(deleteTask(props.deleteTaskId))
  }
  function handlerCancel() {
    setVisible(!visible)
  }

  return (
    <div style={{ position: 'absolute', right: '-50px', top: '50px' }}>
      <BubbleBox visible={visible}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignContent: 'center' }}>
          <div>确认删除吗？</div>
          <div>
            <button className={styles.bubbleBtn} style={{ backgroundColor: '#37bbc0' }} onClick={handlerComfirm}>
              确认
            </button>
            <button className={styles.bubbleBtn} style={{ backgroundColor: '#c55138' }} onClick={handlerCancel}>
              取消
            </button>
          </div>
        </div>
      </BubbleBox>
    </div>
  )
}
