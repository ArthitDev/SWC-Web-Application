import toast from 'react-hot-toast';

// ฟังก์ชันสำหรับแสดงการแจ้งเตือน error จาก validation
export const showValidationError = (errors: any) => {
  if (!errors) return;

  Object.keys(errors).forEach((field) => {
    const errorMessage = errors[field]?.message;
    if (errorMessage) {
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF3333', // พื้นหลังสีแดง
          color: '#FFFFFF', // ข้อความสีขาว
        },
        iconTheme: {
          primary: '#FFFFFF', // สีไอคอน (ตัวกากบาท) เป็นสีขาว
          secondary: '#FF3333', // สีพื้นหลังของไอคอน
        },
      });
    }
  });
};
