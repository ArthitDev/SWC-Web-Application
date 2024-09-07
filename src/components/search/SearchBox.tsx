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
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  placeholder = 'Search...',
  buttonLabel = 'Search',
}) => {
  const handleSearch = () => {
    onSearch();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <CustomTextField
        variant="outlined"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onKeyPress={handleKeyPress}
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
      <CustomSearchButton label={buttonLabel} onClick={handleSearch} />
    </Container>
  );
};

export default SearchBox;
