import { Box } from '@mui/material';
import SearchBox from 'components/search/SearchBox';
import React, { useState } from 'react';
import withAuth from 'utils/withAuth';

const WoundPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <Box>
      <Box sx={{ pt: 2 }}>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          placeholder="ค้นหาแผล . . . "
          buttonLabel="ค้นหา"
        />
      </Box>
      <Box></Box>
    </Box>
  );
};

export default withAuth(WoundPanel);
