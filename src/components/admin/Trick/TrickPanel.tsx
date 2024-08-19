import { Box, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import CustomButtonAdd from 'components/button/CustomButtonAdd';
import ReusableDrawer from 'components/drawer/ReusableDrawer';
import TrickForm from 'components/form/TrickForm';
import SearchBox from 'components/search/SearchBox';
import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import COLORS from 'theme/colors';
import { TrickData } from 'types/AdminGetDataTypes';
import withAuth from 'utils/withAuth';

import TrickCard from './TrickCard';

const TrickPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTrick, setEditingTrick] = useState<TrickData | null>(null); // สถานะแก้ไข

  // เพิ่ม useMediaQuery เพื่อปรับ pt ตามขนาดหน้าจอ
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down('sm')
  );

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
    if (!open) setEditingTrick(null); // ปิด Drawer ให้ล้างข้อมูลการแก้ไข
  };

  const handleEditClick = (item: TrickData) => {
    setEditingTrick(item);
    setIsDrawerOpen(true);
  };

  return (
    <Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Box sx={{ width: '100%' }}>
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            placeholder="ค้นหารเคล็ดไม่ลับ..."
            buttonLabel="ค้นหา"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Paper elevation={0} sx={{ width: '100%', m: '15px', pb: 5 }}>
          <Box p={3} pt={5} pb={5}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  pb={isSmallScreen ? 2 : 0}
                  sx={{ fontWeight: 'Medium' }}
                >
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
              <Grid item xs={6} sx={{ textAlign: 'justify' }}>
                <Typography>ชื่อ</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography>จัดการ</Typography>
              </Grid>
            </Grid>
          </Box>
          <TrickCard onEdit={handleEditClick} />
        </Paper>
      </Box>
      <ReusableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        title={editingTrick ? 'แก้ไขรู้หรือไม่' : 'เพิ่มเคล็ดไม่ลับใหม่'}
      >
        <TrickForm
          onCloseDrawer={toggleDrawer(false)}
          initialData={editingTrick}
        />
      </ReusableDrawer>
    </Box>
  );
};

export default withAuth(TrickPanel);
