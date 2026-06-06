import api from './api.js';

const articleService = {
  getAll: async () => {
    const response = await api.get('/articles');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/articles/slug/${slug}`);
    return response.data;
  },
  getAllAdmin: async () => {
    const response = await api.get('/articles/admin/all');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/articles', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/articles/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

export default articleService;
