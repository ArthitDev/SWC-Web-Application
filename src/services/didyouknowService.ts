import axios from 'axios';
import { DidyouknowFormData } from 'types/AdminFormDataPostTypes';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

// สร้างข้อมูลใหม่
export const createDidyouknow = async (data: DidyouknowFormData) => {
  const response = await axios.post(`${API_URL}/api/didyouknow`, data);
  return response.data;
};

// ดึงข้อมูลทั้งหมด
export const getAllDidyouknow = async () => {
  const response = await axios.get(`${API_URL}/api/didyouknow`);
  return response.data;
};

// ดึงข้อมูลตาม ID
export const getDidyouknowkById = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/didyouknow/${id}`);
  return response.data;
};

// อัปเดตข้อมูลตาม ID
export const updateDidyouknow = async (
  id: number,
  data: DidyouknowFormData
) => {
  const response = await axios.put(`${API_URL}/api/didyouknow/${id}`, data);
  return response.data;
};

// ลบข้อมูลตาม ID
export const deleteDidyouknow = async (id: number) => {
  const response = await axios.delete(`${API_URL}/api/didyouknow/${id}`);
  return response.data;
};
