import { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: { xs: 2, sm: 3 }, // Responsive padding
};

export const boxStyle: SxProps<Theme> = {
  padding: { xs: 2, sm: 4 }, // Responsive padding
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'background.paper',
  borderRadius: 2,
  boxShadow: 3,
  minWidth: { xs: '90vw', sm: '65vh' }, // Responsive width
  maxWidth: { xs: '100vw', sm: 'none' }, // Prevent overflow on small screens
};

export const titleStyle: SxProps<Theme> = {
  mb: { xs: 1, sm: 2 }, // Responsive margin-bottom
  objectFit: 'contain',
  maxWidth: '100%',
  height: 'auto',
};

export const descriptionStyle: SxProps<Theme> = {
  mt: { xs: 1, sm: 2 }, // Responsive margin-top
  textAlign: 'center',
  color: 'text.secondary',
};
