import { CameraAlt, Healing, Home, MenuBook } from '@mui/icons-material';
import { BottomNavigation, Paper } from '@mui/material';
import React, { useState } from 'react';

import NavItem from './NavItem';

const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <NavItem icon={<Home />} label="หน้าหลัก" />
        <NavItem icon={<Healing />} label="แผล" />
        <NavItem icon={<MenuBook />} label="บทความ" />
        <NavItem icon={<CameraAlt />} label="ถ่ายรูปแผล" />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
