import axios from 'axios';
import { WoundFormData } from 'types/AdminFormDataPostTypes';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

// สร้างข้อมูลแผลใหม่พร้อมกับรูปภาพ
export const createWound = async (data: WoundFormData, image: File) => {
  const formData = new FormData();
  formData.append('wound_name', data.wound_name);
  formData.append('wound_content', data.wound_content);
  formData.append('ref', data.ref);
  formData.append('image', image);

  const response = await axios.post(`${API_URL}/api/wounds`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// อ่านข้อมูลแผลทั้งหมด
export const getAllWounds = async () => {
  const response = await axios.get(`${API_URL}/api/wounds`);
  return response.data;
};

// อ่านข้อมูลแผลเฉพาะเจาะจงโดยใช้ ID
export const getWoundById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/wounds/${id}`);
  return response.data;
};

// อัปเดตข้อมูลแผลพร้อมกับรูปภาพ (ถ้ามีการอัปโหลดใหม่)
export const updateWound = async (
  id: string,
  data: WoundFormData,
  image?: File
) => {
  const formData = new FormData();
  formData.append('wound_name', data.wound_name);
  formData.append('wound_content', data.wound_content);
  formData.append('ref', data.ref);
  if (image) {
    formData.append('image', image); // แนบรูปภาพใน FormData ถ้ามี
  }

  const response = await axios.put(`${API_URL}/api/wounds/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ลบข้อมูลแผล
export const deleteWound = async (id: string) => {
  const response = await axios.delete(`${API_URL}/api/wounds/${id}`);
  return response.data;
};

// รับข้อมูลรูปแผล
export const getWoundImageUrl = (filePath: string) => {
  return `${API_URL}/api/uploads/${filePath}`;
};
