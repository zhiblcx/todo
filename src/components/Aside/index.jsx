import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskListSvg from '../Svg/TaskListSvg.jsx'
import TaskRecordSvg from '../Svg/TaskRecordSvg.jsx'
import TaskClockSvg from '../Svg/TaskClockSvg.jsx'
import Ranking from '../Svg/Ranking.jsx'
import './index.css'

export default function Aside() {
  const navigate = useNavigate()
  const [asideVisible, setAsideVisible] = useState(true)
  return (
    <>
      <div
        style={{
          position: 'fixed',
          backgroundColor: '#2aa69a',
          width: '25px',
          height: '30px',
          borderRadius: '0 40% 40% 0',
          left: '0px',
          top: '30px',
          zIndex: '11',
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          paddingTop: '2px',
          paddingLeft: '4px',
          cursor: 'pointer'
        }}
        onClick={() => setAsideVisible(!asideVisible)}
      >
        <span style={{ display: asideVisible ? 'block' : 'none' }}>
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path
              d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z"
              fill="#ffffff"
            ></path>
          </svg>
        </span>
        <span style={{ display: asideVisible ? 'none' : 'block' }}>
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
          >
            <path
              d="M277.382 553.022c-23.136-22.633-23.113-59.378 0.024-82.035l383.961-421.98c23.16-22.657 60.65-22.68 83.786-0.048 23.112 22.657 23.088 59.378-0.048 82.058l-347.407 381.779 346.713 381.035c23.16 22.681 23.401 59.186 0.576 81.555-22.825 22.368-60.122 22.104-83.258-0.553l-383.052-420.97c-0.382-0.361-0.91-0.457-1.294-0.84z"
              fill="#ffffff"
            ></path>
          </svg>
        </span>
      </div>
      <div className={asideVisible ? 'aside asideEnter' : 'aside asideExit'}>
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
        <div className="asideBtn">
          <Ranking />
          <span
            style={{ marginLeft: '5px', fontSize: '14px' }}
            onClick={() => navigate('/ranking')}
          >
            排行榜
          </span>
        </div>
      </div>
    </>
  )
}
