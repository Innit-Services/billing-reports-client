// src/apis/axiosInterceptor.js
import axiosInstance from './axiosConfig';
import tokenService from './tokenService';

const setupInterceptors = (getToken) => {
   
    axiosInstance.interceptors.request.use((config) => {
        const token = getToken();
        console.log(token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // axiosInstance.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //         const originalRequest = error.config;
    //         if (error.response && error.response.status === 401 && !originalRequest._retry) {
    //             originalRequest._retry = true;
    //             try {
    //                 const newToken = await tokenService.refreshAuthToken();
    //                 tokenService.signIn(newToken);  // Update token in context
    //                 axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    //                 originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
    //                 return axiosInstance(originalRequest);
    //             } catch (refreshError) {
    //                 return Promise.reject(refreshError);
    //             }
    //         }
    //         return Promise.reject(error);
    //     }
    // );
};

export default setupInterceptors;
