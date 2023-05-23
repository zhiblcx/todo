import { Navigate } from 'react-router-dom'
import TaskList from '../pages/TaskList'
import TaskClock from '../pages/TaskClock'
import TaskRecord from '../pages/TaskRecord'

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
  }
]
