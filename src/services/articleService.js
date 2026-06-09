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
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(
          key,
          typeof data[key] === 'boolean' ? (data[key] ? 1 : 0) : data[key]
        );
      }
    });
    const response = await api.post('/articles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  update: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(
          key,
          typeof data[key] === 'boolean' ? (data[key] ? 1 : 0) : data[key]
        );
      }
    });
    const response = await api.put(`/articles/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

export default articleService;
