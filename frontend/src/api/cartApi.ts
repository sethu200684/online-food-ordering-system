import api from './axios';

export const getCart = (userId: number) => api.get(`/cart/${userId}`);

export const addToCart = (userId: number, foodItemId: number, quantity: number) =>
  api.post(`/cart/${userId}/add`, null, {
    params: { foodItemId, quantity },
  });

export const removeFromCart = (cartItemId: number) =>
  api.delete(`/cart/item/${cartItemId}`);

