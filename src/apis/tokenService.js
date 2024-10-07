import axios from "axios";
import API_ENDPOINTS from "./apiEndpoints";

const tokenService = {
    signIn: async (email, password) => {
      try {
        const response = await axios.post(API_ENDPOINTS.SIGNIN, { email, password });
        console.log('Login response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Failed to log in. Please check your credentials.');
      }
    },
  
    refreshAuthToken: async (refreshToken) => {
      try {
        const response = await axios.post(API_ENDPOINTS.REFRESH, { refreshToken });
        return response.data;
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Failed to refresh token. Please log in again.');
      }
    }
  };
  
  export default tokenService;