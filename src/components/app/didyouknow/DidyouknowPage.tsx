import { Box, Card, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import { getAllDidyouknow } from 'services/didyouknowService';
import { DidyouknowData } from 'types/AdminGetDataTypes';
import BackButtonPage from 'utils/BackButtonPage';
import DataNotFound from 'utils/DataNotFound';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

const DidyouknowPage: React.FC = () => {
  // Specify the error type here (Error, string, or any other type you expect)
  const { data, isLoading, error } = useQuery<DidyouknowData[], Error>(
    'didyouknow',
    getAllDidyouknow
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
        <BackButtonPage label="รู้หรือไม่ ?" />

        {isLoading && (
          <HomeCardLoading
            borderColor="#EAB308"
            backgroundColor="#F2F9FC"
            progressColor="#EAB308"
            textColor="#EAB308"
          />
        )}

        {error && (
          <HomeCardError
            borderColor="#EAB308"
            backgroundColor="#F2F9FC"
            textColor="#EAB308"
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
            {data.map((didyouknow) => (
              <Card
                key={didyouknow.id}
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
                        aria-label="lightbulb"
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
                      marginBottom: 2,
                      color: '#000000',
                      lineHeight: 1.5,
                      maxHeight: 200,
                      overflow: 'auto',
                    }}
                  >
                    {didyouknow.didyouknow_content}
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

export default DidyouknowPage;
