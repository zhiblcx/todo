import BubbleBox from '@/components/BubbleBox'
import styles from '@/components/DeleteBubbleBox/DeleteBubbleBox.module.css'

export default function ExitBubbleBox(props) {
  function handlerComfirm() {
    console.log('确认')
    props.onClose && props.onClose()
  }

  function handlerCancel() {
    console.log('取消')
    props.onClose && props.onClose()
  }
  return (
    <div style={{ position: 'absolute', right: '-50px', top: '25px' }}>
      <BubbleBox visible={props.visible}>
        <div className={styles.deleteBubbleBox}>
          <div style={{ marginTop: '2px', marginBottom: '2px' }}>确认退出吗？</div>
          <div>
            <button
              className={styles.bubbleBtn}
              style={{ backgroundColor: '#37bbc0', cursor: 'pointer' }}
              onClick={handlerComfirm}
            >
              确认
            </button>
            <button
              className={styles.bubbleBtn}
              style={{ backgroundColor: '#c55138' }}
              onClick={handlerCancel}
            >
              取消
            </button>
          </div>
        </div>
      </BubbleBox>
    </div>
  )
}
