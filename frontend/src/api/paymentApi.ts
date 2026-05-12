import api from './axios';

export const processPayment = (data: { amount: number; order: { id: number } }) =>
  api.post('/payments', data);

export const getPaymentById = (id: number) => api.get(`/payments/${id}`);