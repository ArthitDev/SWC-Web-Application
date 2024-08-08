import Typography from '@mui/material/Typography';
import React from 'react';
import { TypographyLogoStyles } from 'styles/Navbar.style';

const Logo: React.FC = () => {
  return (
    <Typography variant="h6" noWrap component="div" sx={TypographyLogoStyles}>
      SWC Management
    </Typography>
  );
};

export default Logo;
