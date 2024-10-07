import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import CustomButton from 'components/button/CustomButton';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { loginAdmin } from 'services/login';

type FormInputs = {
  username: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation(loginAdmin, {
    onSuccess: () => {
      router.push('/admin');
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    toast.promise(mutation.mutateAsync(data), {
      loading: 'กำลังเข้าสู่ระบบ...',
      success: 'เข้าสู่ระบบสำเร็จ',
      error: 'เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบข้อมูล',
    });
  };

  return (
    <>
      <Typography component="h2" variant="h6">
        เข้าสู่ระบบผู้ดูแล
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="ชื่อผู้ใช้ หรือ อีเมล"
          autoFocus
          {...register('username', {
            required: 'กรุณากรอกชื่อผู้ใช้ หรือ อีเมล',
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="password">รหัสผ่าน</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="รหัสผ่าน"
            {...register('password', { required: 'กรุณากรอกรหัสผ่าน' })}
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Tooltip
            title={
              <Typography sx={{ fontSize: '14px' }}>
                ระบบจะจดจำบัญชีของคุณในอุปกรณ์นี้
                ไม่ต้องเข้าสู่ระบบใหม่เมื่อกลับมาอีกครั้ง
              </Typography>
            }
          >
            <FormControlLabel
              control={<Checkbox {...register('rememberMe')} color="primary" />}
              label={<Typography variant="body2">จดจำฉันไว้ในระบบ</Typography>}
            />
          </Tooltip>

          <Link href="/login/request-reset-password" variant="body2">
            {'ลืมชื่อผู้ใช้หรือรหัสผ่าน ?'}
          </Link>
        </Box>
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
    </>
  );
};

export default LoginForm;
