import api from './api.js';

const contactService = {
  getAll: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/contacts', data);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/contacts/${id}/status`, { status });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};

export default contactService;
