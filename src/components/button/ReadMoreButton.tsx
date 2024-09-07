import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import React from 'react';
import COLORS from 'theme/colors';

type ReadMoreButtonProps = {
  variant?: 'contained' | 'outlined';
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  height?: string | number;
  width?: string | number;
  text: string;
} & MuiButtonProps;

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  variant = 'contained',
  color = COLORS.blue[6],
  hoverColor = COLORS.blue[7],
  activeColor = COLORS.blue[7],
  height = '45px',
  width = '50%',
  text,
  sx,
  ...rest
}) => {
  return (
    <MuiButton
      variant={variant}
      sx={{
        backgroundColor: color,
        color: '#ffffff',
        height,
        width,
        '&:hover': {
          backgroundColor: hoverColor,
        },
        '&:active': {
          backgroundColor: activeColor,
        },
        ...sx,
      }}
      {...rest}
    >
      {text}
    </MuiButton>
  );
};

export default ReadMoreButton;
