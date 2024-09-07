// components/CategoryDropdown.tsx
import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import COLORS from 'theme/colors';

type CategoryDropdownProps = {
  selectedCategory: string;
  onCategoryChange: (event: SelectChangeEvent<string>) => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <FormControl fullWidth sx={{ maxWidth: 200 }}>
      <Select
        value={selectedCategory}
        onChange={onCategoryChange}
        displayEmpty
        inputProps={{ 'aria-label': 'หมวดหมู่' }}
        sx={{
          backgroundColor: 'white',
          height: 40,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.blue[6],
          },
          '.MuiSelect-select': {
            paddingTop: '8px',
            paddingBottom: '8px',
          },
        }}
      >
        <MenuItem value="">ทั้งหมด</MenuItem>
        <MenuItem value="การแพทย์">การแพทย์</MenuItem>
        <MenuItem value="เทคโนโลยี">เทคโนโลยี</MenuItem>
        <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
