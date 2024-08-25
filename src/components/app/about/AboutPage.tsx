import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import TermsDialog from 'components/landing/TermsDialog';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import COLORS from 'theme/colors';
import BackButtonPage from 'utils/BackButtonPage';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

const AboutPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariants}
      transition={fadeInTransition}
    >
      <BackButtonPage label="กลับ" />
      <Container maxWidth="sm">
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={'bold'}
            sx={{ mt: 4, mb: 1, textAlign: 'center', color: COLORS.blue[6] }}
          >
            เกี่ยวกับเรา
          </Typography>
          <Box
            sx={{
              width: '200px',
              height: '10px',
              backgroundColor: '#BFDBFE',
              borderRadius: '10px',
              margin: '10px auto',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}>
            <Image
              src="/images/logo-full.png"
              alt="SWC Logo"
              width={170}
              height={70}
              style={{ width: '35%', height: 'auto' }}
              priority
            />
          </Box>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', mb: 1, fontWeight: 600 }}
          >
            บริการวิเคราะห์ผลด้วย AI
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', fontWeight: 600 }}
          >
            ที่ใช้งานง่ายและไม่ต้องลงทะเบียน
          </Typography>
        </Box>
        <Card
          elevation={0}
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            mt: 2,
            mb: 2,
          }}
        >
          <CardContent
            sx={{
              mt: 2,
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: 15 }}>
              {[
                'ให้ข้อมูลเกี่ยวกับแผลประเภทต่างๆ',
                'วิเคราะห์แผลจากรูปภาพด้วยเทคโนโลยี AI',
                'ไม่จำเป็นต้องสมัครสมาชิกหรือเข้าสู่ระบบ',
                'ใช้งานง่าย สะดวก รวดเร็ว',
              ].map((text, index) => (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                  key={index}
                >
                  <Box
                    sx={{
                      width: { xs: '24px', sm: '30px' },
                      height: { xs: '24px', sm: '30px' },
                      backgroundColor: '#FFE4E6',
                      color: 'red',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: 2,
                      fontWeight: 'bold',
                      fontSize: { xs: '16px', sm: '16px' },
                    }}
                  >
                    {index + 1}
                  </Box>
                  {text}
                </Box>
              ))}
            </Typography>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          sx={{
            backgroundColor: COLORS.blue[6],
            color: 'white',
            width: '100%',
            mt: 2,
          }}
          startIcon={<InfoIcon />}
          onClick={handleOpenModal}
        >
          อ่านเงื่อนไขการใช้งาน
        </Button>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', mt: 2, color: COLORS.gray[3], pb: 5 }}
        >
          เวอร์ชัน 1.0.0
        </Typography>
      </Container>
      <TermsDialog open={openModal} onClose={handleCloseModal} />
    </motion.div>
  );
};

export default AboutPage;
