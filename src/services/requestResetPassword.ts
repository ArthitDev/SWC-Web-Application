import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const requestResetPassword = async (data: { email: string }) => {
  const response = await axios.post(
    `${API_URL}/api/request-reset-password`,
    data
  );
  return response.data;
};
