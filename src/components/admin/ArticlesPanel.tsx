import SearchBox from 'components/search/SearchBox';
import React, { useState } from 'react';
import withAuth from 'utils/withAuth';

const ArticlesPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <SearchBox
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
      placeholder="ค้นหาบทความ . . . "
      buttonLabel="ค้นหา"
    />
  );
};

export default withAuth(ArticlesPanel);
