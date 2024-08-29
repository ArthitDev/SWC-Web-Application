import { Box, Card, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import { getAllTricks } from 'services/trickService';
import { TrickData } from 'types/AdminGetDataTypes';
import BackButtonPage from 'utils/BackButtonPage';
import DataNotFound from 'utils/DataNotFound';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

const TrickPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<TrickData[], Error>(
    'tricks',
    getAllTricks
  );

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
          <HomeCardLoading
            borderColor="#2ECC71"
            backgroundColor="#F2F9FC"
            progressColor="#2ECC71"
            textColor="#1B8F29"
          />
        )}

        {error && (
          <HomeCardError
            borderColor="#2ECC71"
            backgroundColor="#F2F9FC"
            textColor="#1B8F29"
            errorMessage={error.message || 'ไม่สามารถโหลดข้อมูลได้'}
          />
        )}

        {!isLoading && !error && !Array.isArray(data) && <DataNotFound />}

        {!isLoading && !error && Array.isArray(data) && (
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
            {data.map((trick) => (
              <Card
                key={trick.id}
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
                      marginBottom: 2,
                      color: '#000000',
                      lineHeight: 1.5,
                      maxHeight: 200,
                      overflow: 'auto',
                    }}
                  >
                    {trick.trick_content}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </motion.div>
    </>
  );
};

export default TrickPage;
