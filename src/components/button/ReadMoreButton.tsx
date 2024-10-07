import { ArrowForward } from '@mui/icons-material';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import { styled } from '@mui/system';
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

// Custom Tooltip with black background
const CustomTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: '14px',
    borderRadius: '4px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#000000',
  },
}));

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
    <CustomTooltip title="อ่านเพิ่มเติมที่นี่" arrow placement="top">
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
    </CustomTooltip>
  );
};

export default ReadMoreButton;
