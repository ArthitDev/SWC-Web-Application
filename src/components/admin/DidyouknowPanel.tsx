import SearchBox from 'components/search/SearchBox';
import React, { useState } from 'react';
import withAuth from 'utils/withAuth';

const DidyouknowPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <SearchBox
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
      placeholder="ค้นหารู้หรือไม่ . . . "
      buttonLabel="ค้นหา"
    />
  );
};

export default withAuth(DidyouknowPanel);
