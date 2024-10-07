import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from '@mui/material';
import CustomButton from 'components/button/CustomButton';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { resetPassword } from 'services/resetPassword';

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

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation(resetPassword, {
    onSuccess: () => {
      toast.success('รีเซ็ตรหัสผ่านสำเร็จ');
      router.push('/login');
    },
    onError: () => {
      toast.error('รีเซ็ตรหัสผ่านล้มเหลว กรุณาลองใหม่');
    },
  });

  const handleClickShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (token) {
      mutation.mutate({ token, newPassword: data.newPassword });
    } else {
      toast.error('ข้อมูลยืนยัน Admin ไม่ถูกต้อง');
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
        <Typography component="h2" variant="h6">
          รีเซ็ตรหัสผ่าน
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: '100%' }}
        >
          {/* รหัสผ่านใหม่ */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel
              htmlFor="newPassword"
              sx={{ fontFamily: 'Prompt, Arial, sans-serif' }}
            >
              รหัสผ่านใหม่
            </InputLabel>
            <OutlinedInput
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              label="รหัสผ่านใหม่"
              autoComplete="new-password"
              {...register('newPassword', {
                required: 'กรุณากรอกรหัสผ่านใหม่',
                minLength: {
                  value: 6,
                  message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
                },
              })}
              error={!!errors.newPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                style: { fontFamily: 'Prompt, Arial, sans-serif' },
              }}
            />
            {errors.newPassword && (
              <FormHelperText
                error
                sx={{ fontFamily: 'Prompt, Arial, sans-serif' }}
              >
                {errors.newPassword.message}
              </FormHelperText>
            )}
          </FormControl>

          {/* ยืนยันรหัสผ่าน */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel
              htmlFor="confirmPassword"
              sx={{ fontFamily: 'Prompt, Arial, sans-serif' }}
            >
              ยืนยันรหัสผ่าน
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              label="ยืนยันรหัสผ่าน"
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'กรุณายืนยันรหัสผ่าน',
                validate: (value) =>
                  value === newPassword || 'รหัสผ่านไม่ตรงกัน',
              })}
              error={!!errors.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                style: { fontFamily: 'Prompt, Arial, sans-serif' },
              }}
            />
            {errors.confirmPassword && (
              <FormHelperText
                error
                sx={{ fontFamily: 'Prompt, Arial, sans-serif' }}
              >
                {errors.confirmPassword.message}
              </FormHelperText>
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
