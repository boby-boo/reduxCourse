import {createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import {resetToDefault} from '../Reset/reset-action';

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo.id
})

export const createTodo = createAsyncThunk(
  '@@todos/create-todo',
  async (title) => {

    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, completed: false})
    })

    const data = res.json();
    return data;
  }
);

export const fetchTodos = createAsyncThunk(
  '@@todos/fetch-todos',
  async (_, {rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:3001/todos');
      const data = await res.json();
      return data
    } catch(err) {
      return rejectWithValue(err)
    }
  }, 
  {
    condition: (_, {getState, extra}) => {
      const {loading} = getState().todos;

      if (loading === 'loading') {
        return false
      }
    }
  }
)

export const toggleTodo = createAsyncThunk(
  '@@todos/toggle-todo',
  async (id, {getState}) => {
    const todo = getState().todos.entities[id];

    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completed: !todo.completed})
    })

    const data = await res.json();
    return data;
  }
);

export const removeTodo = createAsyncThunk(
  '@@todos/remove-todo',
  async(id) => {
    const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

    return id;
  }
)

const todoSlice = createSlice({
  name: '@@todos',
  initialState: todosAdapter.getInitialState({
    loading: 'idle',
    error: null
  }),
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title) => ({
        payload: {
          title,
          completed: false
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetToDefault, () => {
        return []
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        todosAdapter.addOne(state, action.payload);
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.addMany(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = 'idle'
        state.error = 'Smth went wrong'
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        todosAdapter.updateOne(state, {
          id: updatedTodo.id,
          changes: {
            completed: updatedTodo.completed
          }
        })
      })
      .addCase(toggleTodo.rejected, (state) => {
        state.loading = 'idle'
        state.error = 'Something went wrong'
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload);
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = 'loading'
        state.error = null
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = 'idle';
        state.error = action.payload || 'ERROR!'
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = 'idle';
      })
  }
});

export const todoReducer = todoSlice.reducer;
export const todosSelectors = todosAdapter.getSelectors(state => state.todos);

export const selectVisibleTodos = (todos = [], filter) => {
  switch (filter) {
    case 'all': {
      return todos;
    }
    case 'active': {
      return todos.filter(todo => !todo.completed);
    }
    case 'completed': {
      return todos.filter(todo => todo.completed);
    }
    default: {
      return todos;
    }
  }
}