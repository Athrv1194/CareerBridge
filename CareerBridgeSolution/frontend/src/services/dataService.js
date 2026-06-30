import apiClient from './api';

export const getCareerPaths = () => apiClient.get('/paths');

export const getRoadmap = (pathId) => apiClient.get(`/paths/${pathId}/roadmap`);

export const updateStepStatus = (payload) => apiClient.post('/progress/update', payload);

export const registerUser = (payload) => apiClient.post('/Auth/register', payload);

export const loginUser = (payload) => apiClient.post('/Auth/login', payload);
