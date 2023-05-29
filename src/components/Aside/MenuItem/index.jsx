import { useNavigate } from 'react-router-dom'
import './index.css'

export default function MenuItem({ label, Icon, path }) {
  const navigate = useNavigate()

  return (
    <div
      className="asideBtn"
      onClick={() => navigate(path)}
    >
      <Icon />
      <span style={{ marginLeft: '5px', fontSize: '14px' }}>{label}</span>
    </div>
  )
}
