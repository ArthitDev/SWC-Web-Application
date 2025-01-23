import { Box } from '@mui/material';
import React from 'react';

const FeatureBadge: React.FC<{
  text: string;
  backgroundColor: string;
  color: string;
  onClick?: () => void;
}> = ({ text, backgroundColor, color, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      borderRadius: '20px',
      fontSize: { xs: '14px', sm: '16px' },
      backgroundColor,
      color,
      padding: '5px 10px',
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.2)',
      },
      '&:active': {
        transform: 'scale(1.2)',
      },
    }}
  >
    {text}
  </Box>
);

export default FeatureBadge;
