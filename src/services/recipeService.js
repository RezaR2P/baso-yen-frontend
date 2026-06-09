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
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          // Array (ingredients/steps) di-stringify dulu
          formData.append(key, JSON.stringify(data[key]));
        } else if (typeof data[key] === 'boolean') {
          formData.append(key, data[key] ? 1 : 0);
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    const response = await api.post('/recipes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]));
        } else if (typeof data[key] === 'boolean') {
          formData.append(key, data[key] ? 1 : 0);
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    const response = await api.put(`/recipes/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
