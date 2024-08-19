import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { IoWarning } from 'react-icons/io5';
import COLORS from 'theme/colors';

type ReusableDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const ReusableDrawer: React.FC<ReusableDrawerProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(true);
  };

  const confirmClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const cancelClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: 500, lg: 500, xl: 1000 },
            maxWidth: '100%',
            p: { xs: 2, sm: 3 },
            position: 'relative',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 2,
              right: 5,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: '600', color: COLORS.blue[6] }}
            >
              {title}
            </Typography>
          </Box>
          <Box mt={2}>{children}</Box>
        </Box>
      </Drawer>

      <Modal
        open={isModalOpen}
        onClose={cancelClose}
        aria-labelledby="confirm-close-modal"
        aria-describedby="confirm-close-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <IoWarning size={32} color={COLORS.yellow[4]} />
            <Typography
              id="confirm-close-modal"
              variant="h6"
              component="h2"
              ml={2}
            >
              ยืนยันการปิด
            </Typography>
          </Box>
          <Typography id="confirm-close-description" sx={{ mt: 2, mb: 3 }}>
            คุณแน่ใจว่าต้องการปิดโดยไม่บันทึกข้อมูล?
          </Typography>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              disableElevation={true}
              onClick={cancelClose}
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              ยกเลิก
            </Button>
            <Button
              disableElevation={true}
              onClick={confirmClose}
              variant="contained"
              sx={{
                bgcolor: '#f44336',
                '&:hover': { bgcolor: '#d32f2f' },
              }}
            >
              ยืนยันการปิด
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReusableDrawer;
