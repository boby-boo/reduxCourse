import { useSelector, useDispatch } from "react-redux";

import {selectVisibleTodos, removeTodo, fetchTodos, toggleTodo, todosSelectors} from './todos-slice';
import { useEffect } from "react";

export const TodoList = () => {
  const activeFilter = useSelector(state => state.filter);
  const todos = useSelector(todosSelectors.selectAll);
  const visibleTodos = selectVisibleTodos(todos, activeFilter);
  const dispatch = useDispatch();
  const {error, loading} = useSelector(state => state.todos);
  
  useEffect(() => {
    const promise = dispatch(fetchTodos());

    return () => {
      promise.abort();
    }
  }, [dispatch]);

  return (
    <ul>
      {error && <h2>ERROR!</h2>}
      {loading === 'loading' && <h2>Loading...</h2>}
      {loading === 'idle' && !error && 
        todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />{" "}
            {todo.title}{" "}
            <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
          </li>
        ))
      }
    </ul>
  );
};
