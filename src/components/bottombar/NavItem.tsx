import { SvgIconComponent } from '@mui/icons-material';
import { BottomNavigationAction } from '@mui/material';
import React from 'react';

interface NavItemProps {
  icon: React.ReactElement<SvgIconComponent>;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label }) => {
  return <BottomNavigationAction label={label} icon={icon} />;
};

export default NavItem;
