import api from './axios';

export const signUp = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/signup', data);

export const signIn = (data: { email: string; password: string }) =>
  api.post('/auth/signin', data);