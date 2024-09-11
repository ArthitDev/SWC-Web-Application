import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

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
      color="primary"
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(2),
        display: isVisible ? 'inline-flex' : 'none',
      }}
    >
      <ArrowUpwardIcon />
    </Fab>
  );
};

export default ScrollToTop;
