import {
  Box,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import CustomButton from 'components/button/CustomButton';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { requestResetPassword } from 'services/requestResetPassword';

type FormInputs = {
  email: string;
};

const RequestResetPassword: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const mutation = useMutation(requestResetPassword, {
    onSuccess: () => {
      router.push('/login');
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    toast.promise(mutation.mutateAsync(data), {
      pending: 'กำลังส่งคำขอรีเซ็ตรหัสผ่าน...',
      success: 'ส่งคำขอรีเซ็ตรหัสผ่านสำเร็จ กรุณาตรวจสอบอีเมลของคุณ',
      error: 'การส่งคำขอรีเซ็ตรหัสผ่านล้มเหลว กรุณาลองใหม่อีกครั้ง',
    });
  };

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            ขอรีเซ็ตรหัสผ่าน
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="อีเมล"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'กรุณากรอกอีเมล',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'รูปแบบอีเมลไม่ถูกต้อง (เช่น example@domain.com)',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CustomButton
                type="submit"
                fullWidth
                text="ส่งคำขอ"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Link href="/login" variant="body2">
              {'กลับไปที่หน้าเข้าสู่ระบบ'}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RequestResetPassword;
