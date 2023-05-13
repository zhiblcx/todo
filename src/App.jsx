import Increase from './components/Increase'
import Todo from './components/features/todo/Todo'
import { store } from './components/features'
import { Provider } from 'react-redux'
export default function App() {
  return (
    <Provider store={store}>
      <Increase />
      <Todo />
    </Provider>
  )
}
