import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_COMMENTS_URL;

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

/**Thunk addComment */
export const __addComments = createAsyncThunk(
  "commentList/addCommnets",
  async (commentData, thunkAPI) => {
    try {
      const { data } = await axios.post(BASE_URL, commentData);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Thunk getComment */
export const __getComments = createAsyncThunk(
  "commentList/getComments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(BASE_URL);
      const newData = data.sort((a, b) => b.id - a.id); //내림차순
      console.log("new", newData);
      return thunkAPI.fulfillWithValue(newData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Thunk deleteComment */
export const __deleteComments = createAsyncThunk(
  "commentLists/deleteComments",
  async (commentId, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${commentId}`);
      return thunkAPI.fulfillWithValue(commentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**Thunk editComment */
export const __editComments = createAsyncThunk(
  "commentLists/editComments",
  async (commentId, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/${commentId.id}`,
        commentId
      );

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentListSlice = createSlice({
  name: "commentList",
  initialState,
  reducers: {},
  extraReducers: {
    /** 댓글 추가하기*/
    [__addComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.unshift(action.payload); // push 반대로 입력
    },
    [__addComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    /**댓글 가져오기 */
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    /**댓글 삭제하기 */
    [__deleteComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComments.fulfilled]: (state, action) => {
      console.log("ac", action);
      state.isLoading = false;
      const target = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      state.comments.splice(target, 1);
    },
    [__deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    /**댓글 수정하기 */
    [__editComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("ac", action);
      const target = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments.splice(target, 1, action.payload);
    },
    [__editComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = commentListSlice.actions;
export default commentListSlice.reducer;
