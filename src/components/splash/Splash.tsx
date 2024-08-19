import { Box, Fade, LinearProgress } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Prefetch หน้า /landing ล่วงหน้า
    router.prefetch('/landing');

    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100); // เพิ่มค่า progress ทีละ 10%
      });
    }, 200); // ทุกๆ 200 มิลลิวินาที

    const timerIn = setTimeout(() => {
      setVisible(false); // เริ่ม fade out
    }, 2000); // 2000 มิลลิวินาที (2 วินาที)

    const timerOut = setTimeout(() => {
      router.push('/landing');
    }, 2500); // เพิ่มเวลาเล็กน้อยสำหรับ fade out

    return () => {
      clearTimeout(timerIn);
      clearTimeout(timerOut);
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      overflow="hidden"
      p={1}
    >
      <Fade in={visible} timeout={{ enter: 1700, exit: 500 }}>
        <div style={{ maxWidth: '300px', marginBottom: 10 }}>
          <Image
            src="/images/logo-landing.png"
            alt="Landing Logo"
            width={1000}
            height={424}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            style={{ width: '100%', height: 'auto' }}
            priority={true}
          />
          <Box mt={2}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                width: '80%',
                margin: '0 auto',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#E58C28',
                },
              }}
            />
          </Box>
        </div>
      </Fade>
    </Box>
  );
};

export default SplashScreen;
