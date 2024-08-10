import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface LandingProps {
  children: ReactNode;
}

export default function Landing({ children }: LandingProps) {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(347deg, rgba(58,156,253,1) 40%, rgba(23,35,110,1) 100%)',
        // background:
        //   "linear-gradient(347deg, rgba(58,156,253,1) 40%, rgba(23,35,110,1) 100%)",
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <main>{children}</main>
    </Box>
  );
}
