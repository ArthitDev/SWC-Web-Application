import { Box, Card, CircularProgress, Typography } from '@mui/material';
import React from 'react';

import COLORS from '@/themes/colors';

const TopCardLoading: React.FC = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F9FC',
        borderRadius: '16px',
        padding: 0,
        width: '100%',
        maxWidth: 500,
        boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
        minHeight: '100px',
        marginBottom: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress sx={{ color: COLORS.blue[6] }} size={20} />
        <Typography
          sx={{
            fontSize: '0.875rem',
            marginTop: 1.5,
            lineHeight: 1.5,
            textAlign: 'center',
            color: COLORS.blue[6],
          }}
        >
          กำลังโหลดข้อมูล . . .
        </Typography>
      </Box>
    </Card>
  );
};

export default TopCardLoading;
