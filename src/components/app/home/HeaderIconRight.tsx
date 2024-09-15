// HeaderIconRight.tsx
import { Box } from '@mui/material';
import React from 'react';

interface HeaderIconProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const HeaderIconRight: React.FC<HeaderIconProps> = ({ icon, onClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {icon}
    </Box>
  );
};

export default HeaderIconRight;
