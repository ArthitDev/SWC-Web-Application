import { Box, Button } from '@mui/material';
import React from 'react';
import COLORS from 'theme/colors';

type ReusePaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const ReusePagination: React.FC<ReusePaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={2}
      mb={2}
    >
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          minWidth: '36px',
          minHeight: '36px',
          margin: '0 8px',
          color: 'black',
          backgroundColor: 'white',
          border: '1px solid lightgray',
          borderRadius: '8px',
          ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
        }}
      >
        &lt;
      </Button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            sx={{
              minWidth: '36px',
              minHeight: '36px',
              margin: '0 4px',
              backgroundColor: page === currentPage ? COLORS.blue[6] : 'white',
              color: page === currentPage ? 'white' : 'gray',
              border: page === currentPage ? 'none' : '1px solid lightgray',
              borderRadius: '8px',
              ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
            }}
          >
            {page}
          </Button>
        )
      )}

      {/* Next Page Button */}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          minWidth: '36px',
          minHeight: '36px',
          margin: '0 8px',
          color: 'black',
          backgroundColor: 'white',
          border: '1px solid lightgray',
          borderRadius: '8px',
          ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
        }}
      >
        &gt;
      </Button>
    </Box>
  );
};

export default ReusePagination;
