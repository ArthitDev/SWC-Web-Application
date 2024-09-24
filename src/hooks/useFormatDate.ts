import { useCallback } from 'react';

const useFormatDate = () => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    // การใช้ 'th-TH' สำหรับรูปแบบภาษาไทย และแยกวันที่และเวลา
    const formattedDate = date.toLocaleDateString('th-TH', dateOptions);
    const formattedTime = date.toLocaleTimeString('th-TH', timeOptions);

    // รวมวันที่และเวลาในรูปแบบที่ต้องการ
    return `${formattedDate} - ${formattedTime}`;
  }, []);

  return { formatDate };
};

export default useFormatDate;
