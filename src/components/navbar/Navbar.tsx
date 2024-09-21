import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import CustomModal from 'components/modal/CustomModal';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import { useUserProfile } from 'hooks/useUserProfile';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { logout } from 'services/logout';
import { NavButton, TypographyLogoStyles } from 'styles/Navbar.style';

import NavList from './NavList';
import UserProfile from './UserProfile';

const pages = [
  { label: 'หน้าผู้ใช้', path: '/app' },
  { label: 'แผงควาบคุม', path: '/admin' },
  { label: 'แผล', path: '/admin/wound' },
  { label: 'บทความ', path: '/admin/articles' },
  { label: 'เคล็ดไม่ลับ', path: '/admin/trick' },
  { label: 'รู้หรือไม่', path: '/admin/didyouknow' },
];

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const { data: user } = useUserProfile();
  const router = useRouter();

  useRefetchWebSocket('userProfile', 'UPDATE_PROFILE');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleDrawerClose();
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsModalOpen(false);
    handleDrawerClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#235ADB', Height: 100 }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar
            disableGutters
            sx={{ justifyContent: 'space-between', Height: 20 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={TypographyLogoStyles}
                onClick={() => handleNavigate('/admin/')}
              >
                SWC Management
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
              }}
            >
              {pages.map((page) => (
                <NavButton
                  key={page.label}
                  className={router.pathname === page.path ? 'active' : ''}
                  onClick={() => handleNavigate(page.path)}
                  sx={{ my: 2, display: 'block' }}
                >
                  {page.label}
                </NavButton>
              ))}
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {user && <UserProfile user={user} onLogout={handleLogoutClick} />}{' '}
              {/* Trigger modal instead of direct logout */}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { backgroundColor: 'white' } }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyUp={handleDrawerClose}
        >
          <Box sx={{ padding: 2, backgroundColor: '#235ADB', color: 'white' }}>
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Avatar sx={{ marginRight: 1 }}>{user.username[0]}</Avatar>
                <Box>
                  <Typography variant="body1">{user.username}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleNavigate('/admin/setting')}
                  >
                    <SettingsIcon sx={{ marginRight: 1 }} />
                    <Typography variant="body2">ตั้งค่าบัญชี</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <NavList
            pages={pages}
            onNavigate={handleNavigate}
            onCloseDrawer={handleDrawerClose}
          />
          {user && (
            <Box p={3}>
              <ListItem
                onClick={handleLogoutClick}
                sx={{
                  backgroundColor: 'red',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkred',
                  },
                  borderRadius: 1,
                  width: '200px',
                  textAlign: 'center',
                }}
              >
                <LogoutIcon sx={{ marginRight: 1 }} />
                <ListItemText
                  primaryTypographyProps={{
                    sx: {
                      color: 'white',
                      textAlign: 'center',
                      cursor: 'pointer',
                    },
                  }}
                  primary="ออกจากระบบ"
                />
              </ListItem>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Custom modal for logout confirmation */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleLogoutConfirm}
        title="ยืนยันการออกจากระบบ"
        description="คุณแน่ใจหรือว่าต้องการออกจากระบบ?"
        confirmText="ออกจากระบบ"
        cancelText="ยกเลิก"
      />
    </>
  );
};

export default NavBar;
