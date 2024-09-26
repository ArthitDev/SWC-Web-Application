import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import { IconButton, Snackbar, styled } from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';

// Snackbar styles
const SnackbarContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const WaveAnimation = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& div': {
    width: '8px',
    height: '8px',
    margin: '0 2px',
    backgroundColor: COLORS.blue[6],
    borderRadius: '50%',
    animation: 'wave 1.2s linear infinite',
  },
  '& div:nth-of-type(2)': {
    animationDelay: '-1.1s',
  },
  '& div:nth-of-type(3)': {
    animationDelay: '-1.0s',
  },
  '@keyframes wave': {
    '0%, 100%': { transform: 'scale(0.8)' },
    '50%': { transform: 'scale(1.5)' },
  },
});

interface ListeningSnackbarProps {
  open: boolean;
  onClose: () => void;
  onStopListening: () => void; // Add a new prop for stopping listening
}

const ListeningSnackbar: React.FC<ListeningSnackbarProps> = ({
  open,
  onClose,
  onStopListening, // Destructure the new prop
}) => {
  return (
    <Snackbar
      open={open}
      message={
        <SnackbarContent>
          เปิดไมค์แล้ว พูดแทนการพิมพ์...
          <WaveAnimation>
            <div />
            <div />
            <div />
          </WaveAnimation>
        </SnackbarContent>
      }
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={null}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onStopListening} // Use the new prop function
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

export default ListeningSnackbar;
