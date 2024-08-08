import axiosInstance from 'api/axiosInstance';
import Router from 'next/router';

export const logout = async () => {
  try {
    await axiosInstance.post('/api/logout');
    Router.push('/login');
  } catch (error) {
    //
  }
};
