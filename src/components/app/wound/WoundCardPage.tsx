import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
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
import useFormatDate from 'hooks/useFormatDate';
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
import ScrollFadeIn from 'utils/ScrollFadeIn';

type WoundCardPageProps = {
  filterEnabled: boolean;
  searchTerm: string;
};

const WoundCardPage: React.FC<WoundCardPageProps> = ({
  filterEnabled,
  searchTerm,
}) => {
  const router = useRouter();
  const { page: queryPage } = router.query;
  const [blurredWounds, setBlurredWounds] = useState<{
    [key: string]: boolean;
  }>({});
  const [randomWoundImages, setRandomWoundImages] = useState<{
    [key: string]: string;
  }>({});
  const { formatDate } = useFormatDate();

  useRefetchWebSocket('wounds', 'UPDATE_WOUNDS');

  const { page, limit, totalPages, setPage, setTotalPages } = usePagination();

  const {
    data: woundsData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['wounds', page, limit, searchTerm],
    () => getWoundsWithPagination(page, limit, searchTerm),
    {
      cacheTime: 1000 * 60 * 10,
      onSuccess: (data) => {
        if (data) {
          setTotalPages(data.totalPages || 0);
        }
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [router.query.page, refetch]);

  useEffect(() => {
    setPage(1); // เมื่อมีการค้นหาใหม่ จะกลับไปที่หน้า 1
  }, [searchTerm, setPage]);

  useEffect(() => {
    if (queryPage) {
      setPage(Number(queryPage));
    }
  }, [queryPage]);

  const mutation = useMutation(
    (woundData: { woundId: number; clickCount: number }) =>
      trackWoundClick(woundData.woundId, woundData.clickCount),
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

    if (clickCount >= 3) {
      mutation.mutate({ woundId, clickCount });
      setClicksToStorage(woundId, 0);
    }
    router.push(`/app/wound/${woundId}?page=${page}`);
  };

  // สุ่มเลือกรูปภาพแผล
  useEffect(() => {
    if (woundsData?.data) {
      const randomImages: { [key: string]: string } = {};
      woundsData.data.forEach((wound: WoundData) => {
        if (wound.wound_covers && wound.wound_covers.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * wound.wound_covers.length
          );
          randomImages[wound.id] = getWoundImageUrl(
            wound.wound_covers[randomIndex].url
          );
        }
      });
      setRandomWoundImages(randomImages);
    }
  }, [woundsData]);

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
        pl: 3,
        pr: 3,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <ScrollFadeIn>
        <Box pt={2.5}>
          <Typography variant="body2">
            {`แสดงแผล ${Math.min(
              (page - 1) * limit + 1,
              woundsData?.totalItems || 0
            )} - 
        ${Math.min(page * limit, woundsData?.totalItems || 0)} 
        จากทั้งหมด ${woundsData?.totalItems || 0} แผล`}
          </Typography>
        </Box>
      </ScrollFadeIn>
      <ScrollFadeIn>
        <Box pb={2}>
          <ReusePagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </ScrollFadeIn>
      {woundsData?.data && woundsData.data.length > 0 ? (
        woundsData.data.map((wound: WoundData) => {
          const woundId = String(wound.id);
          const isBlurred = filterEnabled
            ? true
            : blurredWounds[woundId] || false;
          return (
            <ScrollFadeIn key={wound.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: '12px',
                  width: '100%',
                  maxWidth: '400px',
                  marginBottom: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
                  '&:hover': {
                    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                  },
                }}
              >
                {wound.wound_covers && wound.wound_covers.length > 0 && (
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
                      src={randomWoundImages[woundId]}
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
                  <Box display="flex" alignItems="center" mt={2}>
                    <RemoveRedEyeTwoToneIcon sx={{ mr: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'medium', color: 'gray' }}
                    >
                      {wound.click_counts || 0}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <EventAvailableTwoToneIcon sx={{ mr: 1 }} />{' '}
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'medium', color: 'gray' }}
                    >
                      {formatDate(wound.updated_at || 'ไม่ระบุ')}
                    </Typography>
                  </Box>

                  <Box display={'flex'} justifyContent={'flex-end'}>
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
      <ScrollFadeIn>
        <Box pt={2}>
          <Typography variant="body2">
            {`แสดงแผล ${Math.min(
              (page - 1) * limit + 1,
              woundsData?.totalItems || 0
            )} - 
        ${Math.min(page * limit, woundsData?.totalItems || 0)} 
        จากทั้งหมด ${woundsData?.totalItems || 0} แผล`}
          </Typography>
        </Box>
      </ScrollFadeIn>
      <ScrollFadeIn>
        <Box>
          <ReusePagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </ScrollFadeIn>
    </Box>
  );
};

export default WoundCardPage;
