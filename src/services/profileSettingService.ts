import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

// ฟังก์ชันสำหรับการดึงข้อมูลโปรไฟล์
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/profile-setting`, {
      withCredentials: true, // ใช้สำหรับส่งคุกกี้พร้อมกับคำขอ
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};

// ฟังก์ชันสำหรับการอัพเดตโปรไฟล์ พร้อมกับรูปภาพ
export const updateProfile = async (id: number, data: FormData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/profile-setting/${id}`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update profile');
  }
};

// ฟังก์ชันสำหรับการเปลี่ยนรหัสผ่าน
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/change-password`, data, {
      withCredentials: true, // ใช้สำหรับส่งคุกกี้พร้อมกับคำขอ
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// ฟังก์ชันสำหรับการปิดใช้งานบัญชี
export const deactivateAccount = async () => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/delete-account`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to deactivate account');
  }
};

export const getProfileImageUrl = (filePath: string) => {
  return `${API_URL}/api/uploads/${filePath}`;
};
