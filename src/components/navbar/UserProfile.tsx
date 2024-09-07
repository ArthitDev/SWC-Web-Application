import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import COLORS from 'theme/colors';

interface UserProfileProps {
  user: { username: string; email: string };
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
      }}
    >
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar
          sx={{
            color: COLORS.blue[6],
            backgroundColor: 'white',
            fontWeight: 500,
          }}
        >
          {user.username[0]}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>{user.username}</MenuItem>
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem onClick={onLogout}>ออกจากระบบ</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
