import { Box, Typography } from '@mui/material';
import SearchBoxApp from 'components/search/SearchBoxApp';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import COLORS from 'theme/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

import ArticleCardPage from './ArticleCardPage';

const ArticlePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
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
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={'bold'}
            sx={{ mt: 1, pl: 3, color: COLORS.blue[6] }}
          >
            บทความ
          </Typography>
          <Box
            sx={{
              width: '135px',
              height: '8px',
              backgroundColor: '#BFDBFE',
              borderRadius: '10px',
              ml: 2.5,
            }}
          />
        </Box>
        <SearchBoxApp
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          placeholder="ค้นหาบทความ..."
          buttonLabel="ค้นหา"
        />
        <Box>
          <ArticleCardPage searchTerm={searchTerm} />
          {/* ส่ง searchTerm เป็น prop */}
        </Box>
      </motion.div>
    </>
  );
};

export default ArticlePage;
