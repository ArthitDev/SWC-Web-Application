import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import useRandomWound from '@/hooks/useRandomWound';
import COLORS from '@/themes/colors';
import TagNotFound from '@/utils/TagNotFound';

// ฟังก์ชันสุ่มสี (สีเข้ม)
const getRandomColor = () => {
  const colors = ['#FF4500', '#D81B60', '#1B5E20', '#E65100', '#4A148C']; // สีที่เข้มขึ้น
  return colors[Math.floor(Math.random() * colors.length)];
};

const WoundTag: React.FC = () => {
  const router = useRouter();

  // ใช้ custom hook เพื่อดึงข้อมูลแผล 8 รายการ
  const { randomWounds, isLoading, error } = useRandomWound();

  const handleClick = (id: string) => {
    // นำ id ไปในเส้นทาง /app/wound/[id]
    router.push(`/app/wound/${id}`);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="20vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <TagNotFound />;
  }

  return (
    <Box>
      <Box pb={1}>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          แผลอื่น ๆ
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {randomWounds.map((wound) => (
          <Chip
            key={wound.id}
            label={wound.wound_name}
            clickable
            onClick={() => handleClick(wound.id)}
            sx={{
              margin: 0.5,
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: getRandomColor(),
              fontWeight: 'bold',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: COLORS.blue[6],
              },
              '&:active': {
                boxShadow: 'none',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default WoundTag;
