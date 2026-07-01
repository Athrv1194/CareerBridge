import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('careerbridge_token');
    const userData = localStorage.getItem('careerbridge_user');
    if (token && userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error("Failed to parse user data", e);
        localStorage.removeItem('careerbridge_user');
        return null;
      }
    }
    return null;
  });

  const login = (token, userObj) => {
    localStorage.setItem('careerbridge_token', token);
    localStorage.setItem('careerbridge_user', JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem('careerbridge_token');
    localStorage.removeItem('careerbridge_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
