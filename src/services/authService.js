// src/services/authService.js
import api from './api.js';

const authService = {
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },

  getToken: () => localStorage.getItem('token'),

  isLoggedIn: () => !!localStorage.getItem('token'),
};

export default authService;
