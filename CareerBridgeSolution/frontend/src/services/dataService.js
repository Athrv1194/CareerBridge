import apiClient from './api';

export const getCareerPaths = () => apiClient.get('/paths');

export const getRoadmap = (pathId) => apiClient.get(`/paths/${pathId}/roadmap`);

export const updateStepStatus = (payload) => apiClient.post('/progress/update', payload);
