import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../http/axiosInstance";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (newsId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/comment/news/${newsId}`);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch comments');
        }
    }
);

export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({ newsId, text, parentCommentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/comment', {
                newsId,
                text,
                parentCommentId
            });
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to post comment');
        }
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearComments: (state) => {
            state.comments = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = buildCommentTree(action.payload);
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

function buildCommentTree(comments) {
    const commentMap = {};
    const rootComments = [];

    comments.forEach(comment => {
        comment.replies = [];
        commentMap[comment._id] = comment;

        if (comment.parentComment) {
            const parent = commentMap[comment.parentComment];
            if (parent) parent.replies.push(comment);
        } else {
            rootComments.push(comment);
        }
    });

    return rootComments;
}

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;