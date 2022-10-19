import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: {
    content: "",
    id: 0,
    todoId: 0,
  },
  isLoading: false,
  error: null,
  isGlobalEditmode: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
