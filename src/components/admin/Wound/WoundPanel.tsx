import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomButtonAdd from 'components/button/CustomButtonAdd';
import ReusableDrawer from 'components/drawer/ReusableDrawer';
import WoundForm from 'components/form/WoundForm';
import SearchBox from 'components/search/SearchBox';
import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import COLORS from 'theme/colors';
import { WoundData } from 'types/AdminGetDataTypes';
import withAuth from 'utils/withAuth';

import WoundCard from './WoundCard';

type WoundPanelProps = {};

const WoundPanel: React.FC<WoundPanelProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWound, setEditingWound] = useState<WoundData | null>(null); // สถานะแก้ไข

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
    if (!open) setEditingWound(null);
  };

  const handleEditWound = (item: WoundData) => {
    setEditingWound(item);
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
            placeholder="ค้นหาแผล..."
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
                  จัดการข้อมูลแผลได้ที่นี่
                </Typography>
              </Grid>
              <Grid item>
                <CustomButtonAdd
                  variant="contained"
                  color="primary"
                  startIcon={<IoAddCircleOutline size={24} />}
                  onClick={toggleDrawer(true)}
                >
                  เพิ่มแผล
                </CustomButtonAdd>
              </Grid>
            </Grid>
          </Box>
          {/* ส่วนหัวของตาราง */}
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
                <Typography>รูปปก</Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Typography>จัดการ</Typography>
              </Grid>
            </Grid>
          </Box>
          {/* เรียกใช้ WoundCard */}
          <WoundCard onEdit={handleEditWound} />
        </Paper>
      </Box>

      <ReusableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        title={editingWound ? 'แก้ไขแผล' : 'เพิ่มแผลใหม่'}
      >
        <WoundForm
          onCloseDrawer={toggleDrawer(false)}
          initialData={editingWound}
        />
      </ReusableDrawer>
    </Box>
  );
};

export default withAuth(WoundPanel);
