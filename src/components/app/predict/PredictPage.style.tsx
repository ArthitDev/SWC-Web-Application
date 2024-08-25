import { SxProps, Theme } from '@mui/material/styles';
import COLORS from 'theme/colors';

export const Container: SxProps<Theme> = {
  maxWidth: 400,
  margin: 'auto',
  padding: 2,
};

export const Header: SxProps<Theme> = {
  color: COLORS.blue[6],
  fontWeight: 'bold',
  textAlign: 'center',
  mb: 1,
  fontSize: '30px',
};

export const Divider: SxProps<Theme> = {
  height: 8,
  backgroundColor: '#bfdbfe',
  borderRadius: 5,
  mb: 3,
};

export const Description: SxProps<Theme> = {
  textAlign: 'center',
  mb: 2,
};

export const ImageContainer: SxProps<Theme> = {
  position: 'relative',
  border: '1px solid #e2e8f0',
  borderRadius: 4,
  p: 3,
  textAlign: 'center',
  mb: 2,
  height: 250,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f8fafc',
  overflow: 'hidden',
};

export const IconWrapper: SxProps<Theme> = {
  width: 60,
  height: 60,
  backgroundColor: '#e2e8f0',
  borderRadius: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mb: 2,
};

export const IconDescription: SxProps<Theme> = {
  color: '#64748b',
};

export const ButtonGroup: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const MainButton: SxProps<Theme> = {
  backgroundColor: COLORS.blue[6],
  '&:hover': { backgroundColor: '#3b82f6' },
  textTransform: 'none',
  borderRadius: 2,
  py: 1,
  px: 2,
  height: 48,
  flex: 1,
  mr: 1,
};

export const IconButton: SxProps<Theme> = {
  minWidth: 0,
  width: 48,
  height: 48,
  mr: 1,
  backgroundColor: COLORS.blue[6],
  '&:hover': { backgroundColor: '#3b82f6' },
  borderRadius: 2,
};

export const DeletePreviewButton: SxProps<Theme> = {
  position: 'absolute',
  bottom: 8,
  right: 8,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#f8d7da',
  },
  borderRadius: '8px',
  boxShadow: 1,
  padding: '5px',
};
