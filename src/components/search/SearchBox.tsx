import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/system';
import CustomSearchButton from 'components/button/CustomSearchButton';
import React from 'react';
import COLORS from 'theme/colors';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
});

const CustomTextField = styled(TextField)({
  width: '100%',
  backgroundColor: COLORS.secondary.main,
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.blue[6],
  },
});

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  placeholder?: string;
  buttonLabel?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  placeholder = 'Search...',
  buttonLabel = 'Search',
}) => {
  return (
    <Container>
      <CustomTextField
        variant="outlined"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        size="small"
      />
      <CustomSearchButton label={buttonLabel} onClick={onSearch} />
    </Container>
  );
};

export default SearchBox;
