import { Box } from '@mui/material';
import React from 'react';

const FeatureBadge: React.FC<{
  text: string;
  backgroundColor: string;
  color: string;
}> = ({ text, backgroundColor, color }) => (
  <Box
    sx={{
      borderRadius: '20px',
      fontSize: { xs: '16px', sm: '16px' },
      backgroundColor,
      color,
      padding: '5px 10px',
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
    }}
  >
    {text}
  </Box>
);

export default FeatureBadge;
