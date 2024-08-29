import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import ReadMoreButton from 'components/button/ReadMoreButton';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { getAllWounds, getWoundImageUrl } from 'services/woundService';
import { WoundData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';

const WoundCardPage: React.FC = () => {
  const router = useRouter();

  useRefetchWebSocket('wounds', 'UPDATE_WOUNDS');

  const {
    data: wounds,
    isLoading,
    error,
  } = useQuery<WoundData[], Error>('wounds', getAllWounds, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {Array.isArray(wounds) && wounds.length > 0 ? (
        wounds.map((wound) => (
          <Card
            key={wound.id}
            elevation={1}
            sx={{
              width: '100%',
              maxWidth: '400px',
              marginBottom: 3,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {wound.wound_cover && (
              <Box sx={{ position: 'relative' }}>
                <img
                  src={getWoundImageUrl(wound.wound_cover)}
                  alt={wound.wound_name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight="bold"
              >
                {wound.wound_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="start"
              >
                {stripHtmlTags(wound.wound_content).substring(0, 100)}...
              </Typography>
              <Box>
                <ReadMoreButton
                  onClick={() => router.push(`/app/wound/${wound.id}`)}
                  fullWidth
                  text="อ่านเพิ่มเติม"
                  sx={{
                    mt: 3,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <DataNotFound />
      )}
    </Box>
  );
};

export default WoundCardPage;
