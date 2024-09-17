import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import CustomButtonCancel from 'components/button/CustomButtonCancel';
import CustomButtonSave from 'components/button/CustomButtonSave';
import CustomModal from 'components/modal/CustomModal';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  changePassword,
  deactivateAccount,
  getProfile,
  updateProfile,
} from 'services/profileSettingService';
import DataNotFound from 'utils/DataNotFound';
import { showValidationError } from 'utils/ErrorFormToast';
import withAuth from 'utils/withAuth';

type FormData = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

const SettingPanel: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const queryClient = useQueryClient();
  const [initialProfile, setInitialProfile] = React.useState<FormData>({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false); // เพิ่ม state สำหรับควบคุมการแสดง modal

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery('profile', getProfile, {
    onSuccess: (data) => {
      setInitialProfile({
        username: data.username ?? '',
        email: data.email ?? '',
        currentPassword: '',
        newPassword: '',
      });
    },
  });

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      toast.success('แก้ไขโปรไฟล์สำเร็จ!');
      queryClient.invalidateQueries('profile');
    },
    onError: () => {
      toast.error('แก้ไขโปรไฟล์ไม่สำเร็จ!');
    },
  });

  const changePasswordMutation = useMutation(changePassword, {
    onSuccess: () => {
      toast.success('เปลี่ยนรหัสผ่านสำเร็จ!');
    },
    onError: () => {
      toast.error('เปลี่ยนรหัสผ่านไม่สำเร็จ!');
    },
  });

  const deactivateAccountMutation = useMutation(deactivateAccount, {
    onSuccess: () => {
      toast.success('ลบบัญชีเรียบร้อยแล้ว');
    },
    onError: () => {
      toast.error('มีปัญหาในการลบบัญชี');
    },
  });

  React.useEffect(() => {
    if (profile) {
      setValue('username', profile.username);
      setValue('email', profile.email);
    }
  }, [profile, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const hasProfileChanges =
        data.username !== initialProfile.username ||
        data.email !== initialProfile.email;

      const hasPasswordChanges = data.currentPassword && data.newPassword;

      if (hasProfileChanges) {
        await updateProfileMutation.mutateAsync({
          username: data.username,
          email: data.email,
        });
      }

      if (hasPasswordChanges) {
        await changePasswordMutation.mutateAsync({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
      }

      if (!hasProfileChanges && !hasPasswordChanges) {
        toast('⚠️ ยังไม่มีการเปลี่ยนแปลงข้อมูล !', {});
      }
    } catch (error) {
      toast.error('มีปัญหาในการบันทึกข้อมูล');
    }
  };

  const handleDeactivateAccount = async () => {
    setIsModalOpen(true);
  };

  const confirmDeactivateAccount = async () => {
    try {
      setIsModalOpen(false);
      await deactivateAccountMutation.mutateAsync();
      router.push('/login');
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดในการลบบัญชี');
    }
  };

  const handleFormError = (error: any) => {
    showValidationError(error);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>กำลังโหลดข้อมูล...</Typography>
      </Box>
    );
  }

  if (isError) return <DataNotFound />;

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Paper elevation={0} sx={{ width: '100%', m: '15px', pb: 5 }}>
          <Box p={3}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'medium', textAlign: 'center', pt: 2 }}
            >
              ตั้งค่าบัญชี
            </Typography>
            <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
              <Box display="flex" flexDirection="column" gap={2} p={2}>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    ชื่อผู้ใช้
                  </Typography>
                  <TextField
                    placeholder="ป้อนชื่อผู้ใช้"
                    {...register('username', {
                      required: 'ชื่อผู้ใช้ห้ามว่าง',
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: 'ชื่อผู้ใช้ต้องเป็นภาษาอังกฤษเท่านั้น',
                      },
                    })}
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    อีเมล
                  </Typography>
                  <TextField
                    type="email"
                    placeholder="ป้อนอีเมล"
                    {...register('email', {
                      required: 'อีเมลห้ามว่าง',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'รูปแบบอีเมลไม่ถูกต้อง',
                      },
                    })}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    รหัสผ่านปัจจุบัน
                  </Typography>
                  <TextField
                    placeholder="ป้อนรหัสผ่านปัจจุบัน"
                    type="password"
                    {...register('currentPassword')}
                    fullWidth
                  />
                </Box>
                <Box pb={2}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    รหัสผ่านใหม่
                  </Typography>
                  <TextField
                    type="password"
                    placeholder="ป้อนรหัสผ่านใหม่"
                    {...register('newPassword')}
                    fullWidth
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <CustomButtonSave
                    loading={
                      updateProfileMutation.isLoading ||
                      changePasswordMutation.isLoading
                    }
                  >
                    แก้ไขโปรไฟล์
                  </CustomButtonSave>
                  <CustomButtonCancel
                    loading={false}
                    onClick={handleDeactivateAccount}
                  >
                    ลบบัญชี
                  </CustomButtonCancel>
                </Box>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeactivateAccount} // ยืนยันการลบบัญชี
        title="ยืนยันการลบบัญชี"
        description="คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีของคุณ? ข้อมูลทั้งหมดจะถูกลบถาวร."
        confirmText="ยืนยัน"
        cancelText="ยกเลิก"
      />
    </Box>
  );
};

export default withAuth(SettingPanel);
