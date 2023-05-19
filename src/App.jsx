import { Suspense } from 'react'
import { store } from './components/features'
import { Provider } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import Aside from './components/Aside'

import routers from './routes'

export default function App() {
  const routerTable = useRoutes(routers)
  return (
    <Provider store={store}>
      <Aside />
      <Suspense fallback={<h1>loadding...</h1>}>{routerTable}</Suspense>
    </Provider>
  )
}
