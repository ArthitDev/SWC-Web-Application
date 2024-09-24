import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

interface ContactData {
  contact_name: string;
  contact_email: string;
  contact_message: string;
  contact_subject: string;
}

// ฟังก์ชันสำหรับสร้าง contact
export const createContact = async (contactData: ContactData) => {
  const response = await axios.post(`${API_URL}/api/contact`, contactData);
  return response.data;
};

// ฟังก์ชันสำหรับดึงข้อมูลที่ยังไม่ได้อ่าน
export const getUnreadContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/contact/unread`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error fetching unread contacts'
    );
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลทั้งหมดของ contact โดยจัดเรียงตาม is_read
export const getAllContacts = async (
  category?: string,
  search?: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await axios.get(`${API_URL}/api/contact`, {
      params: {
        category,
        search,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error fetching all contacts'
    );
  }
};

export const getContactWithPagination = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
) => {
  const response = await axios.get(`${API_URL}/api/contact`, {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};

// ฟังก์ชันสำหรับอัปเดทค่า is_read
export const updateIsRead = async (id: number, isRead: number) => {
  try {
    const response = await axios.put(`${API_URL}/api/contact/${id}`, {
      isRead,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating contact');
  }
};
