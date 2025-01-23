import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import {
  Box,
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import COLORS from 'themes/colors';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose }) => {
  const [language, setLanguage] = useState<'th' | 'en'>('th');
  const [showLargeQR, setShowLargeQR] = useState(false);

  const handleLanguageChange = (
    _event: React.MouseEvent<HTMLElement>,
    newLanguage: 'th' | 'en'
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  const content = {
    th: {
      title: 'ขออภัย ระบบไม่สามารถให้บริการได้ในขณะนี้',
      description:
        'เนื่องจากเซิร์ฟเวอร์ส่วนของ AI ได้หยุดให้บริการเพราะไม่ได้ชำระค่าบริการ หากท่านต้องการสนับสนุนค่าใช้จ่ายเซิร์ฟเวอร์ สามารถสแกน QR Code ด้านล่างได้ , ขอบคุณที่สนับสนุน 😊',
      closeButton: 'ปิด',
    },
    en: {
      title: 'Sorry, the system is currently unavailable',
      description:
        'The AI server has stopped working due to unpaid service fees. If you would like to support the server costs, you can scan the QR Code below. Thank you for your support. 😊',
      closeButton: 'Close',
    },
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="payment-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <ToggleButtonGroup
              value={language}
              exclusive
              onChange={handleLanguageChange}
              size="small"
            >
              <ToggleButton value="th">TH</ToggleButton>
              <ToggleButton value="en">EN</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Typography
            id="payment-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            {content[language].title}
          </Typography>
          <Typography variant="body1" mb={3}>
            {content[language].description}
          </Typography>

          <Box
            sx={{
              position: 'relative',
              width: 'fit-content',
              margin: '0 auto',
              mb: 3,
            }}
          >
            <Box
              component="img"
              src="/images/qr_code.jpg"
              alt="QR Code for donation"
              sx={{
                borderRadius: '10px',
                width: '100%',
                maxWidth: 200,
                height: 'auto',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                padding: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setShowLargeQR(true)}
            >
              <ZoomInIcon />
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: COLORS.blue[6],
              '&:hover': {
                backgroundColor: COLORS.blue[7],
              },
            }}
          >
            {content[language].closeButton}
          </Button>
        </Box>
      </Modal>

      <Modal
        open={showLargeQR}
        onClose={() => setShowLargeQR(false)}
        aria-labelledby="qr-large-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              backgroundColor: '#ff4444',
              borderRadius: '50%',
              padding: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => setShowLargeQR(false)}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Box>
          <Box
            component="img"
            src="/images/qr_code.jpg"
            alt="QR Code for donation"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default PaymentModal;
