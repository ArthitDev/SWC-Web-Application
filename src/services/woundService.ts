import axios from 'axios';
import {
  WoundFormData,
  WoundFormDataMulti,
} from 'types/AdminFormDataPostTypes';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

// สร้างข้อมูลแผลใหม่พร้อมกับรูปภาพและชื่อภาษาไทย-อังกฤษ
export const createWound = async (data: WoundFormData, image: File) => {
  const formData = new FormData();
  formData.append('wound_name', data.wound_name);
  formData.append('wound_name_th', data.wound_name);
  formData.append('wound_name_en', data.wound_name_en);
  formData.append('wound_content', data.wound_content);
  formData.append('wound_note', data.wound_note);
  formData.append('ref', JSON.stringify(data.ref));
  formData.append('image', image);

  const response = await axios.post(`${API_URL}/api/wounds`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// อ่านข้อมูลแผลทั้งหมดพร้อม pagination และ search functionality
export const getWoundsWithPagination = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
) => {
  const response = await axios.get(`${API_URL}/api/wounds`, {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};

// อ่านข้อมูลแผลทั้งหมด (แบบไม่แบ่งหน้า) พร้อม search functionality
export const getAllWounds = async (search: string = '') => {
  const response = await axios.get(`${API_URL}/api/wounds`, {
    params: {
      search,
    },
  });
  return response.data;
};

// อ่านข้อมูลแผลเฉพาะเจาะจงโดยใช้ ID
export const getWoundById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/wounds/${id}`);
  return response.data;
};

export const updateWound = async (
  id: string,
  data: WoundFormData,
  image?: File
) => {
  const formData = new FormData();
  formData.append('wound_name', data.wound_name);
  formData.append('wound_name_th', data.wound_name); // ใช้ wound_name เป็น wound_name_th (ภาษาไทย)
  formData.append('wound_name_en', data.wound_name_en); // ใช้ wound_name_en
  formData.append('wound_content', data.wound_content);
  formData.append('wound_note', data.wound_note);
  formData.append('ref', JSON.stringify(data.ref));
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

// ติดตามการคลิกที่แผล
export const trackWoundClick = async (woundId: string, clickCount: number) => {
  const response = await axios.post(`${API_URL}/api/wounds/${woundId}/click`, {
    click_count: clickCount,
  });
  return response.data;
};

// สำหรับหลายรูป

// สร้างข้อมูลแผลใหม่พร้อมกับรูปภาพและชื่อภาษาไทย-อังกฤษ
export const createWounds = async (
  data: WoundFormDataMulti,
  images: File[]
) => {
  const formData = new FormData();

  // Append text fields
  formData.append('wound_name', data.wound_name);
  formData.append('wound_name_th', data.wound_name);
  formData.append('wound_name_en', data.wound_name_en);
  formData.append('wound_content', data.wound_content);
  formData.append('wound_note', data.wound_note);
  formData.append('ref', JSON.stringify(data.ref));

  // Append multiple images
  images.forEach((image) => {
    formData.append('images', image); // ส่งไฟล์หลายไฟล์ไปยัง API โดยใช้ฟิลด์ 'images'
  });

  // Send the request with multipart/form-data
  const response = await axios.post(`${API_URL}/api/wounds/multi`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// อัปเดตข้อมูลแผลพร้อมกับรูปภาพ (ถ้ามีการอัปโหลดใหม่) และชื่อภาษาไทย-อังกฤษ
export const updateWounds = async (
  id: string,
  data: WoundFormDataMulti,
  images: File[]
) => {
  const formData = new FormData();

  // Append text fields
  formData.append('wound_name', data.wound_name);
  formData.append('wound_name_th', data.wound_name);
  formData.append('wound_name_en', data.wound_name_en);
  formData.append('wound_content', data.wound_content);
  formData.append('wound_note', data.wound_note);
  formData.append('ref', JSON.stringify(data.ref));

  // Append multiple images (handle array of images)
  images.forEach((image, index) => {
    formData.append(`wound_cover[${index}]`, image); // ส่งไฟล์หลายไฟล์ไปยัง API
  });

  // Send the request with multipart/form-data
  const response = await axios.put(`${API_URL}/api/wounds/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getWoundImageUrls = (filePaths: string) => {
  if (!filePaths) return []; // ถ้าไม่มีค่า filePaths, คืนค่า array ว่าง

  const filePathArray = filePaths.includes(',')
    ? filePaths.split(',').map((filePath) => filePath.trim()) // ถ้ามีหลายรูป
    : [filePaths]; // ถ้ามีรูปเดียว

  // สร้าง URL สำหรับแต่ละไฟล์
  return filePathArray.map((filePath) => `${API_URL}/api/uploads/${filePath}`);
};
