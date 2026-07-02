import axios from 'axios';

// Automatically routes to your running .NET 8 Web API
const apiClient = axios.create({
  baseURL: 'http://localhost:5097/api', // Pointing to the 'http' profile port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Code-Reduction Masterstroke: Automatically injects JWT token if it exists in local memory
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('careerbridge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Matches backend [Authorize] guard rules
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
