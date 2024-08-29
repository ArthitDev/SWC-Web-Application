import { Box, CircularProgress, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import parse from 'html-react-parser';
import React from 'react';
import { useQuery } from 'react-query';
import { getWoundById, getWoundImageUrl } from 'services/woundService';
import BackButtonPage from 'utils/BackButtonPage';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

interface WoundDetailProps {
  id: string;
}

interface QueryError {
  message: string;
}

const WoundDetail: React.FC<WoundDetailProps> = ({ id }) => {
  useRefetchWebSocket('wounds', 'UPDATE_WOUNDS');
  const {
    data: wound,
    isLoading,
    error,
  } = useQuery(['wounds', id], () => getWoundById(id), {
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });

  // Sanitize the HTML content from wound_content
  const safeContent = wound?.wound_content
    ? DOMPurify.sanitize(wound.wound_content)
    : '';

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariants}
      transition={fadeInTransition}
    >
      <BackButtonPage label={wound?.wound_name || 'Back'} />

      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          padding={2}
        >
          <Typography color="error">
            Error: {(error as QueryError).message}
          </Typography>
        </Box>
      )}

      {!isLoading && !error && wound && (
        <Box
          sx={{
            padding: 2,
            margin: '0 auto',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            {wound.updated_at && (
              <Typography variant="body2" color="text.secondary">
                {new Date(wound.updated_at).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            )}
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {wound.wound_name}
            </Typography>
          </Box>
          {wound.wound_cover && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <img
                src={getWoundImageUrl(wound.wound_cover)}
                alt={wound.wound_name}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </Box>
          )}
          {wound.wound_content && (
            <Box className="wound-content">{parse(safeContent)}</Box>
          )}
        </Box>
      )}
    </motion.div>
  );
};

export default WoundDetail;
