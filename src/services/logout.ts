import Router from 'next/router';

import axiosInstance from './axiosInstance';

export const logout = async () => {
  try {
    await axiosInstance.post('/api/logout');
    Router.push('/login');
  } catch (error) {
    //
  }
};
