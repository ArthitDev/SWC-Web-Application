import { Box, Fade, Slide, Typography } from '@mui/material';
import CustomeButtonLanding from 'components/button/CustomButtonLanding';
import Image from 'next/image';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';

import TermsDialog from './TermsDialog';

const LandingPage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = () => {
    router.push('/app');
    localStorage.setItem('hasVisitedLandingPage', 'true');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      height="100vh"
      overflow="hidden"
      p={1}
      pt={10}
    >
      <Slide in={true} direction="up" timeout={1700}>
        <div style={{ maxWidth: '300px', marginBottom: 10 }}>
          <Image
            src="/images/logo-landing.webp"
            alt="Landing Logo"
            width={1000}
            height={424}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            style={{ width: '100%', height: 'auto' }}
            priority={true}
          />
        </div>
      </Slide>
      <Fade in={showContent} timeout={1500}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          sx={{ color: 'white' }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            รู้จักประเภทแผล ด้วย AI อัจฉริยะ
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            และ วิธีการดูแลรักษาอย่างถูกวิธีด้วย{' '}
            <span
              style={{
                color: '#E58C28',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              SWC
              <Image
                width={513}
                height={115}
                priority={true}
                src="/images/under_swc.webp"
                alt="underline"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 513px"
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: '0',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </span>
          </Typography>

          <Typography variant="inherit" mt={2}>
            เริ่มต้นการวินิจฉัยแผลและเรียนรู้ข้อมูลแผล
          </Typography>
          <Typography variant="inherit" mt={1}>
            ไปกับ Smart Wound Care (SWC)
          </Typography>
          <CustomeButtonLanding
            onClick={handleClick}
            fullWidth
            text="เริ่มต้นใช้งาน"
            sx={{
              fontWeight: '500',
              fontSize: '20px',
              mt: 5,
              mb: 2,
              p: 3,
            }}
          />
        </Box>
      </Fade>
      <Fade in={showContent} timeout={1700}>
        <Box
          position="absolute"
          bottom={16}
          right={16}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IoMdInformationCircleOutline
            size={30}
            color="white"
            onClick={handleOpenModal}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Fade>
      <TermsDialog open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default LandingPage;
