import { Box, Fade, Slide, Typography } from '@mui/material';
import CustomeButtonLanding from 'components/button/CustomButtonLanding';
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
      <Slide in={true} direction="up" timeout={1700}>
        <img
          src="/images/logo-landing.png"
          alt="Landing Logo"
          style={{
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            marginBottom: 10,
          }}
        />
      </Slide>
      <Fade in={showContent} timeout={1500}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          sx={{ color: 'white' }}
        >
          <Typography variant="h6" gutterBottom>
            รู้จักประเภทแผล ด้วย AI อัจฉริยะ
          </Typography>
          <Typography variant="h6">
            และ วิธีการดูแลรักษาอย่างถูกวิธีด้วย{' '}
            <span style={{ color: '#E58C28' }}>SWC</span>
          </Typography>
          <Typography variant="body1" mt={2}>
            เริ่มต้นการวินิจฉัยแผลและเรียนรู้ข้อมูลแผล
          </Typography>
          <Typography variant="body1" mt={1}>
            ไปกับ Smart Wound Care (SWC)
          </Typography>
          <CustomeButtonLanding
            onClick={() => router.push('/home')}
            fullWidth
            text="เริ่มต้นใช้งาน"
            sx={{
              fontWeight: 'regular',
              fontSize: '22px',
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
