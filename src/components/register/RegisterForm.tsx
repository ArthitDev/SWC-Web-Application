import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import CustomButton from 'components/button/CustomButton';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { registerAdmin } from 'services/register';

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const mutation = useMutation(registerAdmin, {
    onSuccess: () => {
      router.push('/login');
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    toast.promise(mutation.mutateAsync(formData), {
      loading: 'กำลังสร้างบัญชี Admin...',
      success: 'สร้างบัญชี Admin สำเร็จ',
      error: 'เกิดข้อผิดพลาดในการสร้างบัญชี Admin',
    });
  };

  const password = watch('password');

  return (
    <>
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

        {/* รหัสผ่าน */}
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="password">รหัสผ่าน</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="รหัสผ่าน"
            {...register('password', {
              required: 'กรุณากรอกรหัสผ่าน',
              minLength: {
                value: 8,
                message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
              },
            })}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <Typography color="error">{errors.password.message}</Typography>
          )}
        </FormControl>

        {/* ยืนยันรหัสผ่าน */}
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="confirmPassword">ยืนยันรหัสผ่าน</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="ยืนยันรหัสผ่าน"
            {...register('confirmPassword', {
              required: 'กรุณายืนยันรหัสผ่าน',
              validate: (value) => value === password || 'รหัสผ่านไม่ตรงกัน',
            })}
            error={!!errors.confirmPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.confirmPassword && (
            <Typography color="error">
              {errors.confirmPassword.message}
            </Typography>
          )}
        </FormControl>

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
            disabled={mutation.isLoading}
          />
        </Box>
      </Box>
      <Link href="/login" variant="body2">
        {'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
      </Link>
    </>
  );
};

export default RegisterForm;
