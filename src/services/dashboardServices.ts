import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

// ฟังก์ชันสำหรับดึงข้อมูล dashboard
export const getDashboardData = async () => {
  const response = await axios.get(`${API_URL}/api/dashboard`);
  return response.data;
};

// ฟังก์ชันสำหรับดึงข้อมูลบทความพร้อมจำนวนคลิก
export const getArticleClickData = async () => {
  const response = await axios.get(`${API_URL}/api/dashboard/article-click`);
  return response.data;
};

export const getWoundClickData = async () => {
  const response = await axios.get(`${API_URL}/api/dashboard/wound-click`);
  return response.data;
};
