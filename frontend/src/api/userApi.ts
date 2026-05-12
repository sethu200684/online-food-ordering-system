import api from './axios';

export const getAllUsers = () => api.get('/users');

export const getUserById = (id: number) => api.get(`/users/${id}`);

export const deleteUser = (id: number) => api.delete(`/users/${id}`);