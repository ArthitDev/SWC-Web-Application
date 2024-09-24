// components/CategoryDropdown.tsx
import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import COLORS from 'theme/colors';

type ContactDropdownProps = {
  selectedCategory: string;
  onCategoryChange: (event: SelectChangeEvent<string>) => void;
};

const ContactDropdown: React.FC<ContactDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <FormControl fullWidth sx={{ maxWidth: 180, pb: 1, width: 150 }}>
      <Select
        value={selectedCategory}
        onChange={onCategoryChange}
        displayEmpty
        inputProps={{ 'aria-label': 'หมวดหมู่' }}
        sx={{
          backgroundColor: 'white',
          height: 50,
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid',
            borderColor: COLORS.blue[6],
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
        <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
        <MenuItem value="แจ้งปัญหา">แจ้งปัญหา</MenuItem>
        <MenuItem value="ข้อเสนอแนะ">ข้อเสนอแนะ</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ContactDropdown;
