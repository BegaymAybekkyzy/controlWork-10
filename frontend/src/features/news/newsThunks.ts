import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from '../../axiosAPI.ts';
import { INews, INewsForm } from '../../types';

export const fetchAllNews = createAsyncThunk<INews[], void>(
  'news/fetchAllNews',
  async () => {
    const response = await axiosAPI.get<INews[]>('/news');
    return response.data;
  }
);

export const fetchNewsById = createAsyncThunk<INews, string>(
  'news/fetchNewsById',
  async (news_id) => {
    const response = await axiosAPI.get<INews>('/products/' + news_id);
    return response.data || null;
  }
);

export const createNews = createAsyncThunk<void, INewsForm>(
  'news/createNews',
  async (news) => {
    const formData = new FormData();
    const keys = Object.keys(news) as (keyof INewsForm)[];

    keys.forEach(key => {
      const value = news[key] as string;
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosAPI.post('/products', formData);
  }
);