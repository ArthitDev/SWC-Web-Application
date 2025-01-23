import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const registerAdmin = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/api/register`, data);
  return response.data;
};
