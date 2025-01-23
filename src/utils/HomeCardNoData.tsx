import { Box, Card, Typography } from '@mui/material';
import React from 'react';

interface HomeCardErrorProps {
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  errorMessage?: string;
}

const HomeCardError: React.FC<HomeCardErrorProps> = ({
  borderColor = '#EAB308', // สีขอบเริ่มต้น
  backgroundColor = '#F2F9FC', // สีพื้นหลังเริ่มต้น
  textColor = '#000000', // สีของข้อความ
  errorMessage = 'Error loading data', // ข้อความแสดงข้อผิดพลาด
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor,
        borderRadius: '16px',
        padding: 0,
        width: '100%',
        maxWidth: 500,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: borderColor,
          width: '8px',
        }}
      />
      <Box
        sx={{
          padding: 2,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            color: textColor,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span role="img" aria-label="error" style={{ marginRight: 8 }}>
            ⚠️
          </span>
          {errorMessage}
        </Typography>
      </Box>
    </Card>
  );
};

export default HomeCardError;
