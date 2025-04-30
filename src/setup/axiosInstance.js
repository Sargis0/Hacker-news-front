import axios from 'axios';
import { refreshToken } from '../store/authSlice.js';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

let storeInstance;
export const injectStore = (store) => {
    storeInstance = store;
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = storeInstance.getState().auth.token;
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

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { dispatch } = storeInstance;
                const result = await dispatch(refreshToken());

                if (refreshToken.fulfilled.match(result)) {
                    const newToken = result.payload.accessToken;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
