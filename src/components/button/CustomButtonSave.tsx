import type { ButtonProps } from '@mui/material';
import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';

type CustomButtonSaveProps = ButtonProps & {
  loading?: boolean;
};

const CustomButtonSave: React.FC<CustomButtonSaveProps> = ({
  loading = false,
  ...props
}) => {
  return (
    <Button
      type="submit"
      {...props}
      disabled={loading || props.disabled}
      sx={{
        width: '150px',
        color: COLORS.white[1],
        backgroundColor: COLORS.blue[6],
        fontSize: 16,
        fontWeight: 600,
        boxShadow: 2,
        ...props.sx,
        '&:hover': { backgroundColor: COLORS.blue[6], boxShadow: 2 },
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: COLORS.blue[6] }} />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default CustomButtonSave;
