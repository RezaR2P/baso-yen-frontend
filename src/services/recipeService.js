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
};

export default recipeService;
