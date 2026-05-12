import api from './axios';
import { FoodItem } from '../types';

export const getAllFoods = () => api.get('/foods');

export const getFoodById = (id: number) => api.get(`/foods/${id}`);

export const getFoodsByCategory = (categoryId: number) =>
  api.get(`/foods/category/${categoryId}`);

export const createFood = (data: Partial<FoodItem>) => api.post('/foods', data);

export const deleteFood = (id: number) => api.delete(`/foods/${id}`);