import Router from 'next/router';
import { toast } from 'react-hot-toast';

import axiosInstance from './axiosInstance';

export const logout = async () => {
  try {
    await axiosInstance.post('/api/logout');
    Router.push('/login');
    toast.success('ออกจากระบบเรียบร้อยแล้ว');
  } catch (error) {
    toast.error('เกิดข้อผิดพลาดในการออกจากระบบ');
  }
};
