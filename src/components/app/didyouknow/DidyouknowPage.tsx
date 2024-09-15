import { Box, Card, CircularProgress, Typography } from '@mui/material';
import BackButtonPage from 'components/button/BackButtonPage';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getDidyouknowWithPagination } from 'services/didyouknowService';
import { DidyouknowData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';
import ReusePagination from 'utils/ReusePagination';
import ScrollFadeIn from 'utils/ScrollFadeIn';

// กำหนดประเภทของข้อมูล Didyouknow และ Response
interface DidyouknowResponse {
  data: DidyouknowData[];
  totalPages: number;
}

const DidyouknowPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // ใช้ useQuery พร้อมกับการกำหนดประเภทข้อมูลของ data และ error
  const { data, isLoading, error } = useQuery<DidyouknowResponse, Error>(
    ['didyouknow', currentPage],
    async () => {
      const response = await getDidyouknowWithPagination(currentPage, limit);
      setTotalPages(response.totalPages);
      return response;
    },
    {
      keepPreviousData: true,
    }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeInVariants}
        transition={fadeInTransition}
      >
        <BackButtonPage label="รู้หรือไม่ ?" />

        {isLoading && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="70vh"
          >
            <CircularProgress />
            <Typography sx={{ marginTop: 2 }}>กำลังโหลดข้อมูล...</Typography>
          </Box>
        )}

        {error && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="70vh"
          >
            <Typography color="error">ไม่สามารถโหลดข้อมูลได้</Typography>
          </Box>
        )}

        {!isLoading && !error && data && data.data.length === 0 && (
          <DataNotFound />
        )}

        {!isLoading && !error && data && data.data.length > 0 && (
          <>
            <ReusePagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                gap: 2,
                pb: 5,
              }}
            >
              {data.data.map((didyouknow) => (
                <ScrollFadeIn key={didyouknow.id}>
                  <Card
                    sx={{
                      display: 'flex',
                      backgroundColor: '#F2F9FC',
                      borderRadius: '16px',
                      padding: 0,
                      width: '100%',
                      maxWidth: 500,
                      maxHeight: 300,
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      position: 'relative', // เพื่อให้จัดตำแหน่งมุมขวาล่างได้ง่ายขึ้น
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#EAB308',
                        width: '8px',
                      }}
                    />
                    <Box
                      sx={{
                        padding: 2,
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 'bold',
                            color: '#CA8A42',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <span
                            role="img"
                            aria-label="book"
                            style={{ marginRight: 8 }}
                          >
                            📖
                          </span>
                          {didyouknow.didyouknow_name}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          marginBottom: 5,
                          color: '#000000',
                          lineHeight: 1.5,
                          maxHeight: 200,
                          overflow: 'auto',
                        }}
                      >
                        {didyouknow.didyouknow_content}
                      </Typography>

                      {/* แสดงข้อมูล updated_at ที่มุมขวาล่าง */}
                      <Typography
                        variant="caption"
                        sx={{
                          position: 'absolute',
                          right: 16,
                          bottom: 16,
                          color: '#888888',
                        }}
                      >
                        {new Date(didyouknow.updated_at).toLocaleString(
                          'th-TH',
                          {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Typography>
                    </Box>
                  </Card>
                </ScrollFadeIn>
              ))}
            </Box>
          </>
        )}
      </motion.div>
    </>
  );
};

export default DidyouknowPage;
