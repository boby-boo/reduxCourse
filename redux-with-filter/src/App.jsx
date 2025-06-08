import {NewTodo} from './components/NewTodo'
import {TodoList} from './components/TodoList'
import {Filters} from './components/Filters';

import "./index.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Redux Todo</h1>
      <NewTodo />
      <Filters />
      <TodoList />
    </div>
  );
}
