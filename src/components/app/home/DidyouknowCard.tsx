import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import useRandomDidYouKnow from 'hooks/useRandomDidYouKnow';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';

const DidyouknowCardHome: React.FC = () => {
  const [currentDidyouknowIndex, setCurrentDidyouknowIndex] = useState(0);
  const { data: didyouknows, isLoading, error } = useRandomDidYouKnow();
  const [isNext, setIsNext] = useState(true); // ใช้เพื่อเช็คทิศทางการเลื่อน

  const nextDidyouknow = useCallback(() => {
    if (didyouknows) {
      setIsNext(true);
      setCurrentDidyouknowIndex(
        (prevIndex) => (prevIndex + 1) % didyouknows.length
      );
    }
  }, [didyouknows]);

  const previousDidyouknow = useCallback(() => {
    if (didyouknows) {
      setIsNext(false);
      setCurrentDidyouknowIndex((prevIndex) =>
        prevIndex === 0 ? didyouknows.length - 1 : prevIndex - 1
      );
    }
  }, [didyouknows]);

  // ใช้ useSwipeable เพื่อจัดการการ swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextDidyouknow,
    onSwipedRight: previousDidyouknow,
  });

  useEffect(() => {
    const timer = setInterval(nextDidyouknow, 10000);
    return () => clearInterval(timer);
  }, [nextDidyouknow]);

  const handleDotClick = (index: number) => {
    setCurrentDidyouknowIndex(index);
  };

  if (isLoading)
    return (
      <HomeCardLoading
        borderColor="#EAB308"
        backgroundColor="#F2F9FC"
        progressColor="#EAB308"
        textColor="#EAB308"
      />
    );

  if (error)
    return (
      <HomeCardError
        borderColor="#EAB308"
        backgroundColor="#F2F9FC"
        textColor="#EAB308"
        errorMessage="ไม่สามารถโหลดข้อมูลได้"
      />
    );

  if (!didyouknows || didyouknows.length === 0)
    return (
      <HomeCardError
        borderColor="#EAB308"
        backgroundColor="#F2F9FC"
        textColor="#EAB308"
        errorMessage="ไม่มีข้อมูลในขณะนี้"
      />
    );

  const handleViewMore = () => {
    router.push('/app/didyouknow');
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
          backgroundColor: '#EAB308',
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
              key={currentDidyouknowIndex}
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
                  color: '#CA8A42',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span role="img" aria-label="book" style={{ marginRight: 8 }}>
                  📖
                </span>
                {didyouknows[currentDidyouknowIndex].didyouknow_name}
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
              key={currentDidyouknowIndex}
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
                {didyouknows[currentDidyouknowIndex].didyouknow_content}
              </Typography>
            </motion.div>
          </AnimatePresence>
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
          {didyouknows.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  index === currentDidyouknowIndex ? '#EAB308' : '#666666',
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
            backgroundColor: '#EAB308',
            fontSize: '14px',
            fontWeight: 'medium',
            color: 'white',
            transition: 'transform 0.3s',
            '&:hover': {
              backgroundColor: '#CA8A42',
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
      </Box>
    </Card>
  );
};

export default DidyouknowCardHome;
