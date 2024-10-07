const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const storeTokens = (accessToken, refreshToken) => {
    sessionStorage.setItem(TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};
