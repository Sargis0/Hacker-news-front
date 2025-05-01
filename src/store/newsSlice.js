import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../http/axiosInstance.js";

const initialState = {
    newsList: [],
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true,
};

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/news?page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch news');
        }
    }
);

export const submitNews = createAsyncThunk(
    'news/submitNews',
    async ({ title, url, text }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/news', {
                title,
                url,
                content: text,
            });
            return response.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to submit news'
            );
        }
    }
);

export const fetchNewsItem = createAsyncThunk(
    'news/fetchNewsItem',
    async (newsId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/news/${newsId}`);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch news item');
        }
    }
);


const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        resetNews: (state) => {
            state.newsList = [];
            state.page = 1;
            state.status = 'idle';
            state.error = null;
            state.hasMore = true;
        },
        clearCurrentItem: (state) => {
            state.currentItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { news, totalPages } = action.payload;

                if (!news || news.length === 0 || state.page >= totalPages) {
                    state.hasMore = false;
                } else {
                    state.newsList = [...state.newsList, ...news];
                    state.page += 1;
                }
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(submitNews.fulfilled, (state, action) => {
                state.newsList.unshift(action.payload);
            })
            .addCase(fetchNewsItem.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNewsItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentItem = action.payload;
            })
            .addCase(fetchNewsItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetNews, clearCurrentItem } = newsSlice.actions;
export default newsSlice.reducer;
