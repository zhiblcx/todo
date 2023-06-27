import './index.css'

export default function Mask(props) {
  const { visible, onClose } = props

  function handleMaskClick() {
    onClose && onClose()
  }

  function handlePreventClick(event) {
    event.stopPropagation()
  }

  return (
    <div
      className={visible ? 'visible mask' : 'mask'}
      onClick={handleMaskClick}
    >
      <span
        style={{ zIndex: 999, height: '0px' }}
        onClick={handlePreventClick}
      >
        {props.children}
      </span>
    </div>
  )
}
