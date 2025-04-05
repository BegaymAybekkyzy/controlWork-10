import { createSlice } from '@reduxjs/toolkit';
import { INews } from '../../types';
import { createNews, deleteNews, fetchAllNews, fetchNewsById } from './newsThunks.ts';
import { RootState } from '../../app/store.ts';

interface NewsState {
  allNews: INews[];
  news: INews | null;
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: NewsState = {
  allNews: [],
  news: null,
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const selectAllNews = (state: RootState) => state.news.allNews;
export const selectOneNews = (state: RootState) => state.news.news;
export const selectFetchLoading = (state: RootState) => state.news.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.news.createLoading;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, {payload}) => {
        state.allNews = payload;
        state.fetchLoading = false;
      })

      .addCase(fetchNewsById.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchNewsById.fulfilled, (state, {payload}) => {
        state.news = payload;
        state.fetchLoading = false;
      })

      .addCase(createNews.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(deleteNews.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});
export const newsReducer = newsSlice.reducer;
