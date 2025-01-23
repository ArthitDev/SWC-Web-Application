import SearchIcon from '@mui/icons-material/Search'; // Import the SearchIcon
import { Button } from '@mui/material';
import React from 'react';

interface CustomSearchButtonAppProps {
  label: string;
  onClick: () => void;
}

const CustomSearchButtonApp: React.FC<CustomSearchButtonAppProps> = ({
  label,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      startIcon={<SearchIcon />}
    >
      {label}
    </Button>
  );
};

export default CustomSearchButtonApp;
