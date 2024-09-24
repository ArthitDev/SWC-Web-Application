import { Box, Card, CircularProgress, Typography } from '@mui/material';
import BackButtonPage from 'components/button/BackButtonPage';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getTricksWithPagination } from 'services/trickService';
import { TrickData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';
import ReusePagination from 'utils/ReusePagination';
import ScrollFadeIn from 'utils/ScrollFadeIn'; // นำเข้า ScrollFadeIn

// กำหนดประเภทของข้อมูล Trick และ Response

interface TricksResponse {
  data: TrickData[];
  totalPages: number;
  totalItems: number;
}

const TrickPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // จำนวนรายการต่อหน้า

  const { data, isLoading, error } = useQuery<TricksResponse, Error>(
    ['tricks', currentPage], // ใช้ query key เพื่อแยก cache ตามหน้า
    async () => {
      const response = await getTricksWithPagination(currentPage, limit);
      setTotalPages(response.totalPages); // อัปเดตจำนวนหน้าทั้งหมดจาก response
      return response;
    },
    {
      keepPreviousData: true, // เก็บข้อมูลก่อนหน้าระหว่างการดึงข้อมูลใหม่
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
        <BackButtonPage label="เคล็ดไม่ลับ" />

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
            <ScrollFadeIn>
              <Box pt={2.5}>
                <Typography variant="body2">
                  {`แสดงเคล็ดลับ ${Math.min(
                    (currentPage - 1) * limit + 1,
                    data.totalItems || 0
                  )} - 
          ${Math.min(currentPage * limit, data.totalItems || 0)} 
          จากทั้งหมด ${data.totalItems || 0} เคล็ดลับ`}
                </Typography>
              </Box>
            </ScrollFadeIn>
            <ScrollFadeIn>
              <Box>
                <ReusePagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </Box>
            </ScrollFadeIn>
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
              {data.data.map((trick) => (
                <ScrollFadeIn key={trick.id}>
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
                        backgroundColor: '#2ECC71',
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
                            color: '#1B8F29',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <span
                            role="img"
                            aria-label="lightbulb"
                            style={{ marginRight: 8 }}
                          >
                            💡
                          </span>
                          {trick.trick_name}
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
                        {trick.trick_content}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          position: 'absolute',
                          right: 16,
                          bottom: 16,
                          color: '#888888',
                        }}
                      >
                        {`วันที่อัพเดทข้อมูลเคล็ดไม่ลับ - วันที่ ${new Date(
                          trick.updated_at
                        ).toLocaleString('th-TH', {
                          timeZone: 'UTC',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}`}
                      </Typography>
                    </Box>
                  </Card>
                </ScrollFadeIn>
              ))}
            </Box>
            <Box pb={2}>
              <ScrollFadeIn>
                <Box>
                  <Typography variant="body2">
                    {`แสดงเคล็ดลับ ${Math.min(
                      (currentPage - 1) * limit + 1,
                      data.totalItems || 0
                    )} - 
          ${Math.min(currentPage * limit, data.totalItems || 0)} 
          จากทั้งหมด ${data.totalItems || 0} เคล็ดลับ`}
                  </Typography>
                </Box>
              </ScrollFadeIn>
              <ScrollFadeIn>
                <ReusePagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </ScrollFadeIn>
            </Box>
          </>
        )}
      </motion.div>
    </>
  );
};

export default TrickPage;
