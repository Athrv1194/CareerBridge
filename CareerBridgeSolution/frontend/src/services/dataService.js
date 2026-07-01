import apiClient from './api';

export const getCareerPaths = () => apiClient.get('/paths');

export const getRoadmap = () => apiClient.get('/Roadmap/active');

export const updateStepStatus = (payload) => apiClient.post('/Roadmap/update-step', payload);

export const registerUser = (payload) => apiClient.post('/Auth/register', payload);

export const loginUser = (payload) => apiClient.post('/Auth/login', payload);

export const getDashboardSummary = () => apiClient.get('/Dashboard/summary');

export const getProfile = () => apiClient.get('/Profile');
export const updateProfile = (payload) => apiClient.put('/Profile', payload);
