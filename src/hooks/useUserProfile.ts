import axios from 'axios';
import { useQuery } from 'react-query';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

const fetchUserProfile = async () => {
  const { data } = await axios.get(`${API_URL}/api/profile`, {
    withCredentials: true,
  });
  return data;
};

export const useUserProfile = () => {
  return useQuery('userProfile', fetchUserProfile);
};
