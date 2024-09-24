import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import useRandomDidYouKnow from 'hooks/useRandomDidYouKnow';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';

const DidyouknowCardHome: React.FC = () => {
  const [currentDidyouknowIndex, setCurrentDidyouknowIndex] = useState(0);
  const { data: didyouknows, isLoading, error } = useRandomDidYouKnow();

  const nextDidyouknow = useCallback(() => {
    if (didyouknows) {
      setCurrentDidyouknowIndex(
        (prevIndex) => (prevIndex + 1) % didyouknows.length
      );
    }
  }, [didyouknows]);

  useEffect(() => {
    const timer = setInterval(nextDidyouknow, 8000);
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
        height: 180,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: 4,
        position: 'relative',
      }}
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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#CA8A42',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span role="img" aria-label="book" style={{ marginRight: 8 }}>
              📖
            </span>
            รู้หรือไม่ ?
          </Typography>
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDidyouknowIndex}
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
              {didyouknows[currentDidyouknowIndex].didyouknow_content}
            </Typography>
          </motion.div>
        </AnimatePresence>

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
          {didyouknows.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)} // Add this to make the dot clickable
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  index === currentDidyouknowIndex ? '#EAB308' : '#666666',
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
            backgroundColor: '#EAB308',
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              backgroundColor: '#CA8A42',
            },
            textTransform: 'none',
            padding: '6px 12px',
            boxShadow: 'none',
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
