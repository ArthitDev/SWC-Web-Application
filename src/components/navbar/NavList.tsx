import { useRouter } from 'next/router';
import React from 'react';
import { AnimatedListItem, StyledListItemText } from 'styles/Navbar.style';

interface NavListProps {
  pages: { label: string; path: string }[];
  onNavigate: (path: string) => void;
  onCloseDrawer: () => void;
}

const NavList: React.FC<NavListProps> = ({
  pages,
  onNavigate,
  onCloseDrawer,
}) => {
  const router = useRouter();

  const handleItemClick = (path: string) => {
    onNavigate(path);
    onCloseDrawer();
  };

  return (
    <>
      {pages.map((page) => (
        <AnimatedListItem
          key={page.label}
          onClick={() => handleItemClick(page.path)}
          className={router.pathname === page.path ? 'active' : ''}
        >
          <StyledListItemText primary={page.label} />
        </AnimatedListItem>
      ))}
    </>
  );
};

export default NavList;
