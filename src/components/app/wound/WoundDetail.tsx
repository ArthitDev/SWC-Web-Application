import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getWoundById, getWoundImageUrl } from 'services/woundService';
import COLORS from 'theme/colors';
import BackButtonPage from 'utils/BackButtonPage';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';
import ScrollToTop from 'utils/ScrollToTop';

interface WoundDetailProps {
  id: string;
}

interface QueryError {
  message: string;
}

const WoundDetail: React.FC<WoundDetailProps> = ({ id }) => {
  const [isBlurred, setIsBlurred] = useState(true); // สถานะการเบลอของรูปภาพ
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

  let parsedRefs = [];
  if (wound?.ref) {
    if (Array.isArray(wound.ref)) {
      parsedRefs = wound.ref;
    } else {
      parsedRefs = JSON.parse(wound.ref);
    }
  }

  const toggleBlur = () => {
    setIsBlurred((prev) => !prev);
  };

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
                {new Date(wound.updated_at).toLocaleString('th-TH', {
                  timeZone: 'UTC',
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
              onClick={toggleBlur}
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2,
                cursor: 'pointer',
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
                  filter: isBlurred ? 'blur(10px)' : 'none',
                  transition: 'filter 0.3s ease',
                }}
              />
              {isBlurred && (
                <VisibilityOffIcon
                  sx={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: '2rem',
                  }}
                />
              )}
            </Box>
          )}
          {wound.wound_content && (
            <Box className="wound-content">{parse(safeContent)}</Box>
          )}
          <Box pt={2}>
            {wound.wound_note && (
              <Box
                sx={{
                  marginBottom: 2,
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    width: '5px',
                    backgroundColor: COLORS.blue[6],
                    marginRight: 2,
                    flexShrink: 0,
                    height: 'auto',
                    alignSelf: 'stretch',
                  }}
                />
                <Typography variant="body1" color="text.secondary">
                  {wound.wound_note}
                </Typography>
              </Box>
            )}
          </Box>
          <Box pt={2}>
            {parsedRefs.length > 0 && (
              <Box
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(58,156,253,1) 0%, rgba(35,90,219,1) 100%)',
                  borderRadius: 2,
                  padding: 3,
                  marginBottom: 3,
                  color: 'white',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  แหล่งอ้างอิง
                </Typography>
                {parsedRefs.map((refItem: { value: string }, index: number) => (
                  <Link
                    key={index}
                    href={refItem.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    sx={{
                      display: 'block',
                      wordBreak: 'break-all',
                      marginBottom: 2,
                    }}
                  >
                    {refItem.value}
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
      <ScrollToTop />
    </motion.div>
  );
};

export default WoundDetail;
