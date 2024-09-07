import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomButtonAdd from 'components/button/CustomButtonAdd';
import ReusableDrawer from 'components/drawer/ReusableDrawer';
import ArticleForm from 'components/form/ArticleForm';
import SearchBox from 'components/search/SearchBox';
import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import COLORS from 'theme/colors';
import { ArticleData } from 'types/AdminGetDataTypes';
import withAuth from 'utils/withAuth';

import ArticleCard from './ArticleCard';

type ArticlePanelProps = {};

const ArticlePanel: React.FC<ArticlePanelProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleData | null>(
    null
  );
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(''); // เก็บค่าที่จะใช้ในการค้นหาจริง ๆ
  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm); // อัปเดตค่าที่จะใช้ในการค้นหาจริง ๆ
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
    if (!open) setEditingArticle(null);
  };

  const handleEditArticle = (item: ArticleData) => {
    setEditingArticle(item);
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
            onKeyPress={handleKeyPress}
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
                  จัดการข้อมูลบทความ
                </Typography>
              </Grid>
              <Grid item>
                <CustomButtonAdd
                  variant="contained"
                  color="primary"
                  startIcon={<IoAddCircleOutline size={24} />}
                  onClick={toggleDrawer(true)}
                >
                  เพิ่มบทความ
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
          <ArticleCard
            onEdit={handleEditArticle}
            searchTerm={appliedSearchTerm}
          />
        </Paper>
      </Box>

      <ReusableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        title={editingArticle ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'}
      >
        <ArticleForm
          onCloseDrawer={toggleDrawer(false)}
          initialData={editingArticle}
        />
      </ReusableDrawer>
    </Box>
  );
};

export default withAuth(ArticlePanel);
