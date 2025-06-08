import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleTodo } from "../store/todos/todos-actions";
import {selectVisibleTodos} from '../store/todos/todos-selectors';

import { useParams } from "react-router-dom";


export const TodoList = () => {
  const dispatch = useDispatch();
  const { filter } = useParams();
  const todos = useSelector(state => selectVisibleTodos(state, filter));

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.title}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />{" "}
          {todo.title}{" "}
          <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </li>
      ))}
    </ul>
  );
};
