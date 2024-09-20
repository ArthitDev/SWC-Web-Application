import { Button, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AnimatedListItem = styled(ListItem)({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: '7%',
    width: '0%',
    height: '5px',
    borderRadius: '5px',
    backgroundColor: '#235ADB',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::after, &.active::after': {
    width: '87%',
  },
});

export const StyledListItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    fontFamily: 'Prompt, sans-serif',
    fontSize: '20px',
    cursor: 'pointer',
  },
});

export const NavButton = styled(Button)({
  fontFamily: 'Prompt, sans-serif',
  fontSize: '20px',
  color: 'white',
  position: 'relative',
  margin: '0 10px',
  '&.active': {
    fontWeight: 'bold',
  },
  '&::after': {
    content: '""',
    display: 'block',
    width: '0%',
    height: '5px',
    borderRadius: '5px',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -2,
    left: '10%',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::after': {
    width: '80%',
  },
  '&.active::after': {
    width: '80%',
  },
});

export const TypographyLogoStyles = {
  marginLeft: 2,
  mr: 2,
  display: { xs: 'flex', md: 'flex' },
  backgroundColor: 'white',
  color: '#235ADB',
  px: 1,
  borderRadius: 1.5,
  fontWeight: 'bold',
  fontFamily: 'Prompt, sans-serif',
  fontSize: '25px',
  cursor: 'pointer',
};

export const TypographyListItemText = {
  typography: 'subtitle2',
  fontFamily: 'Prompt, sans-serif',
  fontSize: '22px',
  color: 'red',
};
