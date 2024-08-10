import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import React from 'react';

type CustomeButtonLandingProps = {
  variant?: 'contained' | 'outlined';
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  height?: string | number;
  width?: string | number;
  text: string;
} & MuiButtonProps;

const CustomeButtonLanding: React.FC<CustomeButtonLandingProps> = ({
  variant = 'contained',
  color = '#E58C28',
  hoverColor = '#C97A22',
  activeColor = '#B36D1E',
  height = '45px',
  width = '100%',
  text,
  sx,
  ...rest
}) => {
  return (
    <MuiButton
      variant={variant}
      sx={{
        borderRadius: 2,
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

export default CustomeButtonLanding;
