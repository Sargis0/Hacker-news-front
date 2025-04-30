import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../setup/axiosInstance.js";

const initialState = {
    commentsByNewsId: {},
    status: 'idle',
    error: null
};

// Fetch comments by news ID
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (newsId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/comment/news/${newsId}`);
            return { newsId, comments: response.data.data };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch comments');
        }
    }
);

// Post new comment
export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({ newsId, text }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/comment', { newsId, text });
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to post comment');
        }
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { newsId, comments } = action.payload;
                state.commentsByNewsId[newsId] = comments;
                state.status = 'succeeded';
            })
            .addCase(postComment.fulfilled, (state, action) => {
                const newComment = action.payload;
                const newsId = newComment.newsId;
                if (!state.commentsByNewsId[newsId]) {
                    state.commentsByNewsId[newsId] = [];
                }
                state.commentsByNewsId[newsId].unshift(newComment);
            });
    }
});

export default commentSlice.reducer;
