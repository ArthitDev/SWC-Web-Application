import { Box, CardContent, Typography } from '@mui/material';
import React from 'react';

const DataNotFound = () => {
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
          maxWidth: 400,
          padding: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography pb={1} variant="h4" color="error" fontWeight={'medium'}>
            ไม่มีข้อมูลในฐานข้อมูล
          </Typography>
          <Typography pb={1} variant="body1" gutterBottom>
            ลองเพิ่มข้อมูลและรีโหลดหน้าใหม่อีกครั้ง
          </Typography>
          <Typography variant="h4">¯\_(ツ)_/¯</Typography>
        </CardContent>
      </Box>
    </Box>
  );
};

export default DataNotFound;
