import {Route, Routes} from 'react-router-dom'
import TodoList from './pages/todoList/TodoList';

export default function App() {
  return <>
    <Routes>
      <Route path='/' element={<TodoList/>}/>
    </Routes>
  </>;
}
