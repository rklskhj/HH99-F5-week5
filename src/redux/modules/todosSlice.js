import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_TODOS_URL;

const initialState = {
  todos: [],
  error: null,
  isLoading: false,
  isSuccess: false,
};

/**Thunk addTodos */
export const __addTodos = createAsyncThunk(
  "todos/addTodos",
  async (todoData, thunkAPI) => {
    try {
      console.log("base", BASE_URL);
      const data = await axios.post(BASE_URL, todoData);
      // console.log(todoData);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Thunk getTodos */
export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(BASE_URL);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
/**Thunk editTodos */
export const __editTodos = createAsyncThunk(
  "todos/editTodos",
  async (todoId, thunkAPI) => {
    console.log("id", todoId);
    try {
      const { data } = await axios.patch(`${BASE_URL}/${todoId.id}`, todoId);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Thunk deleteTodos */
export const __deleteTodos = createAsyncThunk(
  "DELETE_TODO",
  async (payload, thunkAPI) => {
    try {
      axios.delete(`${BASE_URL}/${payload}`); //id?
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    //게시글 추가
    [__addTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodos.fulfilled]: (state, action) => {
      console.log("act", action);
      state.isLoading = false;

      state.todos.push(action.payload);
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //게시글 조회
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;

      // state.todos.splice(target, 1, action.payload);
      // state.isSuccess = true;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //삭제합니다
    [__deleteTodos.fulfilled]: (state, action) => {
      console.log("del", action.payload);
      const bye = state.todos.findIndex((todo) => todo.id === action.payload);
      //id값일치 된거 하나 삭제.
      state.todos.splice(bye, 1);

      // state.isLoading = false;
      // state.todo = action.payload;
    },
    //게시글 수정
    [__editTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__editTodos.fulfilled]: (state, action) => {
      const target = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos.splice(target, 1, action.payload);
    },
    [__editTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
