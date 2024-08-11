import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const loginAdmin = async (data: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/api/login`, data);
  return response.data;
};
