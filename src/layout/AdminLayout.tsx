import Navbar from 'components/navbar/Navbar';
import React, { ReactNode } from 'react';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
