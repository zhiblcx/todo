import { Navigate } from 'react-router-dom'
import TaskList from '../pages/TaskList'
import TaskClock from '../pages/TaskClock'
import TaskRecord from '../pages/TaskRecord'
import Ranking from '../pages/Ranking'
import TaskRemain from '../pages/TaskRemain'
import StudyNode from '../pages/StudyNode'
import User from '../pages/User'

export default [
  {
    path: '/',
    element: <Navigate to="/tasklist" />
  },
  {
    path: '/tasklist',
    element: <TaskList />
  },
  {
    path: '/taskclock',
    element: <TaskClock />
  },
  {
    path: '/taskrecord',
    element: <TaskRecord />
  },
  {
    path: '/ranking',
    element: <Ranking />
  },
  {
    path: '/taskremain',
    element: <TaskRemain />
  },
  {
    path: '/studynode',
    element: <StudyNode />
  },
  {
    path: '/user',
    element: <User />
  }
]
