import axios from 'axios';
import { getAccessToken } from './tokenStorage'; // Adjust the import path as necessary
import { ContactlessOutlined } from '@mui/icons-material';
import tokenService from './tokenService';
// import axiosInstance from "./axiosConfig";
// Request interceptor

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9091/employee',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});


axiosInstance.interceptors.request.use(
  config => {

    console.log("config",config )      // Attach token if available
    console.log('Request Interceptor triggered');
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        console.log("token",token)
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  error => {
    console.error('Request Interceptor Error:', error);
      // Handle request error
      return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(" jjj",error)
      const originalRequest = error.config;

      if (error.response   && error.response.status === 401) {
          const refreshToken = getRefreshToken();
          // Call your refresh token endpoint here
          try {
              const newTokens = await tokenService.refreshAuthToken(refreshToken);
              storeTokens(newTokens.accessToken, newTokens.refreshToken);
              // Update the original request with the new token
              originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
              return axiosInstance(originalRequest); // Retry original request
          } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              removeTokens(); // Remove tokens on failure
              // Optionally, redirect to login
              // window.location.href = '/login'; 
              return Promise.reject(refreshError);
          }
          
      }

      return Promise.reject(error); // Handle other errors
  }
);


export { axiosInstance }; 
