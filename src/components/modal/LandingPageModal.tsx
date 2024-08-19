import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface LandingPageModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const LandingPageModal: React.FC<LandingPageModalProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', // เปลี่ยนจากขนาดคงที่เป็นเปอร์เซ็นต์
          maxWidth: 500, // กำหนดขนาดสูงสุด
          bgcolor: 'background.paper',
          border: 'none',
          boxShadow: 24, // กลับมาใช้เงามาตรฐานของ MUI
          outline: 'none',
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box
          sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
        >
          <Button variant="outlined" onClick={onCancel}>
            ยกเลิก
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            ยืนยัน
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LandingPageModal;
