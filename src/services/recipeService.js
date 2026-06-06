import api from './api.js';

const recipeService = {
  getAll: async () => {
    const response = await api.get('/recipes');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/recipes/slug/${slug}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/recipes', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/recipes/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  },
  getAllAdmin: async () => {
    const response = await api.get('/recipes/admin/all');
    return response.data;
  },
};

export default recipeService;
