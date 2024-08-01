import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import COLORS from 'theme/colors';

interface ModalCancelProps {
  open: boolean;
  handleClose: () => void;
  handleCancel: () => void;
}

// ไฟล์ Modal ยืนยันการปิด Form
const ModalCancel: React.FC<ModalCancelProps> = ({
  open,
  handleClose,
  handleCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <DialogTitle sx={{ fontSize: '18px' }} id="alert-dialog-title">
        Closed
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to closed? Any unsaved changes will be lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button
          onClick={handleCancel}
          autoFocus
          sx={{
            color: COLORS.red[4],
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCancel;
