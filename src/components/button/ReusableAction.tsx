import { Box, IconButton } from '@mui/material';
import React from 'react';

interface ReusableActionProps {
  icon: React.ReactNode; // รับไอคอนเป็น prop
  backgroundColor: string; // รับสีพื้นหลังเป็น prop
  onClick: () => void; // รับฟังก์ชั่นสำหรับการคลิก
  iconSize?: number; // ขนาดไอคอน (ไม่จำเป็น)
}

const ReusableAction: React.FC<ReusableActionProps> = ({
  icon,
  backgroundColor,
  onClick,
  iconSize = 20, // ตั้งค่าเริ่มต้นของขนาดไอคอนเป็น 20
}) => {
  return (
    <Box
      sx={{
        backgroundColor,
        p: 0.5,
        borderRadius: 1,
        display: 'inline-flex',
      }}
    >
      <IconButton color="inherit" onClick={onClick}>
        {React.cloneElement(icon as React.ReactElement, {
          sx: { color: 'white', fontSize: iconSize },
        })}
      </IconButton>
    </Box>
  );
};

export default ReusableAction;
