import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useUserProfile } from 'hooks/useUserProfile';
import { useRouter } from 'next/router';
import React from 'react';
import { logout } from 'services/logout';
import { NavButton, TypographyListItemText } from 'styles/Navbar.style';

import Logo from './Logo';
import NavList from './NavList';
import UserProfile from './UserProfile';

const pages = [
  { label: 'หน้าผู้ใช้', path: '/app' },
  { label: 'หน้าหลัก', path: '/admin' },
  { label: 'แผล', path: '/admin/wound' },
  { label: 'บทความ', path: '/admin/articles' },
  { label: 'เคล็ดไม่ลับ', path: '/admin/trick' },
  { label: 'รู้หรือไม่', path: '/admin/didyouknow' },
];

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { data: user } = useUserProfile();
  const router = useRouter();

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

  const handleLogout = () => {
    logout();
    handleDrawerClose();
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
              <Logo />
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
              {user && <UserProfile user={user} onLogout={handleLogout} />}
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
        PaperProps={{
          sx: { backgroundColor: 'white' },
        }}
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
            <ListItem button onClick={handleLogout}>
              <ListItemText
                primaryTypographyProps={TypographyListItemText}
                primary="ออกจากระบบ"
              />
            </ListItem>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
