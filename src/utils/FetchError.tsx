import { Box, CardContent, Typography } from '@mui/material';
import React from 'react';

const FetchError = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Box
        sx={{
          maxWidth: 450,
          padding: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography pb={1} variant="h4" color="error" fontWeight={'medium'}>
            ไม่สามารถดึงข้อมูลได้
          </Typography>
          <Typography pb={1} variant="body1" gutterBottom>
            ตรวจสอบการเชื่อมต่อฐานข้อมูลหรือติดต่อผู้ที่เกี่ยวข้อง
          </Typography>
          <Typography variant="h4">¯\_(ツ)_/¯</Typography>
        </CardContent>
      </Box>
    </Box>
  );
};

export default FetchError;
