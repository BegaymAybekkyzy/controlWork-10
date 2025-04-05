import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../types";

import { RootState } from "../../app/store.ts";
import {
  createComment,
  deleteComments,
  fetchAllComments,
  fetchCommentsByNews,
} from "./commentsThunks.ts";

interface commentsState {
  allComments: IComment[];
  commentsByNews: IComment[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: commentsState = {
  allComments: [],
  commentsByNews: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const selectCommentsByNews = (state: RootState) =>
  state.comment.commentsByNews;
export const selectCommentsFetchLoading = (state: RootState) =>
  state.comment.fetchLoading;
export const selectCommentsDeleteLoading = (state: RootState) =>
  state.comment.deleteLoading;
export const selectCommentsCreateLoading = (state: RootState) =>
  state.comment.createLoading;

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllComments.fulfilled, (state, { payload }) => {
        state.allComments = payload;
        state.fetchLoading = false;
      })
      .addCase(fetchAllComments.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchCommentsByNews.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCommentsByNews.fulfilled, (state, { payload }) => {
        state.commentsByNews = payload;
        state.fetchLoading = false;
      })
      .addCase(fetchCommentsByNews.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(deleteComments.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteComments.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteComments.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});
export const commentReducer = commentSlice.reducer;
