import { Box } from '@mui/material';
import React from 'react';

import TopCardLoading from './TopCardLoading';

const LoadingFiveCards: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        pb: 2,
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <TopCardLoading key={index} />
      ))}
    </Box>
  );
};

export default LoadingFiveCards;
