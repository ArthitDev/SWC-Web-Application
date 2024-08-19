import axios from 'axios';
import { TrickFormData } from 'types/AdminFormDataPostTypes';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

// สร้างข้อมูลใหม่
export const createTrick = async (data: TrickFormData) => {
  const response = await axios.post(`${API_URL}/api/tricks`, data);
  return response.data;
};

// ดึงข้อมูลทั้งหมด
export const getAllTricks = async () => {
  const response = await axios.get(`${API_URL}/api/tricks`);
  return response.data;
};

// ดึงข้อมูลตาม ID
export const getTrickById = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/tricks/${id}`);
  return response.data;
};

// อัปเดตข้อมูลตาม ID
export const updateTrick = async (id: number, data: TrickFormData) => {
  const response = await axios.put(`${API_URL}/api/tricks/${id}`, data);
  return response.data;
};

// ลบข้อมูลตาม ID
export const deleteTrick = async (id: number) => {
  const response = await axios.delete(`${API_URL}/api/tricks/${id}`);
  return response.data;
};
