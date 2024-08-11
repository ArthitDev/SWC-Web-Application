import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import axiosInstance from 'services/axiosInstance';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();

    const checkAuth = async () => {
      try {
        await axiosInstance.get('/api/admin');
      } catch (err) {
        router.push('/login');
      }
    };

    useEffect(() => {
      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
