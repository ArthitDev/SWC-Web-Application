import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // เพิ่มไอคอน
import { Box, Button, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import COLORS from 'theme/colors';

const NoPredictFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/app/predict');
  };

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
          maxWidth: 500,
          padding: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography pb={1} variant="h4" color="error" fontWeight={'medium'}>
            ไม่พบข้อมูลการวิเคราะห์
          </Typography>
          <Typography pb={1} variant="body1" gutterBottom>
            กรุณาแนบหรือถ่ายรูปภาพเพื่อวิเคราะห์อีกครั้ง
          </Typography>
          <Typography variant="h4">¯\_(ツ)_/¯</Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: COLORS.blue[6] }}
            onClick={handleGoBack}
            startIcon={<ArrowBackIcon />} // เพิ่มไอคอนที่นี่
          >
            กลับไปหน้าวิเคราะห์
          </Button>
        </CardContent>
      </Box>
    </Box>
  );
};

export default NoPredictFound;
