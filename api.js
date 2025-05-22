import axios from 'axios';

const API_URL = 'http://192.168.0.247:3000/api'; // Cambia localhost por tu IP si usas dispositivo físico

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/users`, userData);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const getUserById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/${userId}`);
  return res.data;
};