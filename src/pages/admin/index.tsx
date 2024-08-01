import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

const AdminPage: NextPage = () => {
  useEffect(() => {
    const adminTest = true;
    if (adminTest) {
      Router.push('/admin');
    } else {
      Router.push('/login');
    }
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
};

export default AdminPage;
