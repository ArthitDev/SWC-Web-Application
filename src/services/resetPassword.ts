import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const response = await axios.post(`${API_URL}/api/reset-password`, data);
  return response.data;
};
