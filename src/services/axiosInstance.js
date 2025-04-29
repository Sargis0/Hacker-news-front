import axios from 'axios';
import {getAccessToken, clearTokens} from '../utils/tokenUtils';
import {refreshAccessToken, logout} from '../features/auth/authSlice';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await store.dispatch(refreshAccessToken());
                return axiosInstance(originalRequest);
            } catch (_error) {
                store.dispatch(logout());
                return Promise.reject(_error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
