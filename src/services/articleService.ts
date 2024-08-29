import axios from 'axios';
import { ArticleFormData } from 'types/AdminFormDataPostTypes';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

// สร้างข้อมูลบทความใหม่พร้อมกับรูปภาพ
export const createArticle = async (data: ArticleFormData, image: File) => {
  const formData = new FormData();
  formData.append('article_name', data.article_name);
  formData.append('author_name', data.author_name);
  formData.append('article_content', data.article_content);
  formData.append('ref', data.ref);
  formData.append('image', image);

  const response = await axios.post(`${API_URL}/api/articles`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// อ่านข้อมูลบทความทั้งหมด
export const getAllArticle = async () => {
  const response = await axios.get(`${API_URL}/api/articles`);
  return response.data;
};

// อ่านข้อมูลบทความเฉพาะเจาะจงโดยใช้ ID
export const getArticleById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/articles/${id}`);
  return response.data;
};

// อัปเดตข้อมูลบทความพร้อมกับรูปภาพ (ถ้ามีการอัปโหลดใหม่)
export const updateArticle = async (
  id: string,
  data: ArticleFormData,
  image?: File
) => {
  const formData = new FormData();
  formData.append('article_name', data.article_name);
  formData.append('author_name', data.author_name);
  formData.append('article_content', data.article_content);
  formData.append('ref', data.ref);
  if (image) {
    formData.append('image', image); // แนบรูปภาพใน FormData ถ้ามี
  }

  const response = await axios.put(`${API_URL}/api/articles/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ลบข้อมูลบทความ
export const deleteArticle = async (id: string) => {
  const response = await axios.delete(`${API_URL}/api/articles/${id}`);
  return response.data;
};

// รับข้อมูลรูปบทความ
export const getArticleImageUrl = (filePath: string) => {
  return `${API_URL}/api/uploads/${filePath}`;
};

// บันทึกการคลิกสำหรับบทความ
export const trackArticleClick = async (
  articleId: string,
  clickCount: number
) => {
  const response = await axios.post(
    `${API_URL}/api/articles/${articleId}/click`,
    { click_count: clickCount }
  );
  return response.data;
};

// อ่านข้อมูลบทความ Top 5 ตามการ Click
export const getTopArticle = async () => {
  const response = await axios.get(`${API_URL}/api/top-articles`);
  return response.data;
};
