import { Box } from '@mui/material';
import BottomNav from 'components/bottombar/BottomNav';
import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ pb: 7 }}>
      <main>{children}</main>
      <BottomNav />
    </Box>
  );
}
