import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import React from 'react';

const TrickDidLoading = () => {
  return (
    <Box sx={{ width: 'calc(100% - 30px)', margin: '0 auto' }}>
      {Array.from(new Array(5)).map((_, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            mb: 2,
            borderRadius: 2,
            border: `1px solid #e0e0e0`,
            overflow: 'hidden',
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{
              p: 2,
            }}
          >
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Skeleton variant="text" width={50} />
            </Grid>
            <Grid item xs={7} sx={{ textAlign: 'justify' }}>
              <Typography
                sx={{
                  whiteSpace: 'wrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '90%',
                }}
              >
                <Skeleton variant="text" width="90%" />
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Box display="flex" justifyContent="center" gap={0.5}>
                <Skeleton variant="rectangular" width={36} height={36} />
                <Skeleton variant="rectangular" width={36} height={36} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default TrickDidLoading;
