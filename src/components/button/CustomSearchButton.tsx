import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import COLORS from 'theme/colors';

interface CustomSearchButtonProps extends ButtonProps {
  label: string;
}

const CustomSearchButton: React.FC<CustomSearchButtonProps> = ({
  label,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontSize: '16px',
        height: '40px',
        minWidth: '150px',
        backgroundColor: COLORS.blue[6],
        '&:hover': {
          backgroundColor: COLORS.blue[7],
        },
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomSearchButton;
