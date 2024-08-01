import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import React from 'react';

type CustomButtonProps = {
  variant?: 'contained' | 'outlined';
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  height?: string | number;
  width?: string | number;
  text: string;
} & MuiButtonProps;

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'contained',
  color = '#E58C28',
  hoverColor = '#C97A22',
  activeColor = '#B36D1E',
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

export default CustomButton;
