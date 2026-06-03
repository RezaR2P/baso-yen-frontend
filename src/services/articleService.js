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
};

export default articleService;
