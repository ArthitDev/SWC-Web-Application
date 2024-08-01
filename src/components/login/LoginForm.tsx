import { Box, Link, TextField, Typography } from '@mui/material';
import CustomButton from 'components/button/CustomButton';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Login submitted', data);
    router.push('/admin');
  };

  return (
    <>
      <Typography component="h2" variant="h6">
        เข้าสู่ระบบผู้ดูแล
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, width: '100%' }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="ชื่อผู้ใช้"
          autoComplete="username"
          autoFocus
          {...register('username', { required: 'กรุณากรอกชื่อผู้ใช้' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="รหัสผ่าน"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', { required: 'กรุณากรอกรหัสผ่าน' })}
          error={!!errors.password}
          helperText={errors.password?.message}
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
            text="เข้าสู่ระบบ"
            sx={{
              mt: 3,
              mb: 2,
            }}
          />
        </Box>
      </Box>
      <Link href="/register" variant="body2">
        {'สร้างบัญชี Admin'}
      </Link>
    </>
  );
};

export default LoginForm;
