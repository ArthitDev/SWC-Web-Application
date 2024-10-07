import { Box } from '@mui/material';
import React from 'react';

import TopCardError from '@/utils/TopCardError';

// Define the type of error
interface ErrorFiveCardsProps {
  errorType: 'loadingError' | 'noDataError';
}

const ErrorFiveCards: React.FC<ErrorFiveCardsProps> = ({ errorType }) => {
  const errorMessage =
    errorType === 'loadingError'
      ? 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง'
      : 'ไม่พบข้อมูลในขณะนี้';

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
        <TopCardError key={index} errorMessage={errorMessage} />
      ))}
    </Box>
  );
};

export default ErrorFiveCards;
