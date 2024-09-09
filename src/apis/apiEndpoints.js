// Define the base URL for your API
const API_BASE_URL = "http://localhost:8081/api/v1/auth";

const API_ENDPOINTS = {

  SIGNUP: `${API_BASE_URL}/signup`,
  SIGNIN: `${API_BASE_URL}/signin`,
  REFRESH: `${API_BASE_URL}/refresh`,

};

export default API_ENDPOINTS;
