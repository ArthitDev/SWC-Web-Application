import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Fab } from '@mui/material';
import { keyframes, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import COLORS from '@/themes/colors';

// สร้าง keyframes สำหรับ breathing effect
const breatheAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  // ตรวจสอบเมื่อเลื่อนลงมาถึงล่างสุดของหน้า
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // ฟังก์ชันสำหรับเลื่อนกลับไปด้านบนสุดของหน้า
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Fab
      onClick={scrollToTop}
      sx={{
        backgroundColor: 'rgba(58, 156, 253, 1)',
        color: 'white',
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(2),
        display: isVisible ? 'inline-flex' : 'none',
        animation: `${breatheAnimation} 2s ease-in-out infinite`, // ใช้ animation breathing
        '&:hover': {
          backgroundColor: COLORS.blue[6],
        },
      }}
    >
      <ArrowUpwardIcon />
    </Fab>
  );
};

export default ScrollToTop;
