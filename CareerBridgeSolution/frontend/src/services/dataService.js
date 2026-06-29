import apiClient from './api';

// PLACEHOLDER: Mock fallback for getting career paths
export const getCareerPaths = async () => {
  try {
    return await apiClient.get('/paths');
  } catch (error) {
    console.warn("Backend /paths is unreachable. Returning stub career paths.", error);
    return Promise.resolve({
      data: [
        { id: 1, name: '.NET Developer' },
        { id: 2, name: 'Java Developer' },
        { id: 3, name: 'Frontend Engineer' }
      ]
    });
  }
};

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

// PLACEHOLDER: Mock login fallback
export const loginUser = async (payload) => {
  try {
    return await apiClient.post('/Auth/login', payload);
  } catch (error) {
    console.warn("Backend /Auth/login is unreachable. Returning stub JWT token.", error);
    return Promise.resolve({
      data: {
        token: "eyMockJwtToken123456789.Alpha.Stub",
        message: "Login successful (Mocked)"
      }
    });
  }
};
