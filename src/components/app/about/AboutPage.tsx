import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import BackButtonPage from 'components/button/BackButtonPage';
import TermsDialog from 'components/landing/TermsDialog';
import ConfirmDeleteModal from 'components/modal/ConfirmDeleteModal';
import { motion } from 'framer-motion';
import { History, InfoIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import COLORS from 'theme/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

const AboutPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false); // สถานะนับถอยหลัง
  const router = useRouter();
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null); // ใช้ในการ track interval

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenModalReset = () => {
    setIsModalOpen(true);
    setCountdown(null);
    setShowCountdown(false);
    setIsCountingDown(false);
  };

  const handleConfirmReset = () => {
    if (isCountingDown) {
      // ถ้านับถอยหลังอยู่ ให้ route ไปหน้า / ทันที
      clearInterval(countdownIntervalRef.current as NodeJS.Timeout);
      localStorage.removeItem('hasVisitedLandingPage');
      router.push('/');
      return;
    }

    setIsCountingDown(true);
    setShowCountdown(true);
    let countdownValue = 5;
    setCountdown(countdownValue);

    countdownIntervalRef.current = setInterval(() => {
      countdownValue--;
      setCountdown(countdownValue);

      if (countdownValue === 0) {
        clearInterval(countdownIntervalRef.current as NodeJS.Timeout);
        localStorage.removeItem('hasVisitedLandingPage');
        router.push('/');
      }
    }, 1000);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current); // ล้าง interval ที่ทำงานอยู่
    }
    setIsModalOpen(false);
    setShowCountdown(false); // ซ่อนการแสดงผลการนับถอยหลัง
    setCountdown(null);
    setIsCountingDown(false); // รีเซ็ตสถานะการนับถอยหลัง
    localStorage.setItem('hasVisitedLandingPage', 'true'); // ตั้งค่าใหม่ใน local storage
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLORS.blue[6],
              color: 'white',
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 16px',
            }}
            startIcon={<InfoIcon />}
            onClick={handleOpenModal}
          >
            อ่านเงื่อนไขการใช้งาน
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLORS.red[5],
              color: 'white',
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: COLORS.red[4],
              },
            }}
            startIcon={<History />}
            onClick={handleOpenModalReset}
          >
            ลบข้อมูลการจดจำผู้ใช้
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ textAlign: 'center', mt: 2, color: COLORS.gray[3], pb: 5 }}
        >
          เวอร์ชัน 1.0.0
        </Typography>
      </Container>
      <TermsDialog open={openModal} onClose={handleCloseModal} />
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmReset}
        title="ยืนยันการลบข้อมูล"
        description={
          showCountdown && countdown !== null
            ? `คุณจะกลับไปยังหน้าเริ่มต้นใช้งาน ใน ${countdown} . . .`
            : 'แน่ใจว่าต้องการลบข้อมูลการใช้งาน ?'
        }
        confirmText="ยืนยันการลบ"
        cancelText="ยกเลิก"
      />
    </motion.div>
  );
};

export default AboutPage;
