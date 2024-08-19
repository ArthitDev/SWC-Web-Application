import { Box } from '@mui/material';
import React from 'react';
import Loading from 'utils/Loading';

// ไฟล์นี้เรียกใช้การรอโหลดข้อมูลจาก API แบบทำซ้ำการโหลดแบบ skeleton loading
const MultiLoading = () => {
  return (
    <Box pt={0}>
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
    </Box>
  );
};

export default MultiLoading;
