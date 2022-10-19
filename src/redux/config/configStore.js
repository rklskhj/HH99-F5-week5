import { configureStore } from "@reduxjs/toolkit";
import todo from "../modules/todoSlice";
import comment from "../modules/commentSlice";
import commentList from "../modules/commentListSlice";
import todos from "../modules/todosSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    todos,
    commentList,
    comment,
    todo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
