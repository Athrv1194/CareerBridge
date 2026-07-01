import apiClient from './api';

export const getCareerPaths = () => apiClient.get('/paths');

export const getRoadmap = () => apiClient.get('/Roadmap');

export const updateStepStatus = (payload) => apiClient.put('/Roadmap/status', payload);

export const registerUser = (payload) => apiClient.post('/Auth/register', payload);

export const loginUser = (payload) => apiClient.post('/Auth/login', payload);

export const getDashboardSummary = () => apiClient.get('/Dashboard/summary');

export const getProfile = () => apiClient.get('/Profile');
export const updateProfile = (payload) => apiClient.put('/Profile', payload);

export const submitAssessment = (payload) => apiClient.post('/Assessment/submit', payload);
export const getAssessmentQuestions = () => apiClient.get('/Assessment/questions');

export const generateRecommendation = () => apiClient.post('/Recommendation/generate');
export const getRecommendation = () => apiClient.get('/Recommendation');

export const getDashboard = () => apiClient.get('/Dashboard');
