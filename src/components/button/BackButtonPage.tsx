import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface BackButtonPageProps {
  label?: string;
  onClick?: () => void;
  customRoute?: string;
}

const BackButtonPage: React.FC<BackButtonPageProps> = ({
  label = 'กลับ',
  onClick,
  customRoute,
}) => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // เช็คขนาดหน้าจอ

  const handleBackClick = () => {
    const currentPage = router.query.page;
    const { pathname } = router; // ดึงเส้นทางปัจจุบัน เช่น /app/wound/[id]

    if (currentPage) {
      const dynamicPath = pathname.replace(/\/\[[^\]]+\]/, '');
      router.push(`${dynamicPath}?page=${currentPage}`);
    } else {
      router.back();
    }
    if (customRoute) {
      router.push(customRoute);
    } else if (onClick) {
      onClick();
    }
  };

  const getTruncatedLabel = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '60px',
        marginBottom: '16px',
      }}
    >
      <Button
        onClick={handleBackClick}
        color="primary"
        sx={{
          textTransform: 'none',
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <ArrowBackIcon sx={{ fontSize: '1.7rem' }} />
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.5rem',
            fontWeight: '500',
          }}
        >
          {isSmallScreen ? getTruncatedLabel(label, 28) : label}
        </Typography>
      </Button>
    </Box>
  );
};

export default BackButtonPage;
