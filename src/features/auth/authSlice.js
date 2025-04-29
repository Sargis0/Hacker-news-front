import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, refreshTokenAPI } from './authAPI';
import { clearTokens, saveTokens, getAccessToken } from '../../utils/tokenUtils';

const initialState = {
    user: null,
    accessToken: getAccessToken(),
    isAuthenticated: !!getAccessToken(),
    loading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await loginAPI(credentials);
        saveTokens(response.accessToken);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
    try {
        const response = await registerAPI(credentials);
        saveTokens(response.accessToken);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

export const refreshAccessToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
    try {
        const response = await refreshTokenAPI();
        saveTokens(response.accessToken);
        return response;
    } catch (err) {
        clearTokens();
        return thunkAPI.rejectWithValue('Session expired');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            clearTokens();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
