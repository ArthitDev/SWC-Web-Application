import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import useRandomTricks from 'hooks/useRandomTrick';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';

const TrickCardHome = () => {
  const [currentTrickIndex, setCurrentTrickIndex] = useState(0);
  const { data: tricks, isLoading, error } = useRandomTricks();

  const nextTrick = useCallback(() => {
    if (tricks) {
      setCurrentTrickIndex((prevIndex) => (prevIndex + 1) % tricks.length);
    }
  }, [tricks]);

  useEffect(() => {
    const timer = setInterval(nextTrick, 8000);
    return () => clearInterval(timer);
  }, [nextTrick]);

  const handleDotClick = (index: number) => {
    setCurrentTrickIndex(index);
  };

  if (isLoading)
    return (
      <HomeCardLoading
        borderColor="#2ECC71"
        backgroundColor="#F2F9FC"
        progressColor="#2ECC71"
        textColor="#1B8F29"
      />
    );

  if (error)
    return (
      <HomeCardError
        borderColor="#2ECC71"
        backgroundColor="#F2F9FC"
        textColor="#1B8F29"
        errorMessage="ไม่สามารถโหลดข้อมูลได้"
      />
    );

  if (!tricks || tricks.length === 0)
    return (
      <HomeCardError
        borderColor="#2ECC71"
        backgroundColor="#F2F9FC"
        textColor="#1B8F29"
        errorMessage="ไม่มีข้อมูลในขณะนี้"
      />
    );

  const handleViewMore = () => {
    router.push('/app/trick');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: '#F2F9FC',
        borderRadius: '16px',
        padding: 0,
        width: '100%',
        maxWidth: 500,
        height: 180,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: 4,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#2ECC71',
          width: '8px',
          height: '100%',
        }}
      />
      <Box
        sx={{
          padding: 2,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1B8F29',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span role="img" aria-label="lightbulb" style={{ marginRight: 8 }}>
              💡
            </span>
            เคล็ดไม่ลับ
          </Typography>
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrickIndex}
            initial={{ opacity: 0 }} // เริ่มต้นด้วยความโปร่งใส 0
            animate={{ opacity: 1 }} // แสดงด้วยความโปร่งใส 1
            exit={{ opacity: 0 }} // ค่อยๆ หายด้วยความโปร่งใส 0
            transition={{ duration: 0.5 }} // กำหนดระยะเวลาแอนิเมชัน
          >
            <Typography
              sx={{
                fontSize: '1rem',
                color: '#000000',
                lineHeight: 1.5,
                flexGrow: 1,
                overflow: 'auto',
                marginBottom: 3,
              }}
            >
              {tricks[currentTrickIndex].trick_content}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {tricks.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)} // Add this to make the dot clickable
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor:
                index === currentTrickIndex ? '#2ECC71' : '#666666',
              margin: '0 4px',
              cursor: 'pointer', // Add cursor pointer to indicate clickable
            }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={handleViewMore}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          borderRadius: '12px',
          backgroundColor: '#34C759',
          fontSize: 14,
          fontWeight: 'bold',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1B8F29',
          },
          textTransform: 'none',
          padding: '6px 12px',
          boxShadow: 'none',
        }}
        endIcon={<ArrowForwardIcon />}
      >
        ดูเพิ่มเติม
      </Button>
    </Card>
  );
};

export default TrickCardHome;
