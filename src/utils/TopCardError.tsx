import { Box, Card, Typography } from '@mui/material';
import React from 'react';

interface TopCardErrorProps {
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  errorMessage?: string;
}

const TopCardError: React.FC<TopCardErrorProps> = ({
  textColor = '#FF0000',
  errorMessage = 'มีปัญหาบางอย่างที่ไม่ทราบสาเหตุ.',
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        padding: 0,
        width: '100%',
        maxWidth: 500,
        boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
        height: '60px',
        marginBottom: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography sx={{ color: textColor }}>
          <span role="img" aria-label="error" style={{ marginRight: 8 }}>
            ⚠️
          </span>
          {errorMessage}
        </Typography>
      </Box>
    </Card>
  );
};

export default TopCardError;
