import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import COLORS from 'theme/colors';
import withAuth from 'utils/withAuth';

import CustomAddButton from '../button/CustomAddButton';
import SearchBox from '../search/SearchBox';

const ArticlesPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Box sx={{ width: '100%' }}>
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            placeholder="ค้นหาบทความ..."
            buttonLabel="ค้นหา"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Paper elevation={0} sx={{ width: '100%', m: '15px' }}>
          <Box p={3} pt={5} pb={5}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 'Medium' }}>
                  จัดการข้อมูลบทความได้ที่นี่
                </Typography>
              </Grid>
              <Grid item>
                <CustomAddButton
                  variant="contained"
                  color="primary"
                  startIcon={<IoAddCircleOutline size={24} />}
                  onClick={() => ({})}
                >
                  เพิ่มบทความ
                </CustomAddButton>
              </Grid>
            </Grid>
          </Box>
          <Box pb={2}>
            <Grid
              container
              alignItems="center"
              sx={{
                backgroundColor: COLORS.blue[6],
                color: 'white',
                p: 2,
                borderRadius: '8px',
                width: 'calc(100% - 30px)',
                margin: '0 auto',
              }}
            >
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Typography>ลำดับ</Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Typography>ชื่อ</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography>เนื้อหา</Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Typography>รูปภาพ</Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Typography>จัดการ</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default withAuth(ArticlesPanel);
