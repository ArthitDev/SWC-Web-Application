import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import COLORS from '@/themes/colors';

interface HowToUseModalProps {
  open: boolean;
  onClose: () => void;
}

const stepsContent = [
  {
    title: 'แนะนำวิธีการใช้งาน',
    content:
      'คุณสามารถอัปโหลดรูปภาพแผลหรือถ่ายรูปภาพแผล เพื่อวิเคราะห์ได้จากหน้านี้.',
    image: '/images/predict-page-1.webp',
  },
  {
    title: 'แนบรูปภาพ',
    content:
      'ในขั้นตอนนี้ ให้คุณแนบรูปภาพหรือถ่ายรูปจากการกดปุ่มที่มีอยู่ ซ้ายเป็นปุ่มเลือกรูปภาพ ขวาเป็นปุ่มสำหรับเปิดกล้อง',
    image: '/images/predict-page-2.webp',
  },
  {
    title: 'อนุญาตการเข้าถึงไฟล์',
    content:
      'ในขั้นตอนนี้ หลังจากที่คุณกดปุ่มเพิ่มรูปภาพ ให้อนุญาตเพื่อให้แอปสามารถเข้าถึงที่จัดเก็บไฟล์ของคุณ',
    image: '/images/predict-page-3.webp',
  },
  {
    title: 'อนุญาตการเข้าถึงกล้อง',
    content:
      'ในขั้นตอนนี้ หลังจากที่คุณกดปุ่มเปิดกล้อง ให้อนุญาตเพื่อให้แอปสามารถเข้าถึงกล้องของคุณ',
    image: '/images/predict-page-4.webp',
  },
  {
    title: 'เมื่ออนุญาตการเข้าถึงคุณสมบัติ',
    content: 'คุณจะสามารถเลือกรูปหรือถ่ายรูปแผลเพื่อทำการวิเคราะห์ได้แล้ว',
    image: '/images/predict-page-5.webp',
  },
  {
    title: 'กดปุ่มวิเคราะห์หลังจากแนบรูป',
    content:
      'หลังจากแนบรูปภาพและกดปุ่มวิเคราะห์ภาพแผลแล้ว ให้รอผลลัพธ์จากการวิเคราะห์จาก AI',
    image: '/images/predict-page-6.webp',
  },
  {
    title: 'ดูผลลัพธ์',
    content: 'ผลลัพธ์ของคุณจะถูกแสดงในส่วนนี้หลังจากทำนายเสร็จ.',
    image: '/images/predict-page-7.webp',
  },
  {
    title: 'ดูวิธีการใช้งานได้ตลอด',
    content: 'สามารถดูวิธีการใช้งานได้เสมอที่นี่.',
    image: '/images/predict-page-8.webp',
  },
];

const HowToUseModal: React.FC<HowToUseModalProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < stepsContent.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
    trackMouse: true,
  });

  const isLastStep = activeStep === stepsContent.length - 1;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            position: 'relative',
            padding: '16px 24px 15px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              position: 'absolute',
              top: 15,
              left: 25,
              fontWeight: 'medium',
              fontSize: '1.1rem',
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '16px',
                backgroundColor: COLORS.blue[6],
                color: 'white',
              }}
            >
              {`${activeStep + 1}/${stepsContent.length}`}
            </Box>
          </Typography>
        </Box>

        <DialogContent
          sx={{ paddingTop: '8px', textAlign: 'center', overflow: 'hidden' }}
          {...swipeHandlers}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', marginTop: 2 }}
              >
                {stepsContent[activeStep].title}
              </Typography>

              <Typography>{stepsContent[activeStep].content}</Typography>

              {stepsContent[activeStep].image && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 2,
                  }}
                >
                  <Image
                    src={stepsContent[activeStep].image as string}
                    alt={`Step ${activeStep + 1}`}
                    width={180}
                    height={350}
                    priority
                  />
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: isLastStep ? 'center' : 'space-between',
            alignItems: 'center',
          }}
        >
          {!isLastStep && (
            <IconButton
              onClick={handleBack}
              sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
            >
              <ArrowBack />
            </IconButton>
          )}

          {!isLastStep && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {stepsContent.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor:
                      activeStep === index ? COLORS.blue[6] : 'grey',
                    marginX: 1,
                  }}
                />
              ))}
            </Box>
          )}

          {!isLastStep && (
            <IconButton onClick={handleNext}>
              <ArrowForward />
            </IconButton>
          )}

          {isLastStep && (
            <Box
              pb={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                position: 'relative',
              }}
            >
              <IconButton
                onClick={handleBack}
                sx={{ position: 'absolute', left: 0 }}
              >
                <ArrowBack />
              </IconButton>
              <Button
                onClick={onClose}
                variant="contained"
                sx={{
                  backgroundColor: COLORS.blue[6],
                }}
              >
                รับทราบแล้ว
              </Button>
            </Box>
          )}
        </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default HowToUseModal;
