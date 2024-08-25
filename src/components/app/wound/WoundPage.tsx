import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import COLORS from 'theme/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

const WoundPage: React.FC = () => {
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
            แผล
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '8px',
              backgroundColor: '#BFDBFE',
              borderRadius: '10px',
              ml: 2.5,
            }}
          />
        </Box>
      </motion.div>
    </>
  );
};

export default WoundPage;
