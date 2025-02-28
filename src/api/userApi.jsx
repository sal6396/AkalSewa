import { apiClient } from './apiClient';

export const getUserProfile = (userId, token) => {
  return apiClient('Login_Api/login', 'POST', { userId }, token);
};


