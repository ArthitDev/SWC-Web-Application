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
      fontSize: { xs: '12px', sm: '16px' },
      backgroundColor,
      color,
      padding: '8px 16px',
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    {text}
  </Box>
);

export default FeatureBadge;
