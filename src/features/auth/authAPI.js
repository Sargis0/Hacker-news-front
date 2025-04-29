import axiosInstance from '../../services/axiosInstance';
import {API_ROUTES} from '../../constants/apiRoutes';

export const loginAPI = async (credentials) => {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, credentials);
    return response.data;
};

export const registerAPI = async (credentials) => {
    const response = await axiosInstance.post(API_ROUTES.REGISTER, credentials);
    return response.data;
};

export const refreshTokenAPI = async () => {
    const response = await axiosInstance.post(API_ROUTES.REFRESH_TOKEN);
    return response.data;
};
