export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();
        const bufferTime = 60000;

        return expiryTime < currentTime + bufferTime;
    } catch {
        return true;
    }
};

export const getTokenExpiryTime = (token) => {
    if (!token) return 0;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000;
    } catch {
        return 0;
    }
};
