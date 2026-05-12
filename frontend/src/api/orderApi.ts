import api from './axios';

export const getAllOrders = () => api.get('/orders');

export const getOrdersByUser = (userId: number) =>
  api.get(`/orders/user/${userId}`);

export const placeOrder = (data: { totalAmount: number; user: { id: number } }) =>
  api.post('/orders', data);

export const updateOrderStatus = (id: number, status: string) =>
  api.put(`/orders/${id}/status`, null, { params: { status } });