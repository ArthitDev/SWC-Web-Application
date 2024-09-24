import { useQuery } from 'react-query';
import { getUnreadContacts } from 'services/contactService'; // ฟังก์ชันสำหรับดึงข้อมูล

import useRefetchWebSocket from './useRefetchWebSocket';

// Custom hook เพื่อดึงข้อมูล contact ที่ไม่ถูกอ่าน
const useShowNotification = () => {
  useRefetchWebSocket('unreadContacts', 'UPDATE_CONTACTS');

  return useQuery('unreadContacts', getUnreadContacts, {
    staleTime: 30000, // ข้อมูลจะถือว่าเป็น stale หลังจาก 30 วินาที
    cacheTime: 300000, // ข้อมูลจะถูกเก็บในแคช 5 นาที
  });
};

export default useShowNotification;
