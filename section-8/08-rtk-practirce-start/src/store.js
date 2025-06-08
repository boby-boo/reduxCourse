import { configureStore, createAction } from "@reduxjs/toolkit";
import { filterReducer } from "./feature/Filters/filter-slice";
import { todoReducer } from "./feature/Todos/todos-slice";

export const resetToDefault = createAction('root/reset-app');

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer
  },
  devTools: true,
});
