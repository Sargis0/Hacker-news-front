export const saveTokens = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const clearTokens = () => {
    localStorage.removeItem('accessToken');
};
