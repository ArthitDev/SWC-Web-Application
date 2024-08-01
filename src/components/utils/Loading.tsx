import { Box, Card, CardContent, Grid, Skeleton } from '@mui/material';
import React from 'react';

// ไฟล์นี้เป็นส่วน skeleton loading ใช้สำหรับรอโหลดข้อมูลจาก API
const Loading = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: 4 }}
      >
        <Grid item xs={11} md={11}>
          <Card sx={{ width: '100%', borderRadius: 2 }}>
            <CardContent sx={{ padding: 4 }}>
              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box display="grid" gap="5px">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Skeleton variant="text" width={200} />
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'grey',
                        }}
                      />
                    </Box>
                    <Skeleton variant="text" width={150} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="grid" gap="2px">
                    <Skeleton variant="text" width={150} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box style={{ marginTop: '5px' }}>
                        <Skeleton width={100} height={16} />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Grid item>
                      <Skeleton variant="rectangular" width={36} height={36} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" width={36} height={36} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" width={36} height={36} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: '10px' }}></Box>
    </>
  );
};

export default Loading;
