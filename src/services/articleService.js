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
};

export default articleService;
