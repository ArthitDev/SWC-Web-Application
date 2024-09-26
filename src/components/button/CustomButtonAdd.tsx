import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';

type CustomButtonAddProps = ButtonProps & {
  onClick: () => void;
};

const CustomButtonAdd: React.FC<CustomButtonAddProps> = ({
  onClick,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      sx={{
        color: COLORS.white[1],
        backgroundColor: COLORS.blue[6],
        fontSize: 16,
        fontWeight: 600,
        boxShadow: 2,
        ...props.sx,
        '&:hover': { backgroundColor: COLORS.blue[6], boxShadow: 2 },
      }}
    >
      {props.children}
    </Button>
  );
};

export default CustomButtonAdd;
