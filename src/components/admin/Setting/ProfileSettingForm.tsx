import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import CustomButtonCancel from 'components/button/CustomButtonCancel';
import CustomButtonSave from 'components/button/CustomButtonSave';
import CustomModal from 'components/modal/CustomModal';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import {
  changePassword,
  deactivateAccount,
  updateProfile,
} from 'services/profileSettingService';
import { showValidationError } from 'utils/ErrorFormToast';

type FormData = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface ProfileSettingFormProps {
  initialProfile: FormData;
  profileImage: string | null;
  imageFile: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  profileId: string | undefined;
}

const ProfileSettingForm: React.FC<ProfileSettingFormProps> = ({
  initialProfile,
  profileImage,
  imageFile,
  setProfileImage,
  setImageFile,
  profileId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = React.useState(false);
  const deactivateAccountMutation = useMutation(deactivateAccount);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset, // Use reset function from useForm
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: initialProfile,
  });

  const newPassword = watch('newPassword'); // Watch for newPassword value

  useRefetchWebSocket('profile', 'UPDATE_PROFILE');

  useEffect(() => {
    // Reset form values when initialProfile changes
    reset(initialProfile);
  }, [initialProfile, reset]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const updateProfileMutation = useMutation(
    (data: FormData) => {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      return updateProfile(Number(profileId), formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile');
      },
    }
  );

  const changePasswordMutation = useMutation(changePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isDeletingAccount) {
      return;
    }

    const hasProfileChanges =
      data.username !== initialProfile.username ||
      data.email !== initialProfile.email;
    const hasPasswordChanges = data.currentPassword && data.newPassword;

    if (hasProfileChanges || hasPasswordChanges || imageFile) {
      setIsConfirmModalOpen(true);
    } else {
      toast('⚠️ ยังไม่มีการเปลี่ยนแปลงข้อมูล!', {});
    }
  };

  const handleConfirmSubmit = async (data: FormData) => {
    try {
      const hasPasswordChanges = data.currentPassword && data.newPassword;

      if (
        data.username !== initialProfile.username ||
        data.email !== initialProfile.email ||
        imageFile
      ) {
        const profileResponse = await updateProfileMutation.mutateAsync(data);
        toast.success(profileResponse.message || 'บันทึกข้อมูลสำเร็จ');
      }

      if (hasPasswordChanges) {
        const passwordResponse = await changePasswordMutation.mutateAsync({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
        toast.success(passwordResponse.message || 'เปลี่ยนรหัสผ่านสำเร็จ');
      }

      setIsConfirmModalOpen(false);
    } catch (error) {
      toast.error(error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        toast.error('ขนาดไฟล์รูปภาพต้องไม่เกิน 15MB');
        fileInput.value = ''; // Clear input
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
    fileInput.value = '';
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImageFile(null);
  };

  const confirmDeactivateAccount = async () => {
    try {
      setIsModalOpen(false);
      await deactivateAccountMutation.mutateAsync();
      toast.success('บัญชีถูกลบสำเร็จ');
      router.push('/login');
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดในการลบบัญชี');
    }
  };

  const handleDeactivateAccount = () => {
    setIsDeletingAccount(true);
    setIsModalOpen(true);
    setIsConfirmModalOpen(false);
  };

  const handleFormError = (err: any) => {
    showValidationError(err);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
        <Box display="flex" justifyContent="center" position="relative">
          <Box position="relative" sx={{ width: 120, height: 120 }}>
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              <Avatar
                src={profileImage || ''}
                alt="Profile Image"
                sx={{
                  width: 100,
                  height: 100,
                  border: '2px solid #ccc',
                }}
              >
                {!profileImage && <AddAPhotoIcon />}
              </Avatar>
            </IconButton>
            {profileImage && (
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: 'rgba(255, 0, 0, 0.7)',
                  color: 'white',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(139, 0, 0, 0.8)',
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
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
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
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
          </Grid>

          {/* Right Side - Passwords */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                รหัสผ่านปัจจุบัน
              </Typography>
              <TextField
                placeholder="ป้อนรหัสผ่านปัจจุบัน"
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                {...register('currentPassword')}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                รหัสผ่านใหม่
              </Typography>
              <TextField
                type={showNewPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                placeholder="ป้อนรหัสผ่านใหม่"
                {...register('newPassword', {
                  validate: (value) =>
                    value.length === 0 ||
                    value.length >= 6 ||
                    'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
                })}
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowNewPassword}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Conditionally render Confirm Password if newPassword has been entered */}
            {newPassword && (
              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  ยืนยันรหัสผ่านใหม่
                </Typography>
                <TextField
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                  placeholder="ยืนยันรหัสผ่านใหม่"
                  {...register('confirmPassword', {
                    validate: (value) =>
                      value === newPassword ||
                      'รหัสผ่านใหม่และรหัสผ่านยืนยันไม่ตรงกัน',
                  })}
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="end" p={2}>
          <Box sx={{ mr: 1 }}>
            <CustomButtonSave onClick={handleSubmit(onSubmit)} loading={false}>
              แก้ไขโปรไฟล์
            </CustomButtonSave>
          </Box>
          <Box>
            <CustomButtonCancel
              loading={false}
              onClick={handleDeactivateAccount}
            >
              ลบบัญชี
            </CustomButtonCancel>
          </Box>
        </Box>
      </form>

      <CustomModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmit(handleConfirmSubmit)}
        title="ยืนยันการแก้ไขโปรไฟล์"
        description="คุณแน่ใจหรือไม่ว่าต้องการแก้ไขข้อมูลโปรไฟล์ของคุณ?"
        confirmText="ยืนยัน"
        cancelText="ยกเลิก"
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeactivateAccount}
        title="ยืนยันการลบบัญชี"
        description="คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีของคุณ? ข้อมูลทั้งหมดจะถูกลบถาวร."
        confirmText="ยืนยัน"
        cancelText="ยกเลิก"
      />
    </>
  );
};

export default ProfileSettingForm;
