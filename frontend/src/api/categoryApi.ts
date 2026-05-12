import api from './axios';

export const getAllCategories = () => api.get('/categories');

export const getCategoryById = (id: number) => api.get(`/categories/${id}`);

export const createCategory = (data: { name: string }) =>
  api.post('/categories', data);

export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);