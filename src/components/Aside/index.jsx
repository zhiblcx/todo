import { useState } from 'react'

import MenuItem from './MenuItem'

import RightArrowSvg from '../Svg/RightArrowSvg'
import LeftArrowSvg from '../Svg/LeftArrowSvg'
import TaskListSvg from '../Svg/TaskListSvg'
import TaskRecordSvg from '../Svg/TaskRecordSvg'
import TaskRemainSvg from '../Svg/TaskRemainSvg'
import TaskClockSvg from '../Svg/TaskClockSvg'
import RankingSvg from '../Svg/RankingSvg'
import StudyNodeSvg from '../Svg/StudyNodeSvg'
import UserSvg from '../Svg/UserSvg'

import './index.css'

export default function Aside() {
  const [asideVisible, setAsideVisible] = useState(true)
  const menuItems = [
    { label: '任务清单', Icon: TaskListSvg, path: '/tasklist' },
    { label: '任务记录', Icon: TaskRecordSvg, path: '/taskrecord' },
    { label: '任务提醒', Icon: TaskRemainSvg, path: '/taskremain' },
    { label: '计时器', Icon: TaskClockSvg, path: '/taskclock' },
    { label: '排行榜', Icon: RankingSvg, path: '/ranking' },
    { label: '学习笔记', Icon: StudyNodeSvg, path: '/studynode' },
    { label: '我的', Icon: UserSvg, path: '/user' }
  ]
  return (
    <>
      <div
        className="asideControlVisible"
        onClick={() => setAsideVisible(!asideVisible)}
      >
        <span style={{ display: asideVisible ? 'block' : 'none' }}>
          <RightArrowSvg />
        </span>
        <span style={{ display: asideVisible ? 'none' : 'block' }}>
          <LeftArrowSvg />
        </span>
      </div>
      <div className={asideVisible ? 'aside asideEnter' : 'aside asideExit'}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
          />
        ))}
      </div>
    </>
  )
}
