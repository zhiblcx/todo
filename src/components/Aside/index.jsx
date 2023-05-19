import { useNavigate } from 'react-router-dom'
import TaskListSvg from '../Svg/TaskListSvg.jsx'
import TaskRecordSvg from '../Svg/TaskRecordSvg.jsx'
import TaskClockSvg from '../Svg/TaskClockSvg.jsx'
import './index.css'

export default function Aside() {
  const navigate = useNavigate()
  return (
    <div className="aside">
      <div className="asideBtn">
        <TaskListSvg />
        <span
          style={{ marginLeft: '5px', fontSize: '14px' }}
          onClick={() => navigate('/tasklist')}
        >
          任务清单
        </span>
      </div>
      <div className="asideBtn">
        <TaskRecordSvg />
        <span
          style={{ marginLeft: '5px', fontSize: '14px' }}
          onClick={() => navigate('/taskrecord')}
        >
          任务记录
        </span>
      </div>
      <div className="asideBtn">
        <TaskClockSvg />
        <span
          style={{ marginLeft: '5px', fontSize: '14px' }}
          onClick={() => navigate('/taskclock')}
        >
          计时器
        </span>
      </div>
    </div>
  )
}
