import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useShowNotification from 'hooks/useShowNotification'; // นำเข้า custom hook
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getProfileImageUrl } from 'services/profileSettingService';
import COLORS from 'theme/colors';

interface UserProfileProps {
  user: { username: string; email: string; profileImage: string };
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  // ใช้ custom hook เพื่อดึงข้อมูลการแจ้งเตือนที่ยังไม่ได้อ่าน
  const { data: unreadContacts } = useShowNotification();

  // นับจำนวนแจ้งเตือนที่ยังไม่ได้อ่าน และจัดรูปแบบ 1-99 หรือ 99+
  const unreadCount = unreadContacts ? Math.min(unreadContacts.length, 99) : 0;
  const badgeContent = unreadCount > 99 ? '99+' : unreadCount;

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

  const handleContactClick = () => {
    router.push('/admin/contact');
    handleMenuClose();
  };

  // ใช้ getProfileImageUrl เพื่อดึง URL เต็มของรูปภาพโปรไฟล์
  const profileImageUrl = user.profileImage
    ? getProfileImageUrl(user.profileImage)
    : null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 3,
      }}
    >
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Badge
          badgeContent={badgeContent}
          color="error" // สีแดงสำหรับแจ้งเตือน
          invisible={unreadCount === 0} // ซ่อน Badge หากไม่มีแจ้งเตือน
        >
          <Avatar
            src={profileImageUrl || undefined}
            sx={{
              width: 45,
              height: 45,
              color: COLORS.blue[6],
              backgroundColor: 'white',
              fontWeight: 500,
            }}
          >
            {!profileImageUrl && user.username[0]}
          </Avatar>
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>{user.username}</MenuItem>
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem onClick={handleContactClick}>
          <NotificationsIcon sx={{ mr: 2 }} /> การแจ้งเตือน
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <SettingsIcon sx={{ mr: 2 }} /> ตั้งค่าบัญชี
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <LogoutIcon sx={{ mr: 2 }} /> ออกจากระบบ
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
