import {
  Box,
  Paper,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SearchBox from 'components/search/SearchBox';
import React, { useEffect, useState } from 'react';
import withAuth from 'utils/withAuth';

import ContactCard from './ContactCard';
import ContactDropdown from './ContactDropdown';

type ContactPanelProps = {};

const ContactPanel: React.FC<ContactPanelProps> = () => {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down('sm')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // ฟังก์ชันสำหรับการเปลี่ยนหมวดหมู่
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
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
            placeholder="ค้นหาการแจ้งเตือน..."
            buttonLabel="ค้นหา"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Paper elevation={0} sx={{ width: '100%', m: '15px', pb: 5 }}>
          <Box p={3} pt={5} pb={5}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  variant="h5"
                  pb={isSmallScreen ? 2 : 0}
                  sx={{ fontWeight: 'Medium' }}
                >
                  ข้อความแจ้งเตือน
                </Typography>
              </Box>
              <Box>
                <ContactDropdown
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </Box>
            </Box>
          </Box>
          <ContactCard
            searchTerm={appliedSearchTerm}
            category={selectedCategory}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default withAuth(ContactPanel);
