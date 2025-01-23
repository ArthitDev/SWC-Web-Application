import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import WoundDetail from 'components/app/wound/WoundDetail';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { getWoundById } from 'services/woundService';

import FetchError from '@/utils/FetchError';

const WoundDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: wound,
    isLoading,
    error,
  } = useQuery(['wound', id], () => getWoundById(id as string), {
    enabled: !!id,
  });

  if (!id) return null;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <FetchError />;
  }

  return (
    <WoundDetail id={id as string} wound_video={wound?.wound_video || []} />
  );
};

export default WoundDetailPage;
