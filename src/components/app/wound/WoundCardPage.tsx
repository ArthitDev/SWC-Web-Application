import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import ReadMoreButton from 'components/button/ReadMoreButton';
import usePagination from 'hooks/usePagination';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import {
  getWoundImageUrl,
  getWoundsWithPagination,
  trackWoundClick,
} from 'services/woundService';
import { WoundData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import ReusePagination from 'utils/ReusePagination';
import ScrollFadeIn from 'utils/ScrollFadeIn'; // นำเข้า ScrollFadeIn

type WoundCardPageProps = {
  filterEnabled: boolean;
  searchTerm: string;
};

const WoundCardPage: React.FC<WoundCardPageProps> = ({
  filterEnabled,
  searchTerm,
}) => {
  const router = useRouter();
  const [blurredWounds, setBlurredWounds] = useState<{
    [key: string]: boolean;
  }>({});

  useRefetchWebSocket('wounds', 'UPDATE_WOUNDS');

  const { page, limit, totalPages, setPage, setTotalPages } = usePagination(); // setup pagination states

  const {
    data: woundsData,
    isLoading,
    error,
  } = useQuery(
    ['wounds', page, limit, searchTerm],
    () => getWoundsWithPagination(page, limit, searchTerm),
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
      },
    }
  );

  const mutation = useMutation(
    (woundData: { woundId: number; clickCount: number }) =>
      trackWoundClick(woundData.woundId.toString(), woundData.clickCount),
    {
      onSuccess: () => {
        // Reset click count in local storage on success
      },
      onError: () => {
        // Handle error as needed
      },
    }
  );

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const toggleBlur = (id: number | string) => {
    const woundId = String(id);
    setBlurredWounds((prevState) => ({
      ...prevState,
      [woundId]: !prevState[woundId],
    }));
  };

  useEffect(() => {
    if (filterEnabled) {
      setBlurredWounds({});
    }
  }, [filterEnabled]);

  const getClicksFromStorage = (woundId: number) => {
    const clicks = JSON.parse(localStorage.getItem('woundClicks') || '{}');
    return clicks[woundId] || 0;
  };

  const setClicksToStorage = (woundId: number, count: number) => {
    const clicks = JSON.parse(localStorage.getItem('woundClicks') || '{}');
    clicks[woundId] = count;
    localStorage.setItem('woundClicks', JSON.stringify(clicks));
  };

  const handleReadMoreClick = (woundId: number) => {
    const clickCount = getClicksFromStorage(woundId) + 1;
    setClicksToStorage(woundId, clickCount);

    if (clickCount >= 5) {
      mutation.mutate({ woundId, clickCount });
      setClicksToStorage(woundId, 0);
    }
    router.push(`/app/wound/${woundId}`);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>กำลังโหลดข้อมูล...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography color="error">ไม่สามารถโหลดข้อมูลได้</Typography>
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
      {woundsData?.data && woundsData.data.length > 0 ? (
        woundsData.data.map((wound: WoundData) => {
          const woundId = String(wound.id);
          const isBlurred = filterEnabled
            ? true
            : blurredWounds[woundId] || false;
          return (
            <ScrollFadeIn key={wound.id}>
              <Card
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
                  <Box
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      width: '100%',
                      height: '250px',
                    }}
                    onClick={() => {
                      if (filterEnabled) {
                        toast('กรุณาปิดฟิลเตอร์หลักก่อนเพื่อดูภาพ', {
                          icon: '⚠️',
                        });
                      } else {
                        toggleBlur(wound.id);
                      }
                    }}
                  >
                    <img
                      src={getWoundImageUrl(wound.wound_cover)}
                      alt={wound.wound_name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: isBlurred ? 'blur(8px)' : 'none',
                        transition: 'filter 0.3s ease',
                      }}
                    />
                    {isBlurred && (
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                        }}
                      >
                        <VisibilityOffIcon />
                      </IconButton>
                    )}
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
                      onClick={() => handleReadMoreClick(wound.id)}
                      fullWidth
                      text="อ่านเพิ่มเติม"
                      sx={{ mt: 3 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </ScrollFadeIn>
          );
        })
      ) : (
        <DataNotFound />
      )}

      <ReusePagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default WoundCardPage;
