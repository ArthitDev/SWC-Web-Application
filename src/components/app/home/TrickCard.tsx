import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import useRandomTricks from 'hooks/useRandomTrick';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';

const TrickCardHome = () => {
  const [currentTrickIndex, setCurrentTrickIndex] = useState(0);
  const [isNext, setIsNext] = useState(true); // ใช้เพื่อเช็คทิศทางการเลื่อน
  const { data: tricks, isLoading, error } = useRandomTricks();

  const nextTrick = useCallback(() => {
    if (tricks) {
      setIsNext(true); // ตั้งค่าเป็น true เมื่อเลื่อนไปข้างหน้า
      setCurrentTrickIndex((prevIndex) => (prevIndex + 1) % tricks.length);
    }
  }, [tricks]);

  const previousTrick = useCallback(() => {
    if (tricks) {
      setIsNext(false); // ตั้งค่าเป็น false เมื่อเลื่อนไปข้างหลัง
      setCurrentTrickIndex((prevIndex) =>
        prevIndex === 0 ? tricks.length - 1 : prevIndex - 1
      );
    }
  }, [tricks]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextTrick,
    onSwipedRight: previousTrick,
  });

  useEffect(() => {
    const timer = setInterval(nextTrick, 10000);
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
        height: 'auto',
        boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: 4,
        position: 'relative',
      }}
      {...swipeHandlers}
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
          position: 'relative',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 1,
            overflowX: 'hidden',
            borderRadius: 'inherit',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrickIndex}
              initial={{ x: isNext ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isNext ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                overflow: 'hidden',
                borderRadius: 'inherit',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1B8F29',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  role="img"
                  aria-label="lightbulb"
                  style={{ marginRight: 8 }}
                >
                  💡
                </span>
                {tricks[currentTrickIndex].trick_name}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingBottom: '60px',
            overflowX: 'hidden',
            borderRadius: 'inherit',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrickIndex}
              initial={{ x: isNext ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isNext ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                overflow: 'hidden',
                borderRadius: 'inherit',
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  color: '#000000',
                  lineHeight: 1.5,
                }}
              >
                {tricks[currentTrickIndex].trick_content}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 56,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {tricks.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor:
                index === currentTrickIndex ? '#2ECC71' : '#666666',
              margin: '0 4px',
              cursor: 'pointer',
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
          fontSize: 14,
          fontWeight: 'medium',
          backgroundColor: '#34C759',
          transition: 'transform 0.3s',
          '&:hover': {
            backgroundColor: '#1B8F29',
            transform: 'translateX(5px)',
          },
          textTransform: 'none',
          padding: '6px 12px',
          boxShadow: 'none',
          marginTop: '20px',
        }}
        endIcon={<ArrowForwardIcon />}
      >
        ดูเพิ่มเติม
      </Button>
    </Card>
  );
};

export default TrickCardHome;
