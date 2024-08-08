import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import {
  boxStyle,
  containerStyle,
  descriptionStyle,
  titleStyle,
} from 'styles/login.style';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container component="main" maxWidth="xs" sx={containerStyle}>
      <Box sx={boxStyle}>
        <Box sx={titleStyle}>
          <Image
            src="/images/logo-full.png"
            alt="SWC Logo"
            width={170}
            height={70}
            priority
          />
        </Box>
        {children}
        <Typography variant="body2" sx={descriptionStyle}>
          Smart Wound Care (SWC) - เว็บแอปพลิเคชันให้คำแนะนำในการดูแลแผลอัจฉริยะ
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthLayout;
