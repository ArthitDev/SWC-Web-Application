import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import React from 'react';

type ReusableDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const ReusableDrawer: React.FC<ReusableDrawerProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100%', sm: '80%', md: 500, lg: 800, xl: 900 },
          maxWidth: '100%',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={2}>{children}</Box>
      </Box>
    </Drawer>
  );
};

export default ReusableDrawer;
