import { ArrowForward } from '@mui/icons-material';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';

type ReadMoreButtonProps = {
  variant?: 'contained' | 'outlined' | 'text';
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  height?: string | number;
  width?: string | number;
  text?: string;
} & MuiButtonProps;

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  variant = 'text',
  color = COLORS.blue[6],
  hoverColor = COLORS.blue[7],
  activeColor = COLORS.blue[6],
  height = '45px',
  width = 'auto',
  text = 'อ่านเพิ่มเติม',
  sx,
  ...rest
}) => {
  return (
    <MuiButton
      variant={variant}
      endIcon={<ArrowForward />}
      sx={{
        backgroundColor: variant === 'contained' ? color : 'transparent',
        color: variant === 'contained' ? '#ffffff' : color,
        height,
        width,
        padding: '8px 16px',
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor:
            variant === 'contained' ? hoverColor : 'rgba(0, 0, 0, 0.04)',
          color: variant === 'contained' ? '#ffffff' : hoverColor,
          transform: 'translateX(4px)',
        },
        '&:active': {
          backgroundColor:
            variant === 'contained' ? activeColor : 'rgba(0, 0, 0, 0.08)',
          color: variant === 'contained' ? '#ffffff' : activeColor,
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
