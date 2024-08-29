// BottomNav.tsx
import { Book, Camera, Healing, Home } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const BottomNav: React.FC = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (true) {
      case router.pathname === '/app':
        setValue(0);
        break;
      case router.pathname.startsWith('/app/wound'):
        setValue(1);
        break;
      case router.pathname.startsWith('/app/article'):
        setValue(2);
        break;
      case router.pathname.startsWith('/app/predict'):
        setValue(3);
        break;
      case router.pathname.startsWith('/app/trick'):
        setValue(-1);
        break;
      case router.pathname.startsWith('/app/didyouknow'):
        setValue(-1);
        break;
      default:
        setValue(0);
        break;
    }
  }, [router.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    try {
      switch (newValue) {
        case 0:
          router.push('/app');
          break;
        case 1:
          router.push('/app/wound');
          break;
        case 2:
          router.push('/app/article');
          break;
        case 3:
          router.push('/app/predict');
          break;
        default:
          router.push('/app');
          break;
      }
    } catch (error) {
      toast.error('ขออภัย ไม่มีหน้านี้');
    }
  };

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          sx={{
            width: '100%',
            maxWidth: 500,
            '& .MuiBottomNavigationAction-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                fontSize: 'inherit',
                '& .MuiBottomNavigationAction-label': {
                  transform: 'none',
                },
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '14px',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '26px',
              },
            },
          }}
        >
          <BottomNavigationAction label="หน้าหลัก" icon={<Home />} />
          <BottomNavigationAction label="แผล" icon={<Healing />} />
          <BottomNavigationAction label="บทความ" icon={<Book />} />
          <BottomNavigationAction label="ถ่ายรูปแผล" icon={<Camera />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default BottomNav;
