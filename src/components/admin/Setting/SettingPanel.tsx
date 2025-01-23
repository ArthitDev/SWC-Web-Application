import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { getProfile, getProfileImageUrl } from 'services/profileSettingService';
import DataNotFound from 'utils/DataNotFound';
import withAuth from 'utils/withAuth';

import ProfileSettingForm from './ProfileSettingForm'; // Import the separated component

const SettingPanel: React.FC = () => {
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [initialProfile, setInitialProfile] = React.useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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
        confirmPassword: '',
      });
      const fullProfileImageUrl = data.profileImage
        ? getProfileImageUrl(data.profileImage)
        : null;
      setProfileImage(fullProfileImageUrl);
    },
  });

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
        <Paper elevation={0} sx={{ width: '100%', m: '15px', pb: 2 }}>
          <Box p={3}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'medium', textAlign: 'center', pt: 0, pb: 5 }}
            >
              ตั้งค่าบัญชี
            </Typography>
            <ProfileSettingForm
              initialProfile={initialProfile}
              profileImage={profileImage}
              imageFile={imageFile}
              setProfileImage={setProfileImage}
              setImageFile={setImageFile}
              profileId={profile?.id}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default withAuth(SettingPanel);
