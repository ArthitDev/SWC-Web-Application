import {
  Box,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { resetPassword } from 'api/resetPassword';
import CustomButton from 'components/button/CustomButton';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

type FormInputs = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const { query } = router;
  const token = query.token as string;

  const mutation = useMutation(resetPassword, {
    onSuccess: () => {
      toast.success('รีเซ็ตรหัสผ่านสำเร็จ');
      router.push('/login');
    },
    onError: () => {
      toast.error('รีเซ็ตรหัสผ่านล้มเหลว กรุณาลองใหม่ Token อาจไม่ถูกต้อง');
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (token) {
      mutation.mutate({ token, newPassword: data.newPassword });
    } else {
      toast.error('Token ไม่ถูกต้อง');
    }
  };

  const newPassword = watch('newPassword', '');

  return (
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
          รีเซ็ตรหัสผ่าน
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="newPassword"
            label="รหัสผ่านใหม่"
            type="password"
            autoComplete="new-password"
            autoFocus
            {...register('newPassword', {
              required: 'กรุณากรอกรหัสผ่านใหม่',
              minLength: {
                value: 6,
                message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputLabelProps={{
              style: { fontFamily: 'Prompt, Arial, sans-serif' },
            }}
            inputProps={{
              style: { fontFamily: 'Prompt, Arial, sans-serif' },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'กรุณายืนยันรหัสผ่าน',
              validate: (value) => value === newPassword || 'รหัสผ่านไม่ตรงกัน',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputLabelProps={{
              style: { fontFamily: 'Prompt, Arial, sans-serif' },
            }}
            inputProps={{
              style: { fontFamily: 'Prompt, Arial, sans-serif' },
            }}
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
              text="รีเซ็ตรหัสผ่าน"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: 'Prompt, Arial, sans-serif',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Link
            href="/login"
            variant="body2"
            sx={{ fontFamily: 'Prompt, Arial, sans-serif' }}
          >
            {'กลับไปที่หน้าเข้าสู่ระบบ'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
