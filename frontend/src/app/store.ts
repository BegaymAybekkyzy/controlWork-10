import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "../features/news/newsSlice.ts";
import { commentReducer } from "../features/comments/commentsSlice.ts";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
