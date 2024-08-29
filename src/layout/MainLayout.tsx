import { Box } from '@mui/material';
import BottomNav from 'components/bottombar/BottomNav';
import { useRouter } from 'next/router'; // Import useRouter จาก next/router
import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter(); // สร้าง router instance

  const hideBottomNav = router.pathname === '/app/predict/result';

  return (
    <Box sx={{ pb: hideBottomNav ? 0 : 9 }}>
      <main>{children}</main>
      {!hideBottomNav && <BottomNav />}
    </Box>
  );
}
