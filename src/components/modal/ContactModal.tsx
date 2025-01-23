import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { createContact } from 'services/contactService';
import COLORS from 'themes/colors';

import CustomModal from './CustomModal';

type FormData = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const mutation = useMutation(createContact, {
    onSuccess: () => {
      toast.success('ข้อความถูกส่งเรียบร้อยแล้ว!');
      reset(); // รีเซ็ตฟอร์มเมื่อส่งสำเร็จ
      onClose(); // ปิด modal
    },
    onError: (error: any) => {
      toast.error(
        `เกิดข้อผิดพลาด: ${
          error.response?.data?.message || 'ไม่สามารถส่งข้อความได้'
        }`
      );
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate({
      contact_name: data.name,
      contact_email: data.email,
      contact_message: data.message,
      contact_subject: data.subject,
    });
  };

  const handleClose = () => {
    setIsCustomModalOpen(true);
  };

  const handleCustomModalConfirm = () => {
    setIsCustomModalOpen(false);
    onClose();
  };

  const handleCustomModalCancel = () => {
    setIsCustomModalOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="contact-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: { xs: 3, sm: 3 },
            borderRadius: '8px',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            id="contact-modal-title"
            variant="h5"
            fontWeight={'bold'}
            component="h2"
            gutterBottom
            textAlign={'center'}
            sx={{ color: COLORS.blue[6] }}
          >
            ติดต่อเรา
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              หัวข้อ
            </Typography>
            <FormControl fullWidth>
              <Select
                defaultValue="ทั่วไป"
                displayEmpty
                inputProps={{ 'aria-label': 'เลือกหัวข้อ' }}
                {...register('subject', { required: 'กรุณาเลือกหัวข้อ' })}
                error={!!errors.subject}
              >
                <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
                <MenuItem value="แจ้งปัญหา">แจ้งปัญหา</MenuItem>
                <MenuItem value="ข้อเสนอแนะ">ข้อเสนอแนะ</MenuItem>
              </Select>
              <Typography color="error">
                {errors.subject ? errors.subject.message : ''}
              </Typography>
            </FormControl>

            <Typography variant="body1" sx={{ mt: 2 }}>
              ชื่อ
            </Typography>
            <TextField
              fullWidth
              placeholder="ป้อนชื่อของคุณ"
              variant="outlined"
              margin="normal"
              {...register('name', { required: 'กรุณาป้อนชื่อ' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />

            <Typography variant="body1" sx={{ mt: 1 }}>
              อีเมล
            </Typography>
            <TextField
              fullWidth
              placeholder="ป้อนอีเมล"
              variant="outlined"
              margin="normal"
              {...register('email', {
                required: 'กรุณาป้อนอีเมล',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'รูปแบบอีเมลไม่ถูกต้อง',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              ข้อความ
            </Typography>
            <TextField
              fullWidth
              placeholder="ป้อนเนื้อหา"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              {...register('message', { required: 'กรุณาป้อนข้อความ' })}
              error={!!errors.message}
              helperText={errors.message ? errors.message.message : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, backgroundColor: COLORS.blue[6] }}
              startIcon={
                mutation.isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
            </Button>
          </form>
        </Box>
      </Modal>

      <CustomModal
        isOpen={isCustomModalOpen}
        onClose={handleCustomModalCancel}
        onConfirm={handleCustomModalConfirm}
        title="ยืนยันการปิด"
        description="คุณแน่ใจว่าต้องการปิดหน้าต่างนี้หรือไม่? ข้อมูลที่ยังไม่ได้บันทึกจะหายไป."
        confirmText="ยืนยัน"
        cancelText="ยกเลิก"
      />
    </>
  );
};

export default ContactModal;
