import { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const boxStyle: SxProps<Theme> = {
  padding: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'background.paper',
  borderRadius: 2,
  boxShadow: 3,
  minWidth: '65vh',
};

export const titleStyle: SxProps<Theme> = {
  mb: 1,
  objectFit: 'contain',
  maxWidth: '100%',
  height: 'auto',
};

export const descriptionStyle: SxProps<Theme> = {
  mt: 2,
  textAlign: 'center',
  color: 'text.secondary',
};
