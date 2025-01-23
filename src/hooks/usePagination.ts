import { useState } from 'react';

type PaginationHook = {
  page: number;
  limit: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
};

const usePagination = (
  initialPage: number = 1,
  initialLimit: number = 5
): PaginationHook => {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);

  return {
    page,
    limit,
    totalPages,
    setPage,
    setTotalPages,
  };
};

export default usePagination;
