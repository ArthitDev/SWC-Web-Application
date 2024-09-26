import { Box, Button } from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';

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

  const renderPageButtons = () => {
    const pages = [];

    // Pages around the current page
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    // Always show the first page
    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          onClick={() => handlePageChange(1)}
          sx={{
            minWidth: '36px',
            minHeight: '36px',
            margin: '0 4px',
            backgroundColor: currentPage === 1 ? COLORS.blue[6] : 'white',
            color: currentPage === 1 ? 'white' : 'black',
            border: '1px solid lightgray',
            borderRadius: '8px',
            fontSize: '16px',
            ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
          }}
        >
          1
        </Button>
      );
    }

    // Show dots if there are more than 3 pages before the current page
    if (startPage > 2) {
      pages.push(
        <Button
          key="prev-dots"
          disabled
          sx={{
            minWidth: '36px',
            minHeight: '36px',
            margin: '0 4px',
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid lightgray',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          ...
        </Button>
      );
    }

    // Show pages around the current page
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          sx={{
            minWidth: '36px',
            minHeight: '36px',
            margin: '0 4px',
            backgroundColor: page === currentPage ? COLORS.blue[6] : 'white',
            color: page === currentPage ? 'white' : 'black',
            border: '1px solid lightgray',
            borderRadius: '8px',
            fontSize: '16px',
            ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
          }}
        >
          {page}
        </Button>
      );
    }

    // Show dots if there are more than 3 pages after the current page
    if (endPage < totalPages - 1) {
      pages.push(
        <Button
          key="next-dots"
          disabled
          sx={{
            minWidth: '36px',
            minHeight: '36px',
            margin: '0 4px',
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid lightgray',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          ...
        </Button>
      );
    }

    // Always show the last page
    if (endPage < totalPages) {
      pages.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          sx={{
            minWidth: '36px',
            minHeight: '36px',
            margin: '0 4px',
            backgroundColor:
              currentPage === totalPages ? COLORS.blue[6] : 'white',
            color: currentPage === totalPages ? 'white' : 'black',
            border: '1px solid lightgray',
            borderRadius: '8px',
            fontSize: '16px',
            ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
          }}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={2}
      mb={2}
    >
      {/* << (First Page) */}
      <Button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        sx={{
          minWidth: '36px',
          minHeight: '36px',
          margin: '0 4px',
          color: currentPage === 1 ? 'gray' : 'black',
          backgroundColor: 'white',
          border: '1px solid lightgray',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
        }}
      >
        &lt;&lt;
      </Button>

      {/* Previous Button */}
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          minWidth: '36px',
          minHeight: '36px',
          margin: '0 8px',
          color: currentPage === 1 ? 'gray' : 'black',
          backgroundColor: 'white',
          border: '1px solid lightgray',
          borderRadius: '8px',
          fontSize: '16px',
          ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
        }}
      >
        &lt;
      </Button>

      {/* Page 1, 2, 3 and dots */}
      {renderPageButtons()}

      {/* Next Button */}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          minWidth: '36px',
          minHeight: '36px',
          margin: '0 8px',
          color: currentPage === totalPages ? 'gray' : 'black',
          backgroundColor: 'white',
          border: '1px solid lightgray',
          borderRadius: '8px',
          fontSize: '16px',
          ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
        }}
      >
        &gt;
      </Button>

      {/* >> (Last Page) */}
      <Button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        sx={{
          minWidth: '36px',
          minHeight: '36px',
          margin: '0 4px',
          color: currentPage === totalPages ? 'gray' : 'black',
          backgroundColor: 'white',
          border: '1px solid lightgray',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          ':hover': { backgroundColor: COLORS.blue[6], color: 'white' },
        }}
      >
        &gt;&gt;
      </Button>
    </Box>
  );
};

export default ReusePagination;
