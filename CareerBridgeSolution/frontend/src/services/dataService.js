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

// PLACEHOLDER: Mock fallback for getting roadmap steps
export const getRoadmap = async (pathId) => {
  try {
    return await apiClient.get(`/paths/${pathId}/roadmap`);
  } catch (error) {
    console.warn(`Backend /paths/${pathId}/roadmap is unreachable. Returning stub roadmap.`, error);
    
    let mockSteps = [];
    if (pathId === "1") {
      mockSteps = [
        { id: 101, title: 'C# Basics', status: 'Completed' },
        { id: 102, title: 'Entity Framework Core', status: 'Not Started' },
        { id: 103, title: 'SQL Server', status: 'Not Started' },
      ];
    } else if (pathId === "2") {
      mockSteps = [
        { id: 201, title: 'Java SE 17', status: 'Completed' },
        { id: 202, title: 'Spring Boot', status: 'Not Started' },
        { id: 203, title: 'Hibernate', status: 'Not Started' },
      ];
    } else {
      mockSteps = [
        { id: 301, title: 'HTML/CSS/JS', status: 'Completed' },
        { id: 302, title: 'React 18', status: 'Completed' },
        { id: 303, title: 'Redux Toolkit', status: 'Not Started' },
      ];
    }
    
    return Promise.resolve({ data: mockSteps });
  }
};

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
