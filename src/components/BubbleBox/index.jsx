import './index.css'

export default function BubbleBox(props) {
  return (
    <div className="bubbleBox" style={props.visible ? { display: 'block' } : { display: 'none' }}>
      {props.children}
    </div>
  )
}
