import { Box } from '@mui/material';
import React from 'react';

const IconCircle: React.FC<{
  icon: React.ReactNode;
  backgroundColor: string;
}> = ({ icon, backgroundColor }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
      borderRadius: '50%',
      backgroundColor,
    }}
  >
    {icon}
  </Box>
);

export default IconCircle;
