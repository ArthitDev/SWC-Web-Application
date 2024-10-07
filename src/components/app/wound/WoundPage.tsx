import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, Switch, Typography } from '@mui/material';
import CustomModal from 'components/modal/CustomModal';
import SearchBoxApp from 'components/search/SearchBoxApp';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import COLORS from 'themes/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

import WoundCardPage from './WoundCardPage';

const WoundPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
  };

  const handleToggleFilter = () => {
    if (filterEnabled) {
      setOpenModal(true);
    } else {
      setFilterEnabled(!filterEnabled);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDisableFilter = () => {
    setFilterEnabled(false);
    setOpenModal(false);
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
        <SearchBoxApp
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onKeyUp={handleKeyPress}
          placeholder="ค้นหาแผล..."
        />
        <Box
          display="flex"
          justifyContent="end"
          alignItems="center"
          sx={{ mt: 2, pr: 3 }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 1 }}>
              {filterEnabled ? 'ปิดฟิลเตอร์' : 'เปิดฟิลเตอร์'}
            </Typography>
            <Switch
              checked={filterEnabled}
              onChange={handleToggleFilter}
              color="primary"
            />
            <IconButton color="primary" onClick={handleToggleFilter}>
              {filterEnabled ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Box>
        </Box>
        <Box>
          <WoundCardPage
            filterEnabled={filterEnabled}
            searchTerm={appliedSearchTerm}
          />
        </Box>
      </motion.div>
      <CustomModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDisableFilter}
        title="ยืนยันการปิดฟิลเตอร์"
        description="ภาพที่แสดงอาจมีความรุนแรงและน่าสยดสยอง คุณต้องการปิดฟิลเตอร์เพื่อแสดงภาพเหล่านี้หรือไม่?"
        confirmText="ยืนยัน"
        cancelText="ยกเลิก"
      />
    </>
  );
};

export default WoundPage;
