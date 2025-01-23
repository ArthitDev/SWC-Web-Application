import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, Button, keyframes } from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';

// สร้าง keyframes สำหรับ breathing effect
const breatheAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ScrollToTopButton: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ textAlign: 'center', pb: 5 }}>
      <Button
        onClick={handleScrollToTop}
        sx={{
          backgroundColor: COLORS.blue[6],
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '20px',
          animation: `${breatheAnimation} 2s ease-in-out infinite`, // ใช้ animation breathing
          '&:hover': {
            backgroundColor: COLORS.blue[6],
          },
        }}
        startIcon={<ArrowUpwardIcon />}
      >
        เลื่อนกลับไปด้านบน
      </Button>
    </Box>
  );
};

export default ScrollToTopButton;
