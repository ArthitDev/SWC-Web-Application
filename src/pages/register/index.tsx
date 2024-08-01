import { Box, Container, Link, TextField, Typography } from '@mui/material';
import CustomButton from 'components/Button/CustomButton';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  boxStyle,
  containerStyle,
  descriptionStyle,
  titleStyle,
} from './register.style';

type RegisterProps = {};

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Register submitted', data);
    router.push('/login');
  };

  const password = watch('password');

  return (
    <Container component="main" maxWidth="xs" sx={containerStyle}>
      <Head>
        <title>SWC Admin Register</title>
      </Head>
      <Box sx={boxStyle}>
        <Box sx={titleStyle}>
          <Image
            src="/images/logo-full.png"
            alt="SWC Logo"
            width={170}
            height={70}
            priority
          />
        </Box>
        <Typography component="h2" variant="h6">
          สร้างบัญชี Admin
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
            id="email"
            label="อีเมล"
            autoComplete="email"
            {...register('email', {
              required: 'กรุณากรอกอีเมล',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'อีเมลไม่ถูกต้อง',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="รหัสผ่าน"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password', {
              required: 'กรุณากรอกรหัสผ่าน',
              minLength: {
                value: 8,
                message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="ยืนยันรหัสผ่าน"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'กรุณายืนยันรหัสผ่าน',
              validate: (value) => value === password || 'รหัสผ่านไม่ตรงกัน',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
              text="สมัครสมาชิก"
              sx={{
                mt: 3,
                mb: 2,
              }}
            />
          </Box>
        </Box>
        <Link href="/login" variant="body2">
          {'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
        </Link>
        <Typography variant="body2" sx={descriptionStyle}>
          Smart Wound Care (SWC) - เว็บแอปพลิเคชันให้คำแนะนำในการดูแลแผลอัจฉริยะ
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
