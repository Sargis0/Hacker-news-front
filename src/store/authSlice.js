import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    username: null,
    token: null,
    email: null,
    status: 'idle',
    error: null,
};

export const updateEmail = createAsyncThunk(
    'auth/updateEmail',
    async (email, {rejectWithValue, getState}) => {
        try {
            const token = getState().auth.token;
            const response = await axios.patch(
                'http://localhost:8080/api/user/email',
                {newEmail: email},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Email update failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData, {
                withCredentials: true,
            });
            localStorage.setItem('authToken', response.data.data.accessToken);
            localStorage.setItem('username', response.data.data.username);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.post(
                'http://localhost:8080/api/auth/refresh',
                {},
                {withCredentials: true}
            );
            localStorage.setItem('authToken', res.data.data.accessToken);
            localStorage.setItem('username', res.data.data.username);
            return res.data.data;
        } catch (err) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            return rejectWithValue('Token refresh failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
            state.email = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
        },
        setCredentials(state, action) {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.token = action.payload.accessToken;
            state.email = action.payload.email || null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.token = action.payload.accessToken;
                state.email = action.payload.email || null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.accessToken;
                state.username = action.payload.username;
                state.email = action.payload.email || null;
                state.status = 'succeeded';
            })
            .addCase(refreshToken.rejected, (state) => {
                state.token = null;
                state.isAuthenticated = false;
                state.username = null;
                state.email = null;
                state.status = 'failed';
            })
            .addCase(updateEmail.fulfilled, (state, action) => {
                state.email = action.payload.email;
                state.status = 'succeeded';
            })
            .addCase(updateEmail.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    },
});

export const {logout, setCredentials} = authSlice.actions;

export default authSlice.reducer;
