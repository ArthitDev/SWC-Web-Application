import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { IoWarning } from 'react-icons/io5';
import COLORS from 'theme/colors';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '400px', md: '500px' }, // ทำให้ responsive ตามขนาดหน้าจอ
          maxWidth: '100%', // จำกัดขนาดสูงสุดของ card ไม่ให้เกินขอบหน้าจอ
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 4 }, // เพิ่ม padding ตามขนาดหน้าจอ
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <IoWarning size={32} color={COLORS.yellow[4]} />
          <Typography
            id="confirm-modal-title"
            variant="h6"
            component="h2"
            ml={2}
          >
            {title}
          </Typography>
        </Box>
        <Typography ml={1} id="confirm-modal-description" sx={{ mt: 2, mb: 3 }}>
          {description}
        </Typography>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            disableElevation={true}
            onClick={onClose}
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
          >
            {cancelText}
          </Button>
          <Button
            disableElevation={true}
            onClick={onConfirm}
            variant="contained"
            sx={{
              bgcolor: '#f44336',
              '&:hover': { bgcolor: '#d32f2f' },
            }}
          >
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
