import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import newsReducer from './newsSlice';
import commentsReducer from './commentSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer,
        comments: commentsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/refreshToken/fulfilled'],
                ignoredPaths: ['auth.token']
            }
        }),
});

export default store;