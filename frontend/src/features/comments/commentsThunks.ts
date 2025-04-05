import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { IComment, ICommentForm } from "../../types";

export const fetchAllComments = createAsyncThunk<IComment[], void>(
  "comments/fetchAllComments",
  async () => {
    const response = await axiosAPI.get<IComment[]>("comments");
    return response.data;
  },
);

export const fetchCommentsByNews = createAsyncThunk<IComment[], string>(
  "comments/fetchCommentsByNews",
  async (news_id) => {
    const response = await axiosAPI.get<IComment[]>(
      `comments?news_id=${news_id} `,
    );
    return response.data;
  },
);

export const createComment = createAsyncThunk<void, ICommentForm>(
  "comments/createComments",
  async (newComment) => {
    await axiosAPI.post("comments", newComment);
  },
);

export const deleteComments = createAsyncThunk<void, string>(
  "comments/deleteComments",
  async (id) => {
    await axiosAPI.delete(`comments/${id}`);
  },
);
