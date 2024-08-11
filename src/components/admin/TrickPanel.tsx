import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomButtonAdd from 'components/button/CustomButtonAdd';
import ReusableDrawer from 'components/drawer/ReusableDrawer';
import TrickForm from 'components/form/TrickForm';
import SearchBox from 'components/search/SearchBox';
import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import COLORS from 'theme/colors';
import { TrickFormData } from 'types/AdminFormDataTypes';
import withAuth from 'utils/withAuth';

const TrickPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleFormSubmit = (data: TrickFormData) => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };

  return (
    <Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Box sx={{ width: '100%' }}>
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            placeholder="ค้นหารู้หรือไม่..."
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
                  จัดการข้อมูลเคล็ดไม่ลับได้ที่นี่
                </Typography>
              </Grid>
              <Grid item>
                <CustomButtonAdd
                  variant="contained"
                  color="primary"
                  startIcon={<IoAddCircleOutline size={24} />}
                  onClick={toggleDrawer(true)}
                >
                  เพิ่มเคล็ดไม่ลับ
                </CustomButtonAdd>
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
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography>ชื่อ</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography>จัดการ</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <ReusableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        title="เพิ่มเคล็ดไม่ลับใหม่"
      >
        <TrickForm onSubmit={handleFormSubmit} onClose={toggleDrawer(false)} />
      </ReusableDrawer>
    </Box>
  );
};

export default withAuth(TrickPanel);
