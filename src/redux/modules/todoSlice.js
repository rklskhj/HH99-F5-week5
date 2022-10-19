import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//이페이지 안써요
const initialState = {
  todo: [
    {
      id: 0,
      body: "",
      username: "",
      title: "",
    },
  ],
  error: null,
  isLoading: false,
};

//이거안써요
export const __getTodoThunk = createAsyncThunk(
  "GET_TODO",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__getTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export const {} = todoSlice.actions;
export default todoSlice.reducer;
