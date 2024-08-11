import axios from 'axios';
import Router from 'next/router';

import { refreshToken } from './refreshToken';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.retryAttempted) {
      originalRequest.retryAttempted = true;
      try {
        const newAccessToken = await refreshToken();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Router.push('/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
