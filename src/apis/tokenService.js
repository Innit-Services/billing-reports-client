// src/apis/tokenService.js
import axiosInstance from './axiosConfig';
import API_ENDPOINTS from './apiEndpoints';
import { useAuth } from './AuthContext'; 

const useTokenService = () => {
    const { signIn, getAccessToken } = useAuth();

    const signUp = async (email, password) => {
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.SIGNUP, { email, password });
            return response.data;
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    };

    const signInUser = async (email, password) => {
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.SIGNIN, { email, password });
            const token = response.data.token;
            signIn(token);
            alert('Login Successful!');
            return token;
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
            throw error;
        }
    };

    const refreshAuthToken = async (refreshToken) => {
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.REFRESH, { refreshToken });
            const token = response.data.token;
            signIn(token);
            return token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };

    return { signUp, signIn: signInUser, refreshAuthToken, getAccessToken };
};

export default useTokenService;
