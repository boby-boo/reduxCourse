import { useDispatch } from "react-redux";
import { resetToDefault } from "./store";
import { Filter} from "./feature/Filters/Filter";
import TodoList from "./feature/Todos/Todolist";
import { NewTodo } from "./feature/Todos/NewTodo";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Redux Todo</h1>
      <NewTodo />
      <Filter />
      <TodoList />
      <ResetApp />
    </div>
  );
}

const ResetApp = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(resetToDefault())}>
      Reset
    </button>
  )
}

