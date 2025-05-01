import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import $api from '../http/axiosInstance';

const initialState = {
    isAuthenticated: false,
    username: null,
    token: null,
    status: 'idle',
    error: null
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await $api.post('/auth/register', userData);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await $api.post('/auth/login', credentials);
            localStorage.setItem('authToken', response.data.data.accessToken);
            localStorage.setItem('username', response.data.data.username);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            await $api.post('/auth/logout');
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            return null;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Logout failed');
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $api.post('/auth/refresh');
            const newToken = response.data.data.accessToken;
            localStorage.setItem('authToken', newToken);
            return {accessToken: newToken};
        } catch (err) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            return rejectWithValue('Session expired. Please login again');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.username = null;
            state.status = 'idle';
        },
        setCredentials: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.accessToken;
            state.username = action.payload.username;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.token = action.payload.accessToken;
                state.username = action.payload.username;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.username = null;
                state.status = 'idle';
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.accessToken;
                state.isAuthenticated = true;
            });
    }
});

export const {clearError, logout, setCredentials} = authSlice.actions;
export default authSlice.reducer;