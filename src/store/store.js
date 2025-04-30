import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import newsReducer from './newsSlice';
import commentsReducer from './commentSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer,
        comments: commentsReducer,

    },
});

export default store;
