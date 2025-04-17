import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
  return axios.post(`${BASE_URL}/users/register`, data);
};
