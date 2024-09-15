import { Box, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import CustomButtonAdd from 'components/button/CustomButtonAdd';
import ReusableDrawer from 'components/drawer/ReusableDrawer';
import DidyouknowForm from 'components/form/DidyouknowForm';
import SearchBox from 'components/search/SearchBox';
import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import COLORS from 'theme/colors';
import { DidyouknowData } from 'types/AdminGetDataTypes'; // import ประเภทข้อมูล
import withAuth from 'utils/withAuth';

import DidyouknowCard from './DidyouknowCard';

const DidyouknowPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingDidyouknow, setEditingDidyouknow] =
    useState<DidyouknowData | null>(null); // สถานะแก้ไข
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(''); // เก็บค่าที่จะใช้ในการค้นหาจริง ๆ
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down('sm')
  );

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm); // อัปเดตค่าที่จะใช้ในการค้นหาจริง ๆ
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
    if (!open) setEditingDidyouknow(null); // ปิด Drawer ให้ล้างข้อมูลการแก้ไข
  };

  const handleEditClick = (item: DidyouknowData) => {
    setEditingDidyouknow(item);
    setIsDrawerOpen(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setAppliedSearchTerm('');
    }
  }, [searchTerm]);

  return (
    <Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Box sx={{ width: '100%' }}>
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            onKeyUp={handleKeyPress}
            placeholder="ค้นหารู้หรือไม่..."
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
                  จัดการข้อมูลรู้หรือไม่
                </Typography>
              </Grid>
              <Grid item>
                <CustomButtonAdd
                  variant="contained"
                  color="primary"
                  startIcon={<IoAddCircleOutline size={24} />}
                  onClick={toggleDrawer(true)}
                >
                  เพิ่มรู้หรือไม่
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
              <Grid item xs={7} sx={{ textAlign: 'justify' }}>
                <Typography>ชื่อ</Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Typography>จัดการ</Typography>
              </Grid>
            </Grid>
          </Box>
          <DidyouknowCard
            onEdit={handleEditClick}
            searchTerm={appliedSearchTerm}
          />
        </Paper>
      </Box>
      <ReusableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        title={editingDidyouknow ? 'แก้ไขรู้หรือไม่' : 'เพิ่มรู้หรือไม่ใหม่'}
      >
        <DidyouknowForm
          onCloseDrawer={toggleDrawer(false)}
          initialData={editingDidyouknow}
        />
      </ReusableDrawer>
    </Box>
  );
};

export default withAuth(DidyouknowPanel);
