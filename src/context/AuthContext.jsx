import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set the base URL for all API requests
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
});

// Utility to set the global auth token for axios
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null); // You can add a route to get user data if needed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true); // Simplified: in a real app, you'd verify the token first
    }
    setLoading(false);
  }, [token]);

  // --- MODIFIED LOGIN FUNCTION ---
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      setAuthToken(res.data.token);
      setIsAuthenticated(true);
    } catch (err) {
      // Re-throw the error so the component can catch it
      throw new Error(err.response.data.msg || 'Login failed');
    }
  };

  // --- MODIFIED REGISTER FUNCTION ---
  const register = async (email, password) => {
    try {
      const res = await api.post('/auth/register', { email, password });
      setToken(res.data.token);
      setAuthToken(res.data.token);
      setIsAuthenticated(true);
    } catch (err) {
      // Re-throw the error so the component can catch it
      throw new Error(err.response.data.msg || 'Registration failed');
    }
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        api, // Export the api instance
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;