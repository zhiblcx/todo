import { useSelector, useDispatch } from 'react-redux'
import { maskVisible } from '../features/todo/todoSlice.js'

import './index.css'
export default function Mask(props) {
  const visible = useSelector(state => state.tasks.visible)

  const dispatch = useDispatch()

  function handlerVisible() {
    dispatch(maskVisible())
  }

  function handlerPrevent(event) {
    console.log(123)
    event.stopPropagation()
  }
  return (
    <div className={visible ? 'visible mask' : 'mask'} onClick={handlerVisible}>
      <span style={{ zIndex: 999 }} onClick={event => handlerPrevent(event)}>
        {props.children}
      </span>
    </div>
  )
}