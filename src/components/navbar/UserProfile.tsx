import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router'; // นำเข้า useRouter จาก next/router
import React, { useState } from 'react';
import { getProfileImageUrl } from 'services/profileSettingService'; // Import the function to get full image URL
import COLORS from 'theme/colors';

interface UserProfileProps {
  user: { username: string; email: string; profileImage: string };
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter(); // สร้างตัวแปร router จาก useRouter

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    router.push('/admin/setting');
    handleMenuClose();
  };

  // Use getProfileImageUrl to get the full URL of the profile image
  const profileImageUrl = user.profileImage
    ? getProfileImageUrl(user.profileImage)
    : null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
      }}
    >
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar
          src={profileImageUrl || undefined}
          sx={{
            color: COLORS.blue[6],
            backgroundColor: 'white',
            fontWeight: 500,
          }}
        >
          {!profileImageUrl && user.username[0]}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>{user.username}</MenuItem>
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem onClick={handleSettingsClick}>ตั้งค่าบัญชี</MenuItem>
        <MenuItem onClick={onLogout}>ออกจากระบบ</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
