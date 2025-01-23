import { Box, Card, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface HomeCardLoadingProps {
  borderColor?: string;
  backgroundColor?: string;
  progressColor?: string;
  textColor?: string;
}

const HomeCardLoading: React.FC<HomeCardLoadingProps> = ({
  borderColor = '#EAB308', // สีขอบเริ่มต้น
  backgroundColor = '#F2F9FC', // สีพื้นหลังเริ่มต้น
  progressColor = '#EAB308', // สีของวงกลม loading
  textColor = '#000000', // สีของข้อความ
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
        <CircularProgress sx={{ color: progressColor }} />
        <Typography
          sx={{
            fontSize: '1rem',
            marginTop: 2,
            color: textColor,
            lineHeight: 1.5,
          }}
        >
          กำลังโหลดข้อมูล . . .
        </Typography>
      </Box>
    </Card>
  );
};

export default HomeCardLoading;
