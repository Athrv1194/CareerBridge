import apiClient from './api';

export const getCareerPaths = () => apiClient.get('/paths');

export const getRoadmap = (pathId) => apiClient.get(`/paths/${pathId}/roadmap`);

export const updateStepStatus = (payload) => apiClient.post('/progress/update', payload);

// PLACEHOLDER: Using mock fallback in case backend Auth endpoint is missing
export const registerUser = async (payload) => {
  try {
    return await apiClient.post('/Auth/register', payload);
  } catch (error) {
    console.warn("Backend /Auth/register is unreachable. Returning stub data.", error);
    return Promise.resolve({
      data: {
        message: "Registration successful (Mocked)",
        userId: 999,
        email: payload.email,
        role: payload.role
      }
    });
  }
};
